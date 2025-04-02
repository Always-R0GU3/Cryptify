"use client";
import { cn } from "../../lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React from "react";

export const HeroHighlight = ({ children, className, containerClassName }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    
  }
  return (
    <div
      className={cn(
        "relative h-[40rem] flex items-center bg-white dark:bg-white justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d4d4d4 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />
      <motion.div
        className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({ children, className }) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 2,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
        backgroundImage:
          "linear-gradient(90deg, rgba(9,224,153,1) 0%, rgba(7,225,189,1) 57%, rgba(39,234,16,1) 100%)",
      }}
      className={cn(`relative inline-block pb-1 px-1 rounded-lg`, className)}
    >
      {children}
    </motion.span>
  );
};
