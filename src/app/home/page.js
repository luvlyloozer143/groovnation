// src/app/home/page.js
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SongCard from "@/components/cards/SongCard";
import YouTubeBackgroundPlayer from "@/components/YouTubeBackgroundPlayer";
import { setAccessToken, fetchNewReleases, searchTracks } from "@/lib/spotify";
import { useUIStore, usePlayerStore } from "@/lib/store";

export default function HomePage() {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const setOnSearch = useUIStore((s) => s.setOnSearch);
  const videoId = usePlayerStore((s) => s.videoId);

  useEffect(() => {
    async function loadTamil() {
      if (!session?.accessToken) return;

      setAccessToken(session.accessToken);
      const list = await fetchNewReleases();
      setSongs(list);
      setLoading(false);
    }

    if (session) loadTamil();
  }, [session]);

  // SEARCH
  useEffect(() => {
    setOnSearch(async (query) => {
      if (!query?.trim()) {
        const list = await fetchNewReleases();
        setSongs(list);
        return;
      }
      const results = await searchTracks(query);
      setSongs(results);
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center min-h-screen pt-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Trending Tamil Songs 2025
      </h2>

      {/* Background YouTube appears only after play */}
      {videoId && (
        <div className="absolute top-24 inset-x-0 w-full h-[80vh] -z-10 pointer-events-none">
          <YouTubeBackgroundPlayer />
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 mt-10">Loading Tamil hits…</p>
      ) : (
        <div
          className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5
            gap-8 w-full justify-items-center px-2
          "
        >
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
