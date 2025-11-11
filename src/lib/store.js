"use client";

import { create } from "zustand";
import { useEffect } from "react";

export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  darkMode: false,
  onSearch: null, // 🔥 global search handler placeholder

  // actions
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleTheme: () => set((s) => ({ darkMode: !s.darkMode })),
  setOnSearch: (callback) => set({ onSearch: callback }), // 🔥 setter for global search
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
