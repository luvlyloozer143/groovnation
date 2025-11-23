// src/components/CanvasMode.jsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/store";

export default function CanvasMode() {
  const currentSong = usePlayerStore((s) => s.currentSong?.());

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 top-24 flex items-center justify-center z-10 pointer-events-none"
    >
      <div className="relative max-w-md w-full mx-8 pointer-events-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 dark:bg-black/40 backdrop-blur-3xl rounded-3xl p-10 shadow-2xl border border-white/20"
        >
          <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={currentSong.cover}
              alt={currentSong.title}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-3xl font-bold text-center mb-2 truncate">
            {currentSong.title}
          </h3>
          <p className="text-xl opacity-80 text-center truncate">
            {currentSong.artist}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}