import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON"
      );
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-purple-500 pointer-events-none z-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
          transition: { type: "spring", mass: 0.1 },
        }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-50"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 0.5 : 1,
          transition: { type: "spring", mass: 0.1 },
        }}
      />
    </>
  );
};
