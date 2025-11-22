"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SongCard from "@/components/cards/SongCard";
import { fetchNewReleases, searchTracks, setAccessToken } from "@/lib/spotify";
import { useUIStore } from "@/lib/store";

export default function HomePage() {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const setOnSearch = useUIStore((s) => s.setOnSearch);

  useEffect(() => {
    async function loadSongs() {
      if (session?.accessToken) {
        setAccessToken(session.accessToken);
      }
      const list = await fetchNewReleases();
      setSongs(list);
    }
    loadSongs();
  }, [session]);

  useEffect(() => {
    setOnSearch(async (query) => {
      const result = await searchTracks(query);
      setSongs(result);
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center min-h-screen pt-10 px-6">
      <h2 className="text-3xl font-bold mb-6">Trending Tamil Songs 2025</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 
                      gap-8 w-full justify-items-center px-2">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
