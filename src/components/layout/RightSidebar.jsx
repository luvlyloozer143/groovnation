// src/components/layout/RightSidebar.jsx
"use client";

import { usePlayerStore } from "@/lib/store";

export default function RightSidebar() {
  const { queue, currentIndex, playAtIndex } = usePlayerStore();

  return (
    <aside className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white/20 dark:bg-black/30 backdrop-blur-xl shadow-xl p-4 overflow-y-auto hidden lg:block">
      <h2 className="text-lg font-bold mb-4">Next in Queue</h2>

      {queue.map((track, index) => (
        <div
          key={track.id}
          className={`p-2 rounded-lg cursor-pointer mb-2 transition
            ${index === currentIndex ? "bg-purple-300/40 shadow" : "hover:bg-white/10"}`}
          onClick={() => playAtIndex(index)}
        >
          <p className="text-sm font-semibold truncate">{track.title}</p>
          <p className="text-xs opacity-70 truncate">{track.artist}</p>
        </div>
      ))}
    </aside>
  );
}
