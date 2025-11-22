// src/components/layout/Playerbar.jsx
"use client";

import { useEffect, useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  ListMusic,
} from "lucide-react";

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

  // TIME + PROGRESS (readonly)
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);

  // Listen to audio time updates
  useEffect(() => {
    const audio = usePlayerStore.getState().audio;
    if (!audio) return;

    const update = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 1);
    };

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [currentIndex]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!current) return null;

  return (
    <footer
      className="
        fixed bottom-0 left-0 right-0 z-50 
        bg-white/20 dark:bg-black/30 
        backdrop-blur-2xl 
        border-t border-white/10 
        px-6 py-3 
        flex items-center justify-between
      "
    >
      {/* 🎵 LEFT — Song Info */}
      <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
        <img
          src={current.cover}
          className="w-14 h-14 rounded-md object-cover shadow-md"
          alt={current.title}
        />
        <div className="truncate">
          <p className="text-sm font-semibold truncate">{current.title}</p>
          <p className="text-xs opacity-70 truncate">{current.artist}</p>
        </div>
        {/* ❤️ Like (UI only) */}
        <Heart className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer" />
      </div>

      {/* 🎧 CENTER — Controls + Progress Bar */}
      <div className="flex flex-col items-center w-1/3">
        {/* Controls */}
        <div className="flex items-center gap-5 mb-1">
          <button
            onClick={toggleShuffle}
            className={shuffle ? "text-purple-500" : "opacity-60"}
          >
            <Shuffle />
          </button>

          <button onClick={prevSong} className="opacity-80 hover:opacity-100">
            <SkipBack />
          </button>

          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.9 }}
            className="
              bg-purple-500 text-white 
              w-12 h-12 rounded-full 
              flex items-center justify-center shadow-md
            "
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </motion.button>

          <button onClick={nextSong} className="opacity-80 hover:opacity-100">
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

        {/* Thin Spotify-style Progress Bar */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-[11px] opacity-70 w-10 text-right">
            {formatTime(progress)}
          </span>

          <div className="relative w-full h-[4px] bg-white/20 dark:bg.white/10 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-purple-500 rounded-full transition-all"
              style={{
                width: `${(progress / duration) * 100}%`,
              }}
            />
          </div>

          <span className="text-[11px] opacity-70 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* 🎛 RIGHT — Icons */}
      <div className="flex items-center gap-4 justify-end w-1/3">
        <Volume2 className="opacity-70 hover:opacity-100 cursor-pointer" />
        <ListMusic className="opacity-70 hover:opacity-100 cursor-pointer" />
      </div>
    </footer>
  );
}
