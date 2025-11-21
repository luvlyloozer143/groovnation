"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/store";

export default function SongCard({ song }) {

  const player = usePlayerStore();

  const handlePlay = () => {
    player.setQueue([song], 0);
    player.setVideoId(song.youtubeId);
  };

  return (
    <motion.div
      className="w-44 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl
                 rounded-2xl p-3 flex flex-col items-center text-center shadow-md
                 hover:shadow-purple-400/20 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      onClick={handlePlay}
    >
      <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3">
        <Image
          src={song.cover}
          alt={song.title}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-sm font-semibold truncate">{song.title}</h3>
      <p className="text-xs opacity-70 truncate">{song.artist}</p>
    </motion.div>
  );
}
