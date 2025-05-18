// src/components/magicui/blur-fade-text.tsx
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useMemo } from "react";

interface BlurFadeTextProps {
  text?: string; // Make text optional
  children?: React.ReactNode; // Add children prop
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
}
const BlurFadeText = ({
  text,
  children, // Destructure children
  className,
  variant,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) => {
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;
  
  // Prefer children if provided, otherwise use text for character animation
  const contentToRender = children || text;
  const characters = useMemo(() => contentToRender && typeof contentToRender === 'string' ? Array.from(contentToRender) : [], [contentToRender]);

  if (animateByCharacter && text) { // animateByCharacter typically relies on the `text` prop
    return (
      <div className="flex">
        <AnimatePresence>
          {characters.map((char, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={combinedVariants}
              transition={{
                yoyo: Infinity, // Should this be yoyo: Infinity? Or just once?
                delay: delay + i * characterDelay,
                ease: "easeOut",
              }}
              className={cn("inline-block", className)}
              style={{ width: char.trim() === "" ? "0.2em" : "auto" }}
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    // This div might not be necessary if motion.span handles layout correctly
    // <div className="flex"> 
    <AnimatePresence>
      <motion.span
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={combinedVariants}
        transition={{
          // yoyo: Infinity, // Usually not yoyo: Infinity for a one-time entrance
          delay,
          ease: "easeOut",
        }}
        className={cn(className)} // Apply className directly to the motion.span
      >
        {contentToRender}
      </motion.span>
    </AnimatePresence>
    // </div>
  );
};

export default BlurFadeText;