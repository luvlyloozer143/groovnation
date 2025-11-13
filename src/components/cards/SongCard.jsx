"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/store";

export default function SongCard({ song, allSongs }) {
  const { setQueue, currentIndex } = usePlayerStore();

  const handlePlay = () => {
    if (!song.preview) return;
    const index = allSongs.findIndex((s) => s.id === song.id);
    setQueue(allSongs, index);
    usePlayerStore.getState().togglePlay();
  };

  return (
    <motion.div
      className="w-44 sm:w-52 bg-white/10 dark:bg-black/30 rounded-2xl p-3 text-center shadow-md hover:shadow-lg transition"
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="relative w-full h-48 rounded-xl overflow-hidden group cursor-pointer mb-3"
        onClick={handlePlay}
      >
        <Image
          src={song.cover || "/fallback-cover.png"}
          alt={song.title}
          fill
          className="object-cover group-hover:scale-105 transition"
        />

        <motion.div
          className="absolute bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100"
          initial={{ y: 20 }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
            ▶
          </div>
        </motion.div>
      </div>

      <h3 className="text-sm font-bold truncate">{song.title}</h3>
      <p className="text-xs opacity-70 truncate">{song.artist}</p>
    </motion.div>
  );
}
