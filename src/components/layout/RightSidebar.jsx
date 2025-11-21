"use client";

import { useEffect, useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { fetchRecommendations } from "@/lib/spotify";

export default function RightSidebar() {
  const { queue, currentIndex, playAtIndex, setQueue } = usePlayerStore();

  const current = queue[currentIndex];

  /* ⭐ NEW — Recommended Songs */
  const [recommended, setRecommended] = useState([]);
  const [loadingRec, setLoadingRec] = useState(false);

  useEffect(() => {
    async function loadRec() {
      if (!current?.artistId) return;
      setLoadingRec(true);

      const rec = await fetchRecommendations(current.artistId);
      setRecommended(rec);

      setLoadingRec(false);
    }

    loadRec();
  }, [current?.id]);

  /* ⭐ FIXED — Play recommended without deleting queue */
  const playRecommended = (song) => {
    const newQueue = [song, ...queue];
    setQueue(newQueue, 0);
    playAtIndex(0);
  };

  return (
    <aside
      className="
        fixed top-16 right-0
        w-64 h-[calc(100vh-4rem)]
        bg-white/30 dark:bg-black/30
        backdrop-blur-2xl
        shadow-xl
        border-l border-white/10
        p-4
        overflow-y-auto
        hidden lg:block
        z-30
      "
    >
      {/* ⭐ NOW PLAYING */}
      <h2 className="text-lg font-bold mb-3 text-black dark:text-white">
        Now Playing
      </h2>

      {current ? (
        <div
          className="
            p-3 rounded-xl bg-purple-500/20 dark:bg-purple-600/30
            shadow-md flex items-center gap-3 mb-6
          "
        >
          <img
            src={current.cover}
            className="w-12 h-12 rounded-lg object-cover shadow"
            alt="cover"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-sm truncate">
              {current.title}
            </p>
            <p className="text-xs opacity-70 truncate">
              {current.artist}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-6">No song playing</p>
      )}

      {/* 🎵 Next Up */}
      <h2 className="text-lg font-bold mb-3 text-black dark:text-white">
        Next Up
      </h2>

      {queue.length <= 1 ? (
        <p className="text-sm text-gray-500 mb-6">Queue is empty</p>
      ) : (
        queue.map((track, index) =>
          index === currentIndex ? null : (
            <div
              key={track.id}
              onClick={() => playAtIndex(index)}
              className="
                p-3 rounded-lg cursor-pointer mb-3 transition-all
                hover:bg-white/20 dark:hover:bg-white/10
                flex items-center gap-3
              "
            >
              <img
                src={track.cover}
                className="w-10 h-10 rounded-md object-cover"
                alt="cover"
              />
              <div className="flex flex-col overflow-hidden">
                <p className="text-sm font-semibold truncate">{track.title}</p>
                <p className="text-xs opacity-70 truncate">{track.artist}</p>
              </div>
            </div>
          )
        )
      )}

      {/* ⭐ Recommended */}
      <h2 className="text-lg font-bold mt-6 mb-3 text-black dark:text-white">
        Recommended for You
      </h2>

      {loadingRec ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : recommended.length === 0 ? (
        <p className="text-sm text-gray-500">No recommendations yet</p>
      ) : (
        recommended.map((track) => (
          <div
            key={track.id}
            onClick={() => playRecommended(track)}
            className="
              p-3 rounded-lg cursor-pointer mb-3 transition-all
              hover:bg-white/20 dark:hover:bg-white/10
              flex items-center gap-3
            "
          >
            <img
              src={track.cover}
              className="w-10 h-10 rounded-md object-cover"
              alt="cover"
            />
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-semibold truncate">{track.title}</p>
              <p className="text-xs opacity-70 truncate">{track.artist}</p>
            </div>
          </div>
        ))
      )}
    </aside>
  );
}
