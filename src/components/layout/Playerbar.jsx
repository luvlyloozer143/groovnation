// src/components/layout/Playerbar.jsx
"use client"

import { Play, SkipBack, SkipForward } from "lucide-react"
import { motion } from "framer-motion"

export default function Playerbar() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 frost-glass
      backdrop-blur-2xl border-0 shadow-lg
      flex items-center justify-center gap-8 py-3
      transition-all duration-500 motion-fade"
    >
      {/* ⏮ Previous */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        className="hover-contrast rounded-full p-2 motion-pop"
      >
        <SkipBack className="w-5 h-5" />
      </motion.button>

      {/* ▶ Play / Pause */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative rounded-full w-12 h-12 flex items-center justify-center
        bg-gradient-to-br from-[#95eaff] via-[#bda0ff] to-[#ffdde1]
        shadow-[0_0_15px_rgba(164,124,255,0.4)] motion-pop"
      >
        <Play className="w-6 h-6 text-white drop-shadow-md" />

        {/* ✨ Pulse Glow Animation */}
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#95eaff] via-[#a47cff] to-[#ffdde1] opacity-40 blur-lg"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>

      {/* ⏭ Next */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        className="hover-contrast rounded-full p-2 motion-pop"
      >
        <SkipForward className="w-5 h-5" />
      </motion.button>
    </footer>
  )
}
