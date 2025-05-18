"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isRevealed, setIsRevealed] = useState(false);
  // No need for hasBeenRevealed, just check if isRevealed is already true

  const overlayVariants = {
    hidden: { opacity: 1, scale: 1 },
    visible: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const iconsContainerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
  };

  const handleMouseEnter = () => {
    if (!isRevealed) { // Only set to true if it's not already revealed
      setIsRevealed(true);
    }
  };
  // The onMouseLeave handler is removed from the Dock component

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock
        className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] "
        onMouseEnter={handleMouseEnter} // Use the new handler
        // onMouseLeave is removed
      >
        {/* BorderBeams will now use the default rainbow colors and animate faster */}
        <BorderBeam
          size={1000}
          duration={1.5}
          delay={0}
        />
        <BorderBeam
          size={1000}
          duration={2}
          delay={0.5}
          reverse={true}
        />

        {/* Overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              key="dock-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="hidden"
              exit="visible"
              className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
              style={{ pointerEvents: isRevealed ? "none" : "auto" }}
            >
              <span className="text-white text-xs font-semibold tracking-wider">
                HOVER HERE!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icons Container */}
        <motion.div
          className="flex items-end h-full"
          variants={iconsContainerVariants}
          initial="hidden"
          animate={isRevealed ? "visible" : "hidden"}
          style={{ pointerEvents: isRevealed ? "auto" : "none" }}
        >
          {DATA.navbar.map((item, index) => (
            <DockIcon key={item.href || index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12"
                      )}
                    >
                      <social.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </motion.div>
      </Dock>
    </div>
  );
}