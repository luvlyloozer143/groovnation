"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function SongCard({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!song.preview) return; // No preview URL
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-48 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-3 flex flex-col items-center text-center hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300"
    >
      {/* 🎵 Album Cover */}
      <div
        className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3 cursor-pointer"
        onClick={handlePlayPause}
      >
        <Image
          src={song.cover || "/fallback-cover.png"}
          alt={song.title || "Unknown Track"}
          fill
          priority
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover rounded-xl"
          unoptimized={false}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
          <span className="text-white text-4xl">
            {isPlaying ? "⏸️" : "▶️"}
          </span>
        </div>
      </div>

      {/* 🎶 Song Title */}
      <h3 className="text-sm font-semibold truncate w-full px-1">
        {song.title || "Unknown Track"}
      </h3>

      {/* 👤 Artist Name */}
      <p className="text-xs text-gray-400 truncate w-full px-1">
        {song.artist || "Unknown Artist"}
      </p>

      {/* 🎧 Hidden Audio */}
      {song.preview && (
        <audio
          ref={audioRef}
          src={song.preview}
          onEnded={() => setIsPlaying(false)}
          preload="none"
        />
      )}
    </motion.div>
  );
}
