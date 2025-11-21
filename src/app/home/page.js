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

  useEffect(() => {
    async function loadTamil() {
      if (!session?.accessToken) return;

      setAccessToken(session.accessToken);
      const tamil = await fetchNewReleases();

      // Only keep songs that actually have a preview (so they play)
      const playable = tamil.filter((s) => s.preview !== null);

      setTamilSongs(playable);
      setSongs(playable);
      setLoading(false);
    }

    if (session) loadTamil();
  }, [session]);

  useEffect(() => {
    setOnSearch(async (query) => {
      if (!query || query.trim() === "") {
        setSongs(tamilSongs);
        return;
      }
      const results = await searchTracks(query);
      const playable = results.filter((s) => s.preview !== null);
      setSongs(playable);
    });
  }, [tamilSongs]);

  return (
    <div className="flex flex-col items-center min-h-screen pt-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Trending Tamil Songs 2025
      </h2>

      {loading ? (
        <p className="text-gray-400 mt-10">
          {session ? "Loading Tamil songs..." : "Please sign in"}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 w-full justify-items-center px-2">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}