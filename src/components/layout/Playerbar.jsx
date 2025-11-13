// src/components/layout/Playerbar.jsx
"use client";

import { Play, SkipBack, SkipForward, ListMusic } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/lib/store";

export default function Playerbar() {
  const toggleQueue = useUIStore((s) => s.toggleQueue);

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 frost-glass
      backdrop-blur-2xl border-0 shadow-lg flex items-center justify-center 
      gap-10 py-4 px-6"
    >
      {/* 🎼 Queue Button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleQueue}
        className="hover-contrast rounded-full p-2 motion-pop"
      >
        <ListMusic className="w-6 h-6" />
      </motion.button>

      {/* ⏮ Previous */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="hover-contrast rounded-full p-2 motion-pop"
      >
        <SkipBack className="w-6 h-6" />
      </motion.button>

      {/* ▶ Play Button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative rounded-full w-14 h-14 flex items-center justify-center
        bg-gradient-to-br from-[#95eaff] via-[#bda0ff] to-[#ffdde1]
        shadow-[0_0_20px_rgba(164,124,255,0.4)] motion-pop"
      >
        <Play className="w-7 h-7 text-white" />
      </motion.button>

      {/* ⏭ Next */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="hover-contrast rounded-full p-2 motion-pop"
      >
        <SkipForward className="w-6 h-6" />
      </motion.button>
    </footer>
  );
}
