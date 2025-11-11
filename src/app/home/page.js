"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SongCard from "@/components/cards/SongCard";
import { setAccessToken, fetchNewReleases, searchTracks } from "@/lib/spotify";
import { useUIStore } from "@/lib/store"; // optional global search handler (Zustand)

export default function HomePage() {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load Spotify new releases (top trending songs)
  useEffect(() => {
    async function loadTrending() {
      try {
        if (!session?.accessToken) return;
        setAccessToken(session.accessToken);
        const trending = await fetchNewReleases();
        setSongs(trending);
      } catch (err) {
        console.error("Error fetching trending songs:", err);
      } finally {
        setLoading(false);
      }
    }

    if (session) loadTrending();
  }, [session]);

  // 🎯 Handle search queries (from Topbar)
  async function handleSearch(query) {
    if (!query?.trim() || !session?.accessToken) return;
    setLoading(true);
    try {
      setAccessToken(session.accessToken);
      const results = await searchTracks(query);
      setSongs(results);
    } catch (err) {
      console.error("Error searching tracks:", err);
    } finally {
      setLoading(false);
    }
  }

  // Optional — expose handleSearch globally via Zustand
  // so Topbar can trigger it
  // useUIStore.setState({ onSearch: handleSearch });

  // 🧠 If user isn’t signed in, protect the page
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-gray-400 text-lg">
          Please sign in to view top trending songs 🎧
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 px-6">
      {/* 🔥 Section Header */}
      <h2 className="text-2xl font-semibold mb-6 text-accent">
        🔥 Top Trending Songs
      </h2>

      {/* 🎵 Song Cards Grid */}
      {loading ? (
        <p className="text-center mt-20 text-gray-400">
          Loading Spotify songs...
        </p>
      ) : songs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full">
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

// 🔥 Register global search handler when page mounts
useEffect(() => {
  useUIStore.getState().setOnSearch(handleSearch);
}, [session]);
