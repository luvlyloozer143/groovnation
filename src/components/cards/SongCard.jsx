"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/store";

export default function SongCard({ song }) {
  const { setQueue, playAtIndex, setVideoId } = usePlayerStore();

  const handlePlay = (e) => {
    e.stopPropagation();

    // ✔ Set queue (only this song)
    setQueue([song], 0);

    // ✔ Set YouTube video
    setVideoId(song.youtubeId);

    // ✔ Start playing
    playAtIndex(0);
  };

  return (
    <motion.div
      className="
        w-44 sm:w-52 bg-white/10 dark:bg-black/30 backdrop-blur-xl
        rounded-2xl p-3 flex flex-col items-center text-center shadow-md
        hover:shadow-purple-400/20 transition-all duration-300 cursor-pointer
        group relative
      "
      whileHover={{ scale: 1.03 }}
      onClick={handlePlay}
    >
      {/* IMAGE */}
      <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-3">
        <Image
          src={song.cover}
          alt={song.title}
          fill
          className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />

        {/* OLD GROOVNATION HOVER PLAY BUTTON */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="
              opacity-0 group-hover:opacity-100
              bg-black/80 rounded-full w-14 h-14
              flex items-center justify-center shadow-xl
              transition-all duration-300 pointer-events-auto
            "
            whileHover={{ scale: 1.15 }}
            onClick={handlePlay}
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

      {/* TEXT */}
      <h3 className="text-sm font-semibold truncate">{song.title}</h3>
      <p className="text-xs opacity-70 truncate">{song.artist}</p>
    </motion.div>
  );
}
