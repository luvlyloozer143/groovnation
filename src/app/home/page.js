"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SpotifyAuthButton from "@/components/SpotifyAuthButton";
import SongCard from "@/components/cards/SongCard";
import { setAccessToken, fetchNewReleases } from "@/lib/spotify";

export default function HomePage() {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadSongs() {
    try {
      if (!session?.accessToken) {
        console.warn("⚠ No Spotify token found in session yet.");
        return;
      }

      console.log("🎧 Spotify access token found, fetching Tamil songs...");
      setAccessToken(session.accessToken);

      const releases = await fetchNewReleases();
      console.log("✅ Songs fetched:", releases.length);

      setSongs(releases);
    } catch (err) {
      console.error("💥 Error loading Tamil songs:", err);
    } finally {
      setLoading(false);
    }
  }
  if (session) loadSongs();
}, [session]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 px-6">
      {/* 🔑 Spotify Sign-in / Sign-out */}
      <div className="mb-8">
        <SpotifyAuthButton />
      </div>

      {/* 🎶 Section Title */}
      <h2 className="text-3xl font-bold mb-10 text-center text-accent">
        🎧 Trending Tamil Songs 2025
      </h2>

      {/* 🎵 Song Grid */}
      {loading ? (
        <p className="text-center mt-20 text-gray-400">
          {session ? "Loading Spotify songs..." : "Please sign in 🎧"}
        </p>
      ) : songs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-10 w-full justify-items-center px-6">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-400">
          No songs found. Try again 🎵
        </p>
      )}
    </div>
  );
}
