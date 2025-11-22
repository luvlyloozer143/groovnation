// src/lib/store.js
"use client";
import { create } from "zustand";

/* UI STORE — unchanged */
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

/* REQUIRED FOR MainShell */
export const useThemeSync = () => {
  const theme = useUIStore((s) => s.darkMode);
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", theme);
  }
};

/* PLAYER STORE — SSR SAFE + FULL YOUTUBE */
export const usePlayerStore = create((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  ytPlayer: null,

  // SSR-SAFE: normal function, not getter
  currentSong: () => {
    const state = get();
    return state.queue[state.currentIndex] || null;
  },

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
    if (isPlaying) {
      ytPlayer.pauseVideo();
    } else {
      ytPlayer.playVideo();
    }
    set({ isPlaying: !isPlaying });
  },
}));