"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SongCard({ song }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-48 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-3 flex flex-col items-center text-center hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300"
    >
      {/* 🎵 Album Cover */}
      <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3">
        <Image
          src={song.cover || "/fallback-cover.png"}
          alt={song.title || "Unknown Track"}
          fill
          priority
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover rounded-xl"
          unoptimized={false}
        />
      </div>

      {/* 🎶 Song Title */}
      <h3 className="text-sm font-semibold truncate w-full px-1">
        {song.title || "Unknown Track"}
      </h3>

      {/* 👤 Artist Name */}
      <p className="text-xs text-gray-400 truncate w-full px-1">
        {song.artist || "Unknown Artist"}
      </p>

      {/* 🔗 Listen on Spotify */}
      {song.external_url && (
        <a
          href={song.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:from-blue-500 hover:to-purple-500 transition-colors"
        >
          Listen on Spotify
        </a>
      )}
    </motion.div>
  );
}
