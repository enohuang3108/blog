import { AnimatePresence, type HTMLMotionProps, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  className?: string;
  infinite?: boolean;
}

export default function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  infinite = false,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const wordsLength = words.length;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) => {
        if (!infinite && prevIndex === wordsLength - 1) {
          return prevIndex;
        }
        return (prevIndex + 1) % wordsLength;
      });
    }, duration);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          className={cn(className)}
          {...framerProps}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
