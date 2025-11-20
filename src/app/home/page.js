"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SongCard from "@/components/cards/SongCard";
import { setAccessToken, fetchNewReleases, searchTracks } from "@/lib/spotify";
import { useUIStore } from "@/lib/store";

export default function HomePage() {
  const { data: session } = useSession();

  const [songs, setSongs] = useState([]);
  const [tamilSongs, setTamilSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const setOnSearch = useUIStore((s) => s.setOnSearch);

  /* ============================================================
     1️⃣ Load Tamil Trending on first mount
  ============================================================= */
  useEffect(() => {
    async function loadTamil() {
      if (!session?.accessToken) return;
      setAccessToken(session.accessToken);

      const tamil = await fetchNewReleases();
      setTamilSongs(tamil);
      setSongs(tamil);
      setLoading(false);
    }
    if (session) loadTamil();
  }, [session]);

  /* ============================================================
     2️⃣ LISTEN FOR SEARCH INPUT FROM TOPBAR
  ============================================================= */
  useEffect(() => {
    setOnSearch(async (query) => {
      if (!query || query.trim() === "") {
        setSongs(tamilSongs);
        return;
      }

      const results = await searchTracks(query);
      setSongs(results);
    });
  }, [tamilSongs]);

  /* ============================================================
     3️⃣ UI Rendering
  ============================================================= */
  return (
    <div className="flex flex-col items-center min-h-screen pt-10 px-6">

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Trending Tamil Songs 2025
      </h2>

      {/* Loading */}
      {loading ? (
        <p className="text-gray-400 mt-10">
          {session ? "Loading Tamil songs..." : "Please sign in 🎧"}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 w-full justify-items-center px-2">
          {songs.map((song, index) => (
            <SongCard key={index} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
