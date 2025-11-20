// src/lib/store.js
"use client";

import { create } from "zustand";

/* ---------------------------------------------------
   🎛 UI STORE (sidebar + theme)
---------------------------------------------------- */
export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  // THEME (old GroovNation logic)
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
}));

/* ---------------------------------------------------
   🌓 Sync Theme
---------------------------------------------------- */
export const useThemeSync = () => {
  const theme = useUIStore((s) => s.darkMode);

  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", theme);
  }
};

/* ---------------------------------------------------
   🎵 PLAYER STORE (unchanged — DO NOT TOUCH)
---------------------------------------------------- */
export const usePlayerStore = create((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  shuffle: false,
  repeat: "off",
  audio: null,

  setQueue: (songs, startIndex = 0) => {
    const audio = new Audio(songs[startIndex]?.preview || "");
    audio.onended = () => get().handleSongEnd();

    set({
      queue: songs,
      currentIndex: startIndex,
      audio,
      isPlaying: false,
    });
  },

  togglePlay: () => {
    const { audio, isPlaying } = get();
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    set({ isPlaying: !isPlaying });
  },

  nextSong: () => {
    const { queue, currentIndex, shuffle, repeat } = get();
    if (queue.length === 0) return;

    let nextIndex = currentIndex + 1;
    if (shuffle) nextIndex = Math.floor(Math.random() * queue.length);
    else if (nextIndex >= queue.length) {
      if (repeat === "all") nextIndex = 0;
      else return;
    }
    get().playAtIndex(nextIndex);
  },

  prevSong: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) return;
    const prevIndex =
      currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    get().playAtIndex(prevIndex);
  },

  playAtIndex: (index) => {
    const { queue, audio } = get();
    if (!queue[index]) return;

    if (audio) audio.pause();
    const newAudio = new Audio(queue[index]?.preview || "");
    newAudio.onended = () => get().handleSongEnd();

    set({
      currentIndex: index,
      audio: newAudio,
      isPlaying: true,
    });

    newAudio.play();
  },

  handleSongEnd: () => {
    const { repeat, currentIndex } = get();
    if (repeat === "one") return get().playAtIndex(currentIndex);
    get().nextSong();
  },

  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),

  toggleRepeat: () => {
    const cycle = { off: "one", one: "all", all: "off" };
    set((s) => ({ repeat: cycle[s.repeat] }));
  },
}));
