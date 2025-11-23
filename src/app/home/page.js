// src/app/home/page.js
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SongCard from "@/components/cards/SongCard";
import YouTubeBackgroundPlayer from "@/components/YouTubeBackgroundPlayer";
import CanvasMode from "@/components/CanvasMode"; // ← NEW
import { setAccessToken, fetchNewReleases, searchTracks } from "@/lib/spotify";
import { useUIStore, usePlayerStore } from "@/lib/store";

export default function HomePage() {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const setOnSearch = useUIStore((s) => s.setOnSearch);

  // This detects if ANY song is playing
  const currentSong = usePlayerStore((s) => s.currentSong?.());

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

  const isCanvasMode = !!currentSong;

  return (
    <div className="relative min-h-screen">
      {/* Always render background player */}
      <YouTubeBackgroundPlayer />

      {/* Canvas Mode: Big card + cinematic */}
      {isCanvasMode && <CanvasMode />}

      {/* Normal Grid Mode: Only show if NO song playing */}
      {!isCanvasMode && (
        <div className="relative z-10 flex flex-col items-center pt-10 px-6">
          <h2 className="text-3xl font-bold mb-10 text-white drop-shadow-lg">
            Trending Tamil Songs 2025
          </h2>

          {loading ? (
            <p className="text-gray-300 mt-20 text-xl">Loading hits…</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 w-full justify-items-center pb-32">
              {songs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}