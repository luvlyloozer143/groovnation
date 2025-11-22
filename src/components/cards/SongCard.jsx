"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/store";
import { useState } from "react";

export default function SongCard({ song }) {
  const [hover, setHover] = useState(false);
  const { playSong, currentSong } = usePlayerStore();
  const isPlaying = currentSong()?.id === song.id;

  return (
    <motion.div
      className={`
        w-44 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl
        rounded-2xl p-3 flex flex-col items-center text-center shadow-md
        hover:shadow-purple-400/20 transition-all duration-300 cursor-pointer
        ${isPlaying ? "ring-4 ring-purple-500 shadow-2xl shadow-purple-500/40 scale-105" : ""}
      `}
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => playSong(song)}
    >
      <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3 group">
        <Image
          src={song.cover || "/fallback-cover.png"}
          alt={song.title}
          fill
          className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: hover || isPlaying ? 1 : 0, y: hover || isPlaying ? 0 : 60 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="bg-black/80 rounded-full w-14 h-14 flex items-center justify-center shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-7 h-7 ml-1">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      <h3 className="text-sm font-semibold text-black dark:text-white truncate w-full px-1">
        {song.title}
      </h3>
      <p className="text-xs text-gray-600 dark:text-gray-300 truncate w-full px-1">
        {song.artist}
      </p>
    </motion.div>
  );
}