// src/lib/store.js
"use client";

import { create } from "zustand";

/* ---------------------------------------------------
   🎛 UI STORE
---------------------------------------------------- */
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

/* ---------------------------------------------------
   🌓 RESTORED THEME SYNC (THE FIX)
---------------------------------------------------- */
export const useThemeSync = () => {
  const theme = useUIStore((s) => s.darkMode);

  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", theme);
  }
};

/* ---------------------------------------------------
   🎵 PLAYER STORE (YOUTUBE LOGIC)
---------------------------------------------------- */
export const usePlayerStore = create((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,

  // ⭐ YOUTUBE
  videoId: null,
  setVideoId: (id) => set({ videoId: id }),

  playerRef: null,
  setPlayerRef: (ref) => set({ playerRef: ref }),

  // Queue
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

    const player = get().playerRef;
    if (player) {
      player.loadVideoById(videoId);
      player.playVideo();
    }
  },

  togglePlay: () => {
    const { isPlaying, playerRef } = get();

    if (!playerRef) return;
    if (isPlaying) playerRef.pauseVideo();
    else playerRef.playVideo();

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
