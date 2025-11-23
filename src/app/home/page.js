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
  const [tamilSongs, setTamilSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const setOnSearch = useUIStore((s) => s.setOnSearch);
  const { canvasMode, currentSong } = usePlayerStore();

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

  const current = currentSong();

  return (
    <div className="relative flex flex-col items-center min-h-screen pt-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white z-10">
        Trending Tamil Songs 2025
      </h2>

      {/* Cinematic Video Background — Only when playing */}
      {canvasMode && current?.youtubeId && (
        <div className="absolute top-24 inset-x-0 w-full h-[80vh] -z-10">
          <YouTubeBackgroundPlayer videoId={current.youtubeId} />
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 mt-10">Loading Tamil Songs…</p>
      ) : (
        <>
          {/* NORMAL GRID — When not playing */}
          {!canvasMode && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 w-full justify-items-center px-2">
              {songs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          )}
          {/* SPOTIFY CANVAS — When playing */}
          {canvasMode && current && (
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              <motion.div
                className="relative w-96 h-96 bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={current.cover}
                    alt={current.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{current.title}</h3>
                <p className="text-lg opacity-80">{current.artist}</p>
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
}