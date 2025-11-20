"use client";
import { create } from "zustand";

/* ---------------------------------------------------
   🎛 UI STORE
---------------------------------------------------- */
export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  darkMode: false,

  toggleTheme: () =>
    set((s) => {
      const next = !s.darkMode;
      if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
      }
      return { darkMode: next };
    }),

  loadTheme: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      const isDark = saved === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      set({ darkMode: isDark });
    }
  },

  // SEARCH sync
  onSearch: null,
  setOnSearch: (cb) => set({ onSearch: cb }),
}));

/* ---------------------------------------------------
   🎵 PLAYER STORE
---------------------------------------------------- */
export const usePlayerStore = create((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  shuffle: false,
  repeat: "off",
  audio: null,

  setQueue: (songs, index = 0) => {
    const audio = new Audio(songs[index]?.preview || "");
    audio.onended = () => get().handleSongEnd();

    set({
      queue: songs,
      currentIndex: index,
      audio,
      isPlaying: false,
    });
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

  togglePlay: () => {
    const { audio, isPlaying } = get();
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    set({ isPlaying: !isPlaying });
  },

  nextSong: () => {
    const { queue, currentIndex } = get();
    if (queue.length <= 1) return;
    get().playAtIndex((currentIndex + 1) % queue.length);
  },

  prevSong: () => {
    const { queue, currentIndex } = get();
    if (queue.length <= 1) return;
    const prev = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    get().playAtIndex(prev);
  },

  handleSongEnd: () => {
    get().nextSong();
  },
}));
