// src/lib/store.js
"use client";

import { create } from "zustand";

// -------------------------------
// 🎛 UI Store (Sidebar + Theme)
// -------------------------------
export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  theme: "light",
  setTheme: (theme) => set({ theme }),
}));

// -------------------------------
// 🌓 Sync Theme With <html>
// -------------------------------
export const useThemeSync = () => {
  const theme = useUIStore((s) => s.theme);

  // Sync to HTML attribute
  if (typeof document !== "undefined") {
    document.documentElement.className = theme;
  }
};

// -------------------------------
// 🎵 Player Store (Your Code)
// -------------------------------
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

    if (isPlaying) audio.pause();
    else audio.play();

    set({ isPlaying: !isPlaying });
  },

  nextSong: () => {
    const { queue, currentIndex, shuffle, repeat } = get();
    if (queue.length === 0) return;

    let nextIndex = currentIndex + 1;

    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (nextIndex >= queue.length) {
      if (repeat === "all") nextIndex = 0;
      else return;
    }

    get().playAtIndex(nextIndex);
  },

  prevSong: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) return;

    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
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

    if (repeat === "one") {
      get().playAtIndex(currentIndex);
      return;
    }
    get().nextSong();
  },

  toggleShuffle: () =>
    set((s) => ({
      shuffle: !s.shuffle,
    })),

  toggleRepeat: () => {
    const cycle = { off: "one", one: "all", all: "off" };
    set((s) => ({ repeat: cycle[s.repeat] }));
  },
}));
