"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SongCard from "@/components/cards/SongCard";
import { setAccessToken, fetchNewReleases } from "@/lib/spotify";
import SpotifyAuthButton from "@/components/SpotifyAuthButton"; // keep for redirect but hidden

export default function HomePage() {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-6">
      {/* Hidden Spotify button just in case (don’t remove for auth) */}
      <div className="hidden">
        <SpotifyAuthButton />
      </div>

      {/* ✅ Clean header */}
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="text-3xl font-bold text-black tracking-tight">
          Trending Tamil Songs 2025
        </h2>
      </div>

      {/* 🎵 Song Grid */}
      {loading ? (
        <p className="text-center mt-10 text-gray-400">
          {session ? "Loading Spotify songs..." : "Please sign in 🎧"}
        </p>
      ) : songs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 w-full justify-items-center px-2">
          {songs.map((song, index) => (
            <SongCard key={index} song={song} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-400">
          No songs found. Try again 🎵
        </p>
      )}
    </div>
  );
}
