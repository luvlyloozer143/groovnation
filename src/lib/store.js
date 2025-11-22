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

export const usePlayerStore = create((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  ytPlayer: null,

  currentSong: () => get().queue[get().currentIndex] || null,

  setYtPlayer: (player) => set({ ytPlayer: player }),

  playSong: (song) => {
    set({ queue: [song], currentIndex: 0, isPlaying: true });
  },

  togglePlay: () => {
    const { ytPlayer, isPlaying } = get();
    if (!ytPlayer) return;
    isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
    set({ isPlaying: !isPlaying });
  },

  nextSong: () => {},
  prevSong: () => {},
  setQueue: (songs, index = 0) => {
    set({ queue: songs, currentIndex: index });
    get().playSong(songs[index]);
  },
}));