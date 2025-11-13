// src/components/layout/Playerbar.jsx
"use client";

import { usePlayerStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";

export default function Playerbar() {
  const {
    queue,
    currentIndex,
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    shuffle,
    toggleShuffle,
    repeat,
    toggleRepeat,
  } = usePlayerStore();

  const current = queue[currentIndex];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/20 dark:bg-black/30 backdrop-blur-2xl shadow-lg border-t border-white/10 px-6 py-3 flex items-center justify-between">
      
      {/* 🎵 LEFT — Song Info */}
      <div className="flex items-center gap-4">
        {current && (
          <>
            <img
              src={current.cover}
              className="w-12 h-12 rounded-md object-cover shadow-md"
            />
            <div>
              <p className="text-sm font-semibold">{current.title}</p>
              <p className="text-xs opacity-70">{current.artist}</p>
            </div>
          </>
        )}
      </div>

      {/* 🎧 CENTER — Controls */}
      <div className="flex items-center gap-6">
        <button onClick={toggleShuffle} className={shuffle ? "text-purple-500" : "opacity-60"}>
          <Shuffle />
        </button>

        <button onClick={prevSong}>
          <SkipBack />
        </button>

        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.9 }}
          className="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </motion.button>

        <button onClick={nextSong}>
          <SkipForward />
        </button>

        <button
          onClick={toggleRepeat}
          className={
            repeat === "one"
              ? "text-blue-500"
              : repeat === "all"
              ? "text-green-500"
              : "opacity-60"
          }
        >
          <Repeat />
        </button>
      </div>

      {/* RIGHT — Empty for now */}
      <div className="w-12" />
    </footer>
  );
}
