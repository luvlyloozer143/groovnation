"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function SongCard({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!song.preview) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="w-44 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-3 flex flex-col items-center text-center shadow-md hover:shadow-purple-400/20 transition-all duration-300"
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
    >
      {/* 🎵 Album Cover */}
      <div
        className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3 group cursor-pointer"
        onClick={handlePlayPause}
      >
        <Image
          src={song.cover || "/fallback-cover.png"}
          alt={song.title || "Unknown Track"}
          fill
          className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />

        {/* Circular Play Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          >
            {isPlaying ? (
              <span className="text-lg font-bold">⏸</span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="none"
                className="w-7 h-7 ml-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z" />
              </svg>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 🎶 Song Title */}
      <h3 className="text-sm font-semibold text-black truncate w-full px-1">
        {song.title || "Unknown Track"}
      </h3>

      {/* 👤 Artist */}
      <p className="text-xs text-gray-600 truncate w-full px-1">
        {song.artist || "Unknown Artist"}
      </p>

      {/* Hidden Audio */}
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
