// src/lib/store.js — 100% WORKING
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

export const usePlayerStore = create((set, get) => ({
  currentYoutubeId: null,
  isPlaying: false,

  playSong: (youtubeId) => {
    set({ currentYoutubeId: youtubeId, isPlaying: true });
  },

  pauseSong: () => set({ isPlaying: false }),
  resumeSong: () => set({ isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));