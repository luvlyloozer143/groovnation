"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/store";

export default function SongCard({ song }) {
  const player = usePlayerStore.getState();

  const playGlobal = () => {
    if (!song) return;

    // Global player queue (this song only)
    player.setQueue([song], 0);
    player.playAtIndex(0);
  };

  return (
    <motion.div
      className="
        w-44 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl 
        rounded-2xl p-3 flex flex-col items-center text-center shadow-md 
        hover:shadow-purple-400/20 transition-all duration-300
      "
      whileHover={{ scale: 1.03 }}
    >
      {/* COVER */}
      <div
        className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3 group cursor-pointer"
        onClick={playGlobal}
      >
        <Image
          src={song.cover || "/fallback-cover.png"}
          alt={song.title}
          fill
          className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />

        {/* Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="bg-black/80 rounded-full w-14 h-14 flex items-center justify-center shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke="none"
              className="w-7 h-7 ml-1"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <h3 className="text-sm font-semibold truncate w-full text-black dark:text-white">
        {song.title}
      </h3>

      <p className="text-xs opacity-70 truncate w-full">
        {song.artist}
      </p>
    </motion.div>
  );
}
