import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, FlaskConicalIcon, FileTextIcon } from "lucide-react";

export const DATA = {
  name: "Hitesh Krishna", // Updated Name
  initials: "HK", // Updated Initials
  url: "https://hiteshkrishna.com", // Replace with your actual domain if different
  location: "Chennai, India", // From PDF (VIT) / General location
  locationLink: "https://www.google.com/maps/place/chennai",
  description:
    "AI & ML Developer specializing in RAG systems and LLM applications. Passionate about building scalable AI solutions and contributing to cutting-edge research.", // Updated description
  summary: // Updated Summary - you can refine this further to be more narrative
    "A highly motivated and results-oriented AI & ML Engineer with a strong foundation in Computer Science from Vellore Institute of Technology (CGPA: 9.04). Experienced in developing and deploying RAG-based conversational AI, multi-agent systems, and time-series forecasting models. Proven ability to manage Kubernetes clusters, integrate various cloud AI services (Azure OpenAI, AWS Bedrock, GCP Vertex AI), and leverage advanced prompting techniques. Seeking to apply expertise in building innovative AI solutions.",
  avatarUrl: "/me.jpg", // Keep or update if you have a new one
  skills: { // <--- THIS IS THE CORRECTED STRUCTURE
    "Languages": ["Java", "Python", "C/C++", "SQL", "JavaScript", "HTML/CSS"],
    "Frameworks": ["Tensorflow", "PyTorch", "Flask", "FastAPI"],
    "Libraries": ["Pandas", "NumPy", "Matplotlib", "Hugging Face", "NLTK", "SpaCy", "Transformer", "ChromaDB", "FAISS", "VectorDB", "TruLens"],
    "Developer Tools": ["Microsoft Office Suite", "Git", "Docker"],
    "Cloud Platforms": ["AWS", "GCP", "Azure"],
    "Cloud Services": ["AWS Sagemaker", "AWS Bedrock", "AWS DynamoDB", "AWS Lambda", "GCP Vertex AI", "Azure OpenAI", "Azure Functions"],
    "Gen AI/Agentic AI": ["Langchain", "LlamaIndex", "Autogen", "Crew AI", "Bedrock Agents"],
    "ML/LLM Concepts": ["Supervised Finetuning", "PEFT", "Model Finetuning", "RAG", "RAG Evaluation", "LLMOps", "NLP", "BERT", "Observability", "Vector DBs"]
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/research", icon: FlaskConicalIcon, label: "Research" }, // Kept research, can be populated later
    { href: "/resume", icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    email: "hiteshkrishna.kv2022@vitstudent.ac.in", // From PDF
    tel: "+91 9496019918", // From PDF
    resumeUrl: "/resume.pdf",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/hiteshhhh007", // From PDF
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/hiteshkrishna07", // From PDF
        icon: Icons.linkedin,
        navbar: true,
      },
      Leetcode: { // Added Leetcode from PDF
        name: "Leetcode",
        url: "https://leetcode.com/hiteshkrishna43", // Assuming full URL
        icon: Icons.leetcode, // You'll need to add a Leetcode icon to your Icons.tsx
        navbar: true, // Decide if you want this in the navbar
      },
      X: { // Kept X, update URL if needed
        name: "X",
        url: "https://x.com/your_x_profile", // Replace with your X profile
        icon: Icons.x,
        navbar: false, // Changed to false as it's not on the PDF header
      },
      email: { // Keep email link
        name: "Send Email",
        url: "mailto:hiteshkrishna.kv2022@vitstudent.ac.in",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Hewlett Packard Enterprise",
      href: "https://www.hpe.com", // Generic HPE link, update if specific research/division link exists
      badges: [],
      location: "Bangalore, India",
      title: "Software Intern",
      logoUrl: "/hpe-logo.png", // You'll need to add hpe_logo.png to your /public folder
      start: "Feb 2025", // From PDF
      end: "May 2025",   // From PDF (assuming it meant till May)
      description:
        "Managed Kubernetes Cluster using Open Source CEPH as the storage orchestrator. Implemented Time-Series Forecasting Models to identify the duration of Replication and Recovery of CEPH Storage at an early stage. Used Prometheus and Victoria Metrics to efficiently create datasets and implement Time-Series Models for a scalable and efficient product.", // Combined points from PDF
    },
    {
      company: "Samsung R&D Institute", // Name from PDF
      href: "https://research.samsung.com/sri-b", // Kept existing, seems appropriate
      badges: [],
      location: "Bangalore, India", // From PDF
      title: "PRISM Research Intern", // From PDF
      logoUrl: "/samsung.png", // Kept existing
      start: "Jul 2024", // From PDF
      end: "Dec 2024", // From PDF
      description:
        "Curated an audio dataset of Human Body Sounds (300Hz-600Hz) for building the iHuman Student Foundation Model. Developed a Knowledge Distillation-based Teacher-Student Model, employing adaptive distillation, audio-specific data augmentation, and attention mechanisms. Enhanced the student model with model pruning and quantization, processing over 10,000 data points efficiently, leading to improved user satisfaction and interaction rates.", // Combined points from PDF
    },
    {
      company: "National Institute of Technology, Karnataka",
      badges: [],
      href: "https://www.nitk.ac.in/",
      location: "Surathkal, KA",
      title: "Research Intern",
      logoUrl: "/NIT.png",
      start: "May 2024",
      end: "July 2024",
      description:
        "I conducted an extensive Systematic Literature Review on Multimodal Aspect-Based Sentiment Analysis (MABSA) in the Research Lab at NITK under the guidance of Prof. K Chandrasekaran. As part of this effort, I reviewed and synthesized insights from over 150 research papers, offering a comprehensive overview of the latest trends, methodologies, and findings in the field. This work involved identifying key challenges, research gaps, and potential future directions for MABSA, ultimately contributing to the academic community by organizing and summarizing existing knowledge to support and guide further research in this domain.",
    },
    {
      company: "NeuralTransformers.ai",
      href: "https://www.linkedin.com/company/transformers-ai/",
      badges: [],
      location: "Chennai, India",
      title: "Software Engineer",
      logoUrl: "/Neural-Transf.jpeg",
      start: "Jan 2024",
      end: "Mar 2024",
      description:
        "Created and administered a predictive maintenance model for aircraft engines to forecast potential failures and optimize maintenance schedules, leading to significant reductions in unplanned downtime and operational costs. Using historical sensor data and operational logs, I developed an ensemble model that predicted engine failures with an accuracy of 92%, resulting in a 40% reduction in unexpected failures. Additionally, I implemented time series analysis using LSTMs to identify and predict critical periods for engine maintenance.",
    },
    // Removed NeuralTransformers.ai and other previous entries as they are not on the provided PDF for experience.
    // If you want to keep them, you can, but I'm matching the PDF provided.
  ],
  education: [
    {
      school: "Vellore Institute of Technology",
      href: "https://vit.ac.in/", // Main VIT link
      degree: "Bachelor of Technology in Computer Science with Specialization in AI & ML (CGPA: 9.04)", // Combined from PDF
      logoUrl: "/vit-c.jpeg", // Assuming this is the VIT logo you have
      start: "Sep 2022", // From PDF
      end: "May 2026",   // From PDF
    },
    {
      school: "Bhavans Varuna Vidyalaya (CBSE)",
      href: "https://www.bhavansvaruna.ac.in/", // Kept existing
      degree: "Class IX - Class XII (X: 97%, XII: 96%)", // Combined from PDF
      logoUrl: "/bvv.jpeg", // Kept existing
      start: "Jun 2018", // From PDF
      end: "Jun 2022",   // From PDF
    },
    // Removed Buildspace as it's not under EDUCATION in the provided PDF
  ],
  projects: [ // Keeping existing projects as requested
    {
    "title": "CNS-RAG",
    "href": "https://github.com/hiteshhhh007/CNS-RAG",
    "dates": "Jan 2024 - Present",
    "active": true,
    "description": "A self-hosted RAG-based chatbot for cryptography and network security. It uses local LLMs (Ollama), S3 for document storage with auto-sync, ChromaDB for vector storage, and Langchain for orchestration, providing a web UI for interaction.",
    "technologies": [
      "Python",
      "Flask",
      "Langchain",
      "Ollama",
      "ChromaDB",
      "AWS S3",
      "Boto3",
      "HTML",
      "Tailwind CSS",
      "JavaScript",
    ],
    "links": [
      {
        "type": "Source",
        "href": "https://github.com/hiteshhhh007/CNS-RAG",
      }
    ],
    "image": "",
    "video": ""
  },
  {
    "title": "Zurvey",
    "href": "https://github.com/hiteshhhh007/Zurvey",
    "dates": "Dec 2023 - Feb 2024",
    "active": true,
    "description": "An AI-powered platform to validate open-ended survey responses, ensuring data integrity. It employs a multi-agent system to detect issues like gibberish, AI-generated content, and irrelevance, aiming to reduce manual review time significantly.",
    "technologies": [
      "Python",
      "AI/ML Libraries",
      "Multi-Agent Systems"
    ],
    "links": [
      {
        "type": "Source",
        "href": "https://github.com/hiteshhhh007/Zurvey",
      }
    ],
    "image": "",
    "video": ""
  },
  {
    "title": "Surgical-Tool-Segmentation",
    "href": "https://github.com/hiteshhhh007/Surgical-Tool-Segmentation",
    "dates": "Nov 2023 - Jan 2024",
    "active": true,
    "description": "A project focused on multiclass segmentation of surgical tools using an ensemble of six U-Net models. Each model produces a binary mask for a specific class, which are then combined for the final segmentation, aiming for precision and real-time inference.",
    "technologies": [
      "Python",
      "Deep Learning",
      "U-Net",
      "Ensemble Methods"
    ],
    "links": [
      {
        "type": "Source",
        "href": "https://github.com/hiteshhhh007/Surgical-Tool-Segmentation",
      }
    ],
    "image": "",
    "video": ""
  },
  {
    "title": "Agrify",
    "href": "https://github.com/hiteshhhh007/Agrify",
    "dates": "Oct 2023 - Present",
    "active": true,
    "description": "A comprehensive platform for farmers, offering AI-driven disease detection (EfficientNet-B4), crop recommendations, an LLM chatbot (Gemini), a marketplace, and a global community. Aims to enhance yields and connect farmers.",
    "technologies": [
      "Python",
      "AI/ML",
      "Deep Learning (EfficientNet-B4)",
      "Firebase Authentication",
      "Google Cloud",
      "Gemini API",
      "Blockchain"
    ],
    "links": [
      {
        "type": "Source",
        "href": "https://github.com/hiteshhhh007/Agrify",
      }
    ],
    "image": "",
    "video": ""
  }
  ],
  research: [
    {
      title: "SpeakeT-Net: A Spatio-Temporal Transformer approach for Lip-Reading",
      href: "#",
      dates: "Winter 2025",
      authors: ["Hitesh Krishna","Dr. Thomas Abraham","Joshua Shaktivel Raju"],
      publication: "IEEE Open Access (Under-Review)",
      description:
        "In this work, we propose SpeakeT-Net, a spatiotemporal Transformer-based architecture for lipreading that effectively captures both spatial and temporal dependencies in video-based visual speech recognition. Unlike existing models that struggle with noisy or real-world data, SpeakeT-Net combines Transformer attention mechanisms with Bidirectional LSTM layers to model short-term and long-term lip movement patterns. The model processes video frames through a dedicated Feature Extraction pipeline enhanced with learned Positional Encodings, preserving the spatial relationships among facial features. The Recurrent Decoding stage, composed of BiLSTM layers followed by a Dense layer and Softmax activation, outputs token-wise predictions with high precision. By leveraging Connectionist Temporal Classification (CTC) loss alongside attention mechanisms, SpeakeT-Net aligns input-output sequences more effectively, addressing the alignment challenge common in lipreading tasks. Experimental results on the GRID corpus demonstrate the superiority of our approach, achieving a 2.3% Word Error Rate (WER) and 0.3% Character Error Rate (CER), outperforming current state-of-the-art lipreading systems.",
      technologies: [
        "Python",
        "Pytorch",
        "Bi-Directional LSTM",
        "Spatio - Temporal Transformers",
      ],
      image: "/LipNet.png",
      links: [
        // {
        //   type: "Preprint",
        //   href: "#",
        //   icon: <Icons.globe className="size-3" />,
        // },
        // {
        //   type: "Code",
        //   href: "https://github.com/hiteshhhh007/edge-transformers-research",
        //   icon: <Icons.github className="size-3" />,
        // }
      ],
    },
    {
      title: "A Shallow-ResNet based Framework for Super Resolution Tasks",
      href: "#",
      dates: "Winter 2025",
      authors: ["Dr. Suguneshwari G","Hitesh Krishna"],
      publication: "Yet to be submitted",
      description:
        "In this work, we propose Shallow-SRResNet (SSRResNet) and its GAN-based counterpart SSRGAN, two lightweight super-resolution architectures optimized for deployment in memory-constrained environments such as mobile devices and embedded systems. SSRResNet is derived by compressing the original SRResNet through the removal of multiple ResNet blocks, significantly reducing model size while preserving high performance. SSRGAN extends this by incorporating a streamlined discriminator and enhancing perceptual quality using a novel SqueezeNet-based perceptual loss, which replaces the heavier VGG-based loss used in SRGAN, offering efficient feature extraction and finer detail capture. Additionally, we integrate Total Variation Loss to minimize artifacts and improve image clarity during upscaling. Together, SSRResNet and SSRGAN deliver superior visual fidelity and perceptual quality while maintaining competitive accuracy and drastically reduced computational demands.",
      technologies: [
        "Python",
        "Pytorch",
        "GAN",
        "Optimization",
      ],
      image: "/SSRGAN.png",
      links: [
        // {
        //   type: "Preprint",
        //   href: "#",
        //   icon: <Icons.globe className="size-3" />,
        // },
        // {
        //   type: "Code",
        //   href: "https://github.com/hiteshhhh007/edge-transformers-research",
        //   icon: <Icons.github className="size-3" />,
        // }
      ],
    },
    {
      title: "TamilSTARNet: Tamil character Segmentation via Tri-phase mechanism and Attention based Recognition for Handwritten Document Digitization",
      href: "#",
      dates: "Summer 2024",
      authors: ["Dr. Sasithradevi A","Hitesh Krishna", "Joshua Shaktivel Raju","Dr. Kanimozhi G"],
      publication: "Springer Nature (Under-Review)",
      description:
        "In this work, we propose TamilSTARNet, a robust framework for recognizing handwritten Tamil documents, addressing the inherent complexities of the Tamil script such as intricate curves, diverse shapes, and high variability in handwriting styles. Our approach comprises two key components: a Tri-Phase Segmentation strategy that systematically breaks down documents into sentences, words, and characters to handle irregular spacing and complex layouts, and an attention-driven CNN-based recognition model that incorporates self-attention, channel attention, and convolutional block attention mechanisms to enhance feature extraction. By leveraging these attention modules, TamilSTARNet effectively captures subtle variations and intricate patterns in handwritten Tamil text.",
      technologies: [
        "Python",
        "Attention Mechanisms",
        "TensorFlow",
        "Computer Vision",
      ],
      image: "/TamilSTARNet.png",
      links: [
        // {
        //   type: "Preprint",
        //   href: "#",
        //   icon: <Icons.globe className="size-3" />,
        // },
        // {
        //   type: "Code",
        //   href: "https://github.com/hiteshhhh007/edge-transformers-research",
        //   icon: <Icons.github className="size-3" />,
        // }
      ],
    }, 
    {
      title: "A Systematic Literature Review on Multimodal Aspect-Based Sentiment Analysis (MABSA)",
      href: "#",
      dates: "Summer 2024",
      authors: ["Hitesh Krishna", "Dr. K. Chandrasekeran"],
      publication: "NITK Technical Report / IEEE (pending)",
      description:
        "Conducted a very detailed Literature Review on MABSA, tested out current models on various established benchmarks for identifying the gaps and provided reviews for filling the gaps thereby, helping upcoming research in this field.",
      technologies: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "NLP",
      ],
      image: "/MABSA.png",
      links: [
        // {
        //   type: "Preprint",
        //   href: "#",
        //   icon: <Icons.globe className="size-3" />,
        // },
        // {
        //   type: "Code",
        //   href: "https://github.com/hiteshhhh007/edge-transformers-research",
        //   icon: <Icons.github className="size-3" />,
        // }
      ],
    },
    {
      title: "Enhanced Deep-Learning based Mechanism for efficient video compresion",
      href: "#",
      dates: "Winter 2023",
      authors: ["Hitesh Krishna", "Harshaditya Sharma", "Ayush Sengupta","Piyush Vyas"],
      publication: "Conference Paper at ICAISC ( Intl. Conference on Artifical Intelligence & Soft Computing )",
      description:
        "Developed a novel video compression scheme with introduction of skip-connected autoencoders for more compact and information-rich compression model.",
      technologies: [
        "Python",
        "Tensorflow",
        "Computer Vision",
        "Autoencoders",
        "Compression Mechanisms",
      ],
      image: "/Video-Compression.png",
      links: [
        // {
        //   type: "Paper",
        //   href: "#",
        //   icon: <Icons.globe className="size-3" />,
        // },
      ],
    },
  ],
  // hackathons: [ // Keeping existing hackathons as requested
  //   {
  //     title: "Hack Western 5",
  //     dates: "November 23rd - 25th, 2018",
  //     location: "London, Ontario",
  //     description:
  //       "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
  //     links: [],
  //   },
  // ],
} as const;