// src/components/layout/RightSidebar.jsx
"use client";

import { useEffect, useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { fetchRecommendations } from "@/lib/spotify";

export default function RightSidebar() {
  const { queue, currentIndex, playAtIndex, setQueue } = usePlayerStore();

  const current = queue[currentIndex];

  const [recommended, setRecommended] = useState([]);
  const [loadingRec, setLoadingRec] = useState(false);

  useEffect(() => {
    async function loadRecommendations() {
      if (!current?.artistId) return;

      setLoadingRec(true);

      let rec = await fetchRecommendations(current.artistId);

      // We assume every rec has youtubeId (after your new pipeline)
      setRecommended(rec);

      setLoadingRec(false);
    }

    loadRecommendations();
  }, [current?.id]);

  const handlePlayRecommended = (song) => {
    const newQueue = [song, ...queue.slice(currentIndex + 1)];
    setQueue(newQueue, 0);
    playAtIndex(0);
  };

  const nextUp = queue.slice(currentIndex + 1);

  return (
    <aside className="
      fixed top-16 right-0 w-64 h-[calc(100vh-4rem)]
      bg-white/30 dark:bg-black/30 backdrop-blur-2xl
      shadow-xl border-l border-white/10 p-4 overflow-y-auto
      hidden lg:block z-30
    ">
      
      {/* NOW PLAYING */}
      <h2 className="text-lg font-bold mb-3">Now Playing</h2>
      {current ? (
        <div className="p-3 rounded-xl bg-purple-500/20 shadow-md flex items-center gap-3 mb-6">
          <img src={current.cover} className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-semibold text-sm truncate">{current.title}</p>
            <p className="text-xs opacity-70 truncate">{current.artist}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm opacity-60 mb-6">No song playing</p>
      )}

      {/* NEXT UP */}
      <h2 className="text-lg font-bold mb-3">Next Up</h2>
      {nextUp.length === 0 ? (
        <p className="text-sm opacity-60 mb-6">Queue is empty</p>
      ) : (
        nextUp.map((song, idx) => (
          <div
            key={song.id}
            onClick={() => playAtIndex(currentIndex + 1 + idx)}
            className="p-3 rounded-lg cursor-pointer mb-3 hover:bg-white/20 flex items-center gap-3"
          >
            <img src={song.cover} className="w-10 h-10 rounded-md object-cover" />
            <div className="truncate">
              <p className="text-sm font-semibold truncate">{song.title}</p>
              <p className="text-xs opacity-70 truncate">{song.artist}</p>
            </div>
          </div>
        ))
      )}

      {/* RECOMMENDED */}
      <h2 className="text-lg font-bold mt-6 mb-3">Recommended</h2>

      {loadingRec ? (
        <p className="text-sm opacity-60">Loading…</p>
      ) : recommended.length === 0 ? (
        <p className="text-sm opacity-60">No recommendations yet</p>
      ) : (
        recommended.map((song) => (
          <div
            key={song.id}
            onClick={() => handlePlayRecommended(song)}
            className="p-3 rounded-lg cursor-pointer mb-3 hover:bg-white/20 flex items-center gap-3"
          >
            <img src={song.cover} className="w-10 h-10 rounded-md object-cover" />
            <div className="truncate">
              <p className="text-sm font-semibold truncate">{song.title}</p>
              <p className="text-xs opacity-70 truncate">{song.artist}</p>
            </div>
          </div>
        ))
      )}
    </aside>
  );
}
