"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SongCard({ song }) {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const player = usePlayerStore.getState();

  const handleGlobalPlay = (e) => {
    e.stopPropagation();

    // 🟣 1. Set this song as queue + start playback
    player.setQueue([song], 0);
    player.playAtIndex(0);

    // 🟣 2. (Optional) If you want redirect:
    // router.push(`/song/${song.id}`);
  };

  return (
    <motion.div
      className="
        w-44 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl 
        rounded-2xl p-3 flex flex-col items-center text-center shadow-md 
        hover:shadow-purple-400/20 transition-all duration-300
      "
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 🎵 Album Cover */}
      <div
        className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3 group cursor-pointer"
        onClick={handleGlobalPlay}
      >
        <Image
          src={song.cover || "/fallback-cover.png"}
          alt={song.title}
          fill
          className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />

        {/* ▶ Play Button (Slide Up) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: hover ? 1 : 0,
            y: hover ? 0 : 60,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="
              bg-black/80 rounded-full w-14 h-14 
              flex items-center justify-center shadow-xl
            "
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

      {/* 🎶 Song Title */}
      <h3 className="text-sm font-semibold text-black dark:text-white truncate w-full px-1">
        {song.title}
      </h3>

      {/* 👤 Artist */}
      <p className="text-xs text-gray-600 dark:text-gray-300 truncate w-full px-1">
        {song.artist}
      </p>
    </motion.div>
  );
}
