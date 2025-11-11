"use client";

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SpotifyAuthButton from "@/components/SpotifyAuthButton";
import SongCard from "@/components/cards/SongCard";
import { setAccessToken, fetchNewReleases, searchTracks } from "@/lib/spotify";

export default function HomePage() {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Load Tamil trending songs when logged in
  useEffect(() => {
    async function loadSongs() {
      try {
        if (!session?.accessToken) return;
        setAccessToken(session.accessToken);
        const releases = await fetchNewReleases();
        setSongs(releases);
      } catch (err) {
        console.error("Error loading Tamil songs:", err);
      } finally {
        setLoading(false);
      }
    }
    if (session) loadSongs();
  }, [session]);

  // 🎯 Handle search results
  async function handleSearch(query) {
    if (!query || !session?.accessToken) return;
    setLoading(true);
    setAccessToken(session.accessToken);
    const results = await searchTracks(query);
    setSongs(results);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 px-6">
      {/* 🔑 Spotify Sign-in / Sign-out */}
      <div className="mb-10">
        <SpotifyAuthButton />
      </div>

      {/* 🏷️ Section Title */}
      <h2 className="text-3xl font-bold mb-10 text-center text-accent">
        🔥 Trending Tamil Songs 2025
      </h2>

      {/* 🎵 Song Grid */}
      {loading ? (
        <p className="text-center mt-20 text-gray-400">
          {session ? "Loading Spotify Tamil songs..." : "Please sign in 🎧"}
        </p>
      ) : songs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-10 w-full justify-items-center px-6">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-400">
          No songs found. Try another search 🎶
        </p>
      )}
    </div>
  );
}
