// src/lib/store.js
"use client";

import { create } from "zustand";

export const usePlayerStore = create((set, get) => ({
  queue: [],            // list of songs
  currentIndex: 0,      // position in queue
  isPlaying: false,
  shuffle: false,
  repeat: "off",        // off | one | all
  audio: null,

  // 🎵 Load queue & start from index
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

  // ▶ Play / Pause
  togglePlay: () => {
    const { audio, isPlaying } = get();
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    set({ isPlaying: !isPlaying });
  },

  // ⏭ Next Song
  nextSong: () => {
    const { queue, currentIndex, shuffle, repeat } = get();
    if (queue.length === 0) return;

    let nextIndex = currentIndex + 1;

    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (nextIndex >= queue.length) {
      if (repeat === "all") nextIndex = 0;
      else return; // stop at end
    }

    get().playAtIndex(nextIndex);
  },

  // ⏮ Previous Song
  prevSong: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) return;

    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    get().playAtIndex(prevIndex);
  },

  // 🎯 Play specific index
  playAtIndex: (index) => {
    const { queue, audio } = get();
    if (!queue[index]) return;

    if (audio) audio.pause();

    const newAudio = new Audio(queue[index].preview || "");
    newAudio.onended = () => get().handleSongEnd();

    set({
      currentIndex: index,
      audio: newAudio,
      isPlaying: true,
    });

    newAudio.play();
  },

  // 🔁 Repeat + Auto-next logic
  handleSongEnd: () => {
    const { repeat, currentIndex, queue } = get();

    if (repeat === "one") {
      get().playAtIndex(currentIndex);
      return;
    }
    get().nextSong();
  },

  // 🔀 Shuffle toggle
  toggleShuffle: () => {
    set((s) => ({ shuffle: !s.shuffle }));
  },

  // 🔁 Repeat cycle
  toggleRepeat: () => {
    const cycle = { off: "one", one: "all", all: "off" };
    set((s) => ({ repeat: cycle[s.repeat] }));
  },
}));
