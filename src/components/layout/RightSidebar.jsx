// src/components/layout/RightSidebar.jsx
"use client";

import { useEffect, useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { fetchRecommendations } from "@/lib/spotify";

export default function RightSidebar() {
  const { queue, currentIndex, playAtIndex, setQueue } = usePlayerStore();
  const current = queue[currentIndex];

  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    async function load() {
      if (!current?.artistId) return;
      const rec = await fetchRecommendations(current.artistId);
      setRecommended(rec);
    }
    load();
  }, [current?.id]);

  const nextUp = queue.slice(currentIndex + 1);

  return (
    <aside
      className="
        fixed top-16 right-0 w-64 h-[calc(100vh-4rem)]
        bg-white/30 dark:bg-black/30 backdrop-blur-2xl
        shadow-xl border-l border-white/10 p-4 overflow-y-auto
        hidden lg:block z-30
      "
    >
      <h2 className="text-lg font-bold mb-3">Now Playing</h2>
      {current ? (
        <div className="p-3 rounded-xl bg-purple-500/20 shadow-md flex items-center gap-3 mb-6">
          <img src={current.cover} className="w-12 h-12 rounded-lg object-cover" />
          <div className="truncate">
            <p className="font-semibold text-sm truncate">{current.title}</p>
            <p className="text-xs opacity-70 truncate">{current.artist}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm opacity-60 mb-6">No song playing</p>
      )}

      <h2 className="text-lg font-bold mb-3">Next Up</h2>
      {nextUp.length === 0 ? (
        <p className="text-sm opacity-60 mb-6">Queue is empty</p>
      ) : (
        nextUp.map((s, i) => (
          <div
            key={s.id}
            onClick={() => playAtIndex(currentIndex + 1 + i)}
            className="p-3 rounded-lg cursor-pointer mb-3 hover:bg-white/20 flex items-center gap-3"
          >
            <img src={s.cover} className="w-10 h-10 rounded-md" />
            <div className="truncate">
              <p className="text-sm font-semibold truncate">{s.title}</p>
              <p className="text-xs opacity-70 truncate">{s.artist}</p>
            </div>
          </div>
        ))
      )}

      <h2 className="text-lg font-bold mt-6 mb-3">Recommended</h2>
      {recommended.map((s) => (
        <div
          key={s.id}
          onClick={() => setQueue([s, ...queue], 0)}
          className="p-3 rounded-lg cursor-pointer mb-3 hover:bg-white/20 flex items-center gap-3"
        >
          <img src={s.cover} className="w-10 h-10 rounded-md" />
          <div className="truncate">
            <p className="text-sm font-semibold truncate">{s.title}</p>
            <p className="text-xs opacity-70 truncate">{s.artist}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}
