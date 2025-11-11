"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SpotifyAuthButton from "@/components/SpotifyAuthButton";
import SongCard from "@/components/cards/SongCard";
import { setAccessToken, fetchNewReleases, searchTracks } from "@/lib/spotify";

export default function HomePage() {
  // ✅ useSession hook safely defines 'session' and 'status'
  const { data: session, status } = useSession();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Load songs once authenticated
  useEffect(() => {
    async function loadSongs() {
      try {
        if (!session?.accessToken) return; // stop until token exists
        setAccessToken(session.accessToken);

        const releases = await fetchNewReleases();
        setSongs(releases);
      } catch (err) {
        console.error("Error loading Spotify songs:", err);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      loadSongs();
    }
  }, [session, status]);

  // 🎯 Optional live search function (for Topbar integration)
  async function handleSearch(query) {
    if (!query || !session?.accessToken) return;
    setLoading(true);
    setAccessToken(session.accessToken);
    const results = await searchTracks(query);
    setSongs(results);
    setLoading(false);
  }

  // 🌀 Loading state while session initializes
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        Connecting to Spotify...
      </div>
    );
  }

  // 🚫 Unauthenticated — show welcome + sign-in
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-4xl font-bold mb-4 text-accent">
          Welcome to GroovNation
        </h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Connect your Spotify account to explore trending tracks, discover new
          vibes, and groove nonstop 🎧
        </p>
        <SpotifyAuthButton />
      </div>
    );
  }

  // ✅ Authenticated — show songs
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 px-6">
      <h2 className="text-2xl font-semibold mb-8 text-accent">🔥 Trending Now</h2>

      {loading ? (
        <p className="text-center mt-20 text-gray-400">
          Loading Spotify tracks...
        </p>
      ) : songs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-400">No songs found 🎶</p>
      )}
    </div>
  );
}
