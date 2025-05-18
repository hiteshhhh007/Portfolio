"use client";

import { cn } from "@/lib/utils";
import { motion, MotionStyle, Transition } from "motion/react";

interface BorderBeamProps {
  /**
   * The size of the border beam.
   */
  size?: number;
  /**
   * The duration of the border beam.
   */
  duration?: number;
  /**
   * The delay of the border beam.
   */
  delay?: number;
  /**
   * Array of colors for the beam's gradient.
   * @default ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"] (Rainbow)
   */
  colors?: string[];
  /**
   * Whether the gradient should fade to transparent at the end.
   * @default true
   */
  gradientTransparency?: boolean;
  /**
   * The motion transition of the border beam.
   */
  transition?: Transition;
  /**
   * The class name of the border beam.
   */
  className?: string;
  /**
   * The style of the border beam.
   */
  style?: React.CSSProperties;
  /**
   * Whether to reverse the animation direction.
   */
  reverse?: boolean;
  /**
   * The initial offset position (0-100).
   */
  initialOffset?: number;
}

export const BorderBeam = ({
  className,
  size = 5000,
  delay = 6,
  duration = 1,
  colors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#8B00FF", // Violet
  ],
  gradientTransparency = true,
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) => {
  const colorStops = [...colors];
  if (gradientTransparency) {
    colorStops.push("transparent");
  }

  // Handle case where colors array might be empty if user provides it explicitly
  // Though default prop covers the initial load.
  const safeColorStops = colorStops.length > 0 ? colorStops : ["transparent"];

  const gradientStyle =
    safeColorStops.length > 1
      ? `linear-gradient(to left, ${safeColorStops.join(", ")})`
      : `linear-gradient(to left, ${safeColorStops[0]}, ${safeColorStops[0]})`; // Fallback for single effective color stop

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn(
          "absolute aspect-square",
          // Tailwind gradient classes (from, via, to) are removed in favor of inline style
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            backgroundImage: gradientStyle,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};