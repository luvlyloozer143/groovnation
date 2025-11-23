// src/components/cards/SongCard.jsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/store";
import { useState } from "react";

export default function SongCard({ song }) {
  const [hover, setHover] = useState(false);

  // Get fresh state + actions (avoid stale closure)
  const { queue, setQueue, playAtIndex } = usePlayerStore();

  const handlePlay = (e) => {
    e.stopPropagation();

    // NEW LOGIC: Insert clicked song at the front of the queue
    // Removes duplicate if already in queue (optional but cleaner)
    const filteredQueue = queue.filter((s) => s.id !== song.id);
    const newQueue = [song, ...filteredQueue];

    setQueue(newQueue, 0);   // song becomes index 0 → starts playing
    playAtIndex(0);          // triggers canvas mode + YouTube playback
  };

  return (
    <motion.div
      className="
        w-44 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl
        rounded-2xl p-3 flex flex-col items-center text-center shadow-md
        hover:shadow-purple-400/20 transition-all duration-300 cursor-pointer
      "
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3 group"
        onClick={handlePlay}
      >
        <Image
          src={song.cover}
          alt={song.title}
          fill
          className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />

        {/* Hover Play Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 60 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="bg-black/80 rounded-full w-14 h-14 flex items-center justify-center shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke="none"
              className="w-7 h-7 ml-1"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <h3 className="text-sm font-semibold truncate w-full px-1">
        {song.title}
      </h3>
      <p className="text-xs opacity-70 truncate max-w-[120px]">
        {song.artist}
      </p>
    </motion.div>
  );
}