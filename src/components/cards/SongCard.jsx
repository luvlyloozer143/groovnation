"use client";
"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SongCard({ song }) {
  // Handle missing album images gracefully
  const images = song.album?.images || [];
  const imageUrl =
    images.length > 0
      ? images[0]?.url || images[1]?.url || images[2]?.url
      : "/placeholder.jpg";

  const title = song.name || "Unknown Track";
  const artist =
    song.artists?.map((a) => a.name).join(", ") || "Unknown Artist";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative group frost-glass rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-500 w-48 shadow-md hover:shadow-xl"
    >
      {/* 🎵 Album Cover */}
      <div className="relative w-44 h-44 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-xl group-hover:brightness-110 transition duration-300"
        />

        {/* ▶️ Hover Play Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl"
        >
          <Play className="w-10 h-10 text-white" />
        </motion.div>
      </div>

      {/* 📜 Song Info */}
      <div className="mt-3 text-center">
        <h3 className="font-semibold text-sm text-black dark:text-white truncate w-44">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-44">
          {artist}
        </p>
      </div>
    </motion.div>
  );
}
