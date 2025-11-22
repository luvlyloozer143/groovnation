"use client";
import { useEffect } from "react";
import { usePlayerStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2, ListMusic } from "lucide-react";

export default function Playerbar() {
  const { currentSong, isPlaying, togglePlay } = usePlayerStore();
  const song = currentSong();

  if (!song) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/20 dark:bg-black/30 backdrop-blur-2xl border-t border-white/10 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
        <img src={song.cover} className="w-14 h-14 rounded-md object-cover shadow-md" alt={song.title} />
        <div className="truncate">
          <p className="text-sm font-semibold truncate">{song.title}</p>
          <p className="text-xs opacity-70 truncate">{song.artist}</p>
        </div>
        <Heart className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer" />
      </div>

      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-5 mb-1">
          <button className="opacity-60"><SkipBack /></button>
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.9 }}
            className="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </motion.button>
          <button className="opacity-60"><SkipForward /></button>
        </div>
        <div className="w-full h-1 bg-white/20 rounded-full">
          <div className="h-full w-1/3 bg-purple-500 rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-4 justify-end w-1/3">
        <Volume2 className="opacity-70 hover:opacity-100 cursor-pointer" />
        <ListMusic className="opacity-70 hover:opacity-100 cursor-pointer" />
      </div>
    </footer>
  );
}