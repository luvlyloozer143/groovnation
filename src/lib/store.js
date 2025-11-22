// src/lib/store.js
"use client";

import { create } from "zustand";

export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  darkMode: false,
  toggleTheme: () =>
    set((s) => {
      const newVal = !s.darkMode;
      if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", newVal);
        localStorage.setItem("theme", newVal ? "dark" : "light");
      }
      return { darkMode: newVal };
    }),

  loadTheme: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      const isDark = saved === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      set({ darkMode: isDark });
    }
  },

  onSearch: null,
  setOnSearch: (fn) => set({ onSearch: fn }),
}));

export const useThemeSync = () => {
  const theme = useUIStore((s) => s.darkMode);
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", theme);
  }
};

/* ---------------------------------------------------
   🎵 YOUTUBE PLAYER STORE
---------------------------------------------------- */
export const usePlayerStore = create((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,

  videoId: null,
  setVideoId: (id) => set({ videoId: id }),

  playerRef: null,
  setPlayerRef: (ref) => set({ playerRef: ref }),

  setQueue: (songs, startIndex = 0) => {
    set({
      queue: songs,
      currentIndex: startIndex,
    });
  },

  playAtIndex: (index) => {
    const { queue } = get();
    if (!queue[index]) return;

    const videoId = queue[index].youtubeId;

    set({
      currentIndex: index,
      videoId,
      isPlaying: true,
    });

    const p = get().playerRef;
    if (p) {
      p.loadVideoById(videoId);
      p.playVideo();
    }
  },

  togglePlay: () => {
    const { isPlaying, playerRef } = get();
    if (!playerRef) return;

    isPlaying ? playerRef.pauseVideo() : playerRef.playVideo();
    set({ isPlaying: !isPlaying });
  },

  nextSong: () => {
    const { currentIndex, queue } = get();
    if (currentIndex + 1 >= queue.length) return;
    get().playAtIndex(currentIndex + 1);
  },

  prevSong: () => {
    const { currentIndex } = get();
    if (currentIndex === 0) return;
    get().playAtIndex(currentIndex - 1);
  },
}));
