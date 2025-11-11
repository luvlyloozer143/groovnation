"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SongCard({ song }) {
  // Spotify fields fallback support
  const imageSrc =
    song.image ||
    song.album?.images?.[0]?.url ||
    song.album?.cover_medium ||
    "/placeholder.jpg";
  const title = song.title || song.name || "Unknown Title";
  const artist =
    song.artist?.name || song.artist || song.artists?.[0]?.name || "Unknown Artist";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="relative group frost-glass rounded-2xl p-3
        flex flex-col items-center justify-center cursor-pointer shadow-md
        hover:shadow-lg transition-all duration-500 backdrop-blur-md"
    >
      {/* 🎵 Album Art */}
      <div className="relative w-36 h-36 rounded-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover rounded-xl group-hover:brightness-110 transition-all duration-300"
        />

        {/* ▶️ Animated Play Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          whileHover={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl"
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:shadow-xl"
          >
            <Play className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* 🎧 Song Info */}
      <div className="mt-3 text-center select-none">
        <h3 className="font-semibold text-sm text-black/80 dark:text-white truncate w-36">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-36">
          {artist}
        </p>
      </div>

      {/* ✨ Glow Border Animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition-all duration-500"
        whileHover={{ boxShadow: "0 0 15px rgba(255,255,255,0.15)" }}
      />
    </motion.div>
  );
}
