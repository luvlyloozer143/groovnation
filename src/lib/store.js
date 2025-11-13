"use client";

import { create } from "zustand";
import { useEffect } from "react";

export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  darkMode: false,

  // ⚡ NEW — Queue sidebar state
  queueOpen: false,

  onSearch: null,

  // actions
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  toggleTheme: () => set((s) => ({ darkMode: !s.darkMode })),

  toggleQueue: () =>
    set((s) => ({ queueOpen: !s.queueOpen })), // ⚡ NEW

  setOnSearch: (callback) => set({ onSearch: callback }),
}));

// 🌙 Sync theme mode with <html> element
export const useThemeSync = () => {
  const { darkMode } = useUIStore();
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);
};
