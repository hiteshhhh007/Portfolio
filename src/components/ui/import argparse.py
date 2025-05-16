import argparse
import time
import cv2
import numpy as np
from pycoral.adapters import common
from pycoral.adapters import detect
from pycoral.utils.dataset import read_label_file
from pycoral.utils.edgetpu import make_interpreter, list_edge_tpus
from flask import Flask, Response, jsonify
from flask_cors import CORS
import threading
import queue
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class PersonDetectionStream:
  def __init__(self, model_path, labels_path, threshold=0.5):
    """Initialize the person detection system."""
    # Check for available Edge TPUs
    available_tpus = list_edge_tpus()
    if not available_tpus:
      print("\nWARNING: No Edge TPU detected. The model will run on CPU.")
      print("Make sure your Coral USB Accelerator is properly connected.")
      self.using_tpu = False
    else:
      print(f"\nFound {len(available_tpus)} Edge TPU(s):")
      for tpu in available_tpus:
        print(f"  - {tpu}")
      self.using_tpu = True

    try:
      # Initialize the Edge TPU interpreter
      print(f"\nLoading model: {model_path}")
      self.interpreter = make_interpreter(model_path)
      self.interpreter.allocate_tensors()

      # Get input details first
      self.input_details = self.interpreter.get_input_details()
      self.output_details = self.interpreter.get_output_details()

      # Get model dimensions from input details
      self.height = self.input_details[0]['shape'][1]
      self.width = self.input_details[0]['shape'][2]

      # Verify if model is running on Edge TPU
      self.verify_model_tpu_usage()

    except Exception as e:
      print(f"Error initializing interpreter: {str(e)}")
      raise

    print("\nModel details:")
    print(f"Input size: {self.width}x{self.height}")
    print(f"Input details: {self.input_details}")
    print(f"Output details: {self.output_details}")

    # Load labels
    self.labels = read_label_file(labels_path)
    self.threshold = threshold

    # Initialize camera
    self.camera = None

    # Initialize frame queue and detection results
    self.frame_queue = queue.Queue(maxsize=2)
    self.detection_results = []
    self.fps = 0
    self.running = False

  def verify_model_tpu_usage(self):
    """Verify if the model is actually running on Edge TPU."""
    try:
      # Get model delegates
      delegates = self.interpreter._delegates

      if not delegates and self.using_tpu:
        print("\nWARNING: Model is not using Edge TPU despite TPU being available!")
        print("Make sure your model is properly compiled for Edge TPU.")
        print("The model will run on CPU instead.")
        self.using_tpu = False
      elif delegates:
        print("\nSUCCESS: Model is running on Edge TPU!")
        self.using_tpu = True
        # Run a test inference
        try:
          dummy_input = np.zeros((self.height, self.width, 3), dtype=np.uint8)
          common.set_input(self.interpreter, dummy_input)
          self.interpreter.invoke()
          print("Test inference successful on Edge TPU")
        except Exception as e:
          print(f"Error during test inference: {str(e)}")
          self.using_tpu = False
    except Exception as e:
      print(f"Error verifying TPU usage: {str(e)}")
      self.using_tpu = False

  def initialize_camera(self, camera_id=0):
    """Initialize the camera."""
    self.camera = cv2.VideoCapture(camera_id)
    if not self.camera.isOpened():
      raise ValueError("Unable to open camera")

    # Set camera resolution
    self.camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    self.camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    print(f"\nCamera initialized:")
    print(f"Resolution: {self.camera.get(cv2.CAP_PROP_FRAME_WIDTH)}x{self.camera.get(cv2.CAP_PROP_FRAME_HEIGHT)}")

  def preprocess_image(self, img):
    """Preprocess the image for the model."""
    img_resized = cv2.resize(img, (self.width, self.height))
    return img_resized

  def process_frame(self):
    """Process a single frame."""
    if self.camera is None:
      raise ValueError("Camera not initialized")

    ret, frame = self.camera.read()
    if not ret:
      return None

    # Preprocess and run inference
    processed_frame = self.preprocess_image(frame)
    common.set_input(self.interpreter, processed_frame)

    # Time the inference
    inference_start = time.monotonic()
    self.interpreter.invoke()
    inference_time = (time.monotonic() - inference_start) * 1000  # convert to ms

    objs = detect.get_objects(self.interpreter, self.threshold)

    # Process results
    height, width, _ = frame.shape
    scale_x = width / self.width
    scale_y = height / self.height

    # Store detection results
    current_detections = []

    # Draw detection results
    for obj in objs:
      if obj.id == 0:  # Person class
        bbox = obj.bbox
        x0 = int(bbox.xmin * scale_x)
        y0 = int(bbox.ymin * scale_y)
        x1 = int(bbox.xmax * scale_x)
        y1 = int(bbox.ymax * scale_y)

        # Draw bounding box
        cv2.rectangle(frame, (x0, y0), (x1, y1), (0, 255, 0), 2)
        label = f'Person: {obj.score:.2f}'
        cv2.putText(frame, label, (x0, y0-10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Store detection
        current_detections.append({
          'bbox': [x0, y0, x1, y1],
          'confidence': float(obj.score),
          'timestamp': datetime.now().isoformat()
        })

    self.detection_results = current_detections

    # Add FPS and inference time info
    cv2.putText(frame, f'FPS: {self.fps:.1f}', (10, 30),
        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.putText(frame, f'Inference: {inference_time:.1f}ms {"(TPU)" if self.using_tpu else "(CPU)"}',
        (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    return frame

  def detection_loop(self):
    """Main detection loop."""
    while self.running:
      start_time = time.monotonic()

      frame = self.process_frame()
      if frame is not None:
        # Convert frame to JPEG
        ret, jpeg = cv2.imencode('.jpg', frame)
        if ret:
          # Keep only the most recent frame
          try:
            self.frame_queue.put_nowait(jpeg.tobytes())
          except queue.Full:
            try:
              self.frame_queue.get_nowait()
              self.frame_queue.put_nowait(jpeg.tobytes())
            except queue.Empty:
              pass

      # Update FPS
      self.fps = 1.0 / (time.monotonic() - start_time)

  def start(self):
    """Start the detection thread."""
    self.running = True
    self.detection_thread = threading.Thread(target=self.detection_loop)
    self.detection_thread.start()
    print("\nDetection system started!")
    print(f"Running on: {'Edge TPU' if self.using_tpu else 'CPU'}")

  def stop(self):
    """Stop the detection thread and release resources."""
    self.running = False
    if hasattr(self, 'detection_thread'):
      self.detection_thread.join()
    if self.camera is not None:
      self.camera.release()
    print("\nDetection system stopped.")

def get_detector():
  """Get the global detector instance."""
  global detector
  return detector

def generate_frames():
  """Generate frames for video streaming."""
  detector = get_detector()
  while True:
    try:
      frame_data = detector.frame_queue.get(timeout=1)
      yield (b'--frame\r\n'
           b'Content-Type: image/jpeg\r\n\r\n' + frame_data + b'\r\n')
    except queue.Empty:
      continue

@app.route('/video_feed')
def video_feed():
  """Video streaming route."""
  return Response(generate_frames(),
          mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/detections')
def get_detections():
  """Get current detection results."""
  detector = get_detector()
  return jsonify({
    'detections': detector.detection_results,
    'fps': detector.fps
  })

def main():
  # Parse arguments
  parser = argparse.ArgumentParser()
  parser.add_argument('--model', required=True,
            help='Path to the detection model')
  parser.add_argument('--labels', required=True,
            help='Path to labels file')
  parser.add_argument('--threshold', type=float, default=0.5,
            help='Detection threshold')
  parser.add_argument('--camera', type=int, default=0,
            help='Camera device ID')
  parser.add_argument('--port', type=int, default=5000,
            help='Server port')
  parser.add_argument('--host', default='0.0.0.0',
            help='Server host')
  args = parser.parse_args()

  # Initialize detector
  global detector
  detector = PersonDetectionStream(args.model, args.labels, args.threshold)
  detector.initialize_camera(args.camera)
  detector.start()

  # Run Flask app
  try:
    app.run(host=args.host, port=args.port, threaded=True)
  finally:
    detector.stop()

if __name__ == '__main__':
  main()