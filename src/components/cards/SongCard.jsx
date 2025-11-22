"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/store";
import { useState } from "react";

export default function SongCard({ song }) {
  const [hover, setHover] = useState(false);
  const { playSong, currentYoutubeId, togglePlay } = usePlayerStore();
  const isPlaying = currentYoutubeId === song.youtubeId;

  return (
    <motion.div
      className={`w-44 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-3 flex flex-col items-center text-center shadow-md hover:shadow-purple-400/20 transition-all duration-300 cursor-pointer ${isPlaying ? "ring-4 ring-purple-500 scale-105" : ""}`}
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => isPlaying ? togglePlay() : playSong(song.youtubeId)}
    >
      <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3 group">
        <Image src={song.cover} alt={song.title} fill className="object-cover" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: hover || isPlaying ? 1 : 0 }}
        >
          <div className="bg-white/20 backdrop-blur rounded-full w-16 h-16 flex items-center justify-center">
            {isPlaying ? "❚❚" : "▶"}
          </div>
        </motion.div>
      </div>
      <h3 className="text-sm font-semibold truncate w-full">{song.title}</h3>
      <p className="text-xs opacity-70 truncate w-full">{song.artist}</p>
    </motion.div>
  );
}