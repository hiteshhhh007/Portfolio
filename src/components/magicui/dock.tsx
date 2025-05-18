"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  HTMLMotionProps
} from "framer-motion";
import React, { useRef, createContext, useContext, PropsWithChildren } from "react"; // Import createContext and useContext

// Constants
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

// 1. Define Context
interface DockContextType {
  mousex: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextType | null>(null);

// Custom hook to use the Dock context
export const useDockContext = () => {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("useDockContext must be used within a DockProvider");
  }
  return context;
};

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border"
);

export interface DockProps
  extends VariantProps<typeof dockVariants>,
    Omit<HTMLMotionProps<"div">, "onMouseMove" | "onMouseLeave"> { // Omit to avoid conflict with internal handlers if needed, or allow override
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
  // onMouseEnter, onMouseLeave, etc., will now be accepted via HTMLMotionProps<'div'>
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref
  ) => {
    const mousex = useMotionValue(Infinity);

    // 2. Provide Context
    // The renderChildren logic for cloning is no longer needed here if DockIcon consumes context
    return (
      <DockContext.Provider value={{ mousex, magnification, distance }}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => mousex.set(e.pageX)}
          onMouseLeave={() => mousex.set(Infinity)}
          {...props}
          className={cn(dockVariants({ className }))}
        >
          {children} {/* Render children directly */}
        </motion.div>
      </DockContext.Provider>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number; // This prop seems unused by the animation logic, might be for content inside
  className?: string;
  children?: React.ReactNode;
  // mousex, magnification, distance are removed from props as they'll come from context
}

const DockIcon = ({
  // Remove mousex, magnification, distance from destructured props
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // 3. Consume Context
  const { mousex, magnification, distance } = useDockContext();

  const distanceCalc = useTransform(mousex, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40] // Base width 40px, magnified width `magnification`
  );

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };