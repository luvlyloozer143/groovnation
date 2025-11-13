"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function SongCard({ song, index, onPlayFromCard }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!song.preview) return;

    // If parent wants to play via queue
    if (onPlayFromCard) {
      onPlayFromCard(index);
      return;
    }

    // Local preview playback
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="w-44 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl 
      rounded-2xl p-3 flex flex-col items-center text-center shadow-md 
      hover:shadow-purple-400/20 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
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

        {/* 🎯 FINAL SLIDE-UP PLAY BUTTON (Spotify-like) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          initial={{ y: 80, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            duration: 0.45,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.18 }}
            className="bg-black/85 rounded-full w-14 h-14 flex items-center justify-center shadow-xl backdrop-blur-md"
          >
            {isPlaying ? (
              <span className="text-2xl font-bold text-white">⏸</span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke="none"
                className="w-7 h-7 ml-1"
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 🎶 Song Title */}
      <h3 className="text-sm font-semibold text-black dark:text-white truncate w-full px-1">
        {song.title || "Unknown Track"}
      </h3>

      {/* 👤 Artist */}
      <p className="text-xs text-gray-600 dark:text-gray-300 truncate w-full px-1">
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
