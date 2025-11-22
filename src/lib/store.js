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

  currentSong: () => get().queue[get().currentIndex],

  setYtPlayer: (player) => set({ ytPlayer: player }),

  playSong: (song) => {
    set({ queue: [song], currentIndex: 0, isPlaying: true });
    const player = get().ytPlayer;
    if (player && song.youtubeId) {
      player.loadVideoById(song.youtubeId);
      player.playVideo();
    }
  },

  togglePlay: () => {
    const { ytPlayer, isPlaying } = get();
    if (!ytPlayer) return;
    isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
    set({ isPlaying: !isPlaying });
  },

  nextSong: () => {
    // For now: single song play (you can extend queue later)
    // Auto next not supported yet — keeps current song
  },

  prevSong: () => {
    // Same as next — single song mode
  },

  setQueue: (songs, index = 0) => {
    set({ queue: songs, currentIndex: index });
    get().playSong(songs[index]);
  },
}));