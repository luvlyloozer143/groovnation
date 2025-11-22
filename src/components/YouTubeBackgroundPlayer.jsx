"use client";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/store";

export default function YouTubeBackgroundPlayer() {
  const { currentSong, isPlaying, setYtPlayer } = usePlayerStore();
  const playerRef = useRef(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = initPlayer;
      document.body.appendChild(tag);
    } else if (!playerRef.current) {
      initPlayer();
    }
  }, []);

  const initPlayer = () => {
    if (playerRef.current) return;

    const player = new window.YT.Player("yt-cinematic-player", {
      height: "100%",
      width: "100%",
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        iv_load_policy: 3,
        playsinline: 1,
      },
      events: {
        onReady: (e) => {
          playerRef.current = e.target;
          setYtPlayer(e.target);
          const song = currentSong();
          if (song?.youtubeId) {
            e.target.loadVideoById(song.youtubeId);
            if (isPlaying) e.target.playVideo();
          }
        },
      },
    });
  };

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !currentSong()) return;
    if (currentSong()?.youtubeId) {
      player.loadVideoById(currentSong().youtubeId);
      isPlaying ? player.playVideo() : player.pauseVideo();
    }
  }, [currentSong()?.id, isPlaying]);

  if (!currentSong()) return null;

  return (
    <div className="fixed inset-0 top-24 -z-20 pointer-events-none overflow-hidden">
      <div
        id="yt-cinematic-player"
        className="absolute inset-0 w-full h-full scale-150 blur-3xl brightness-75"
        style={{ transform: "scale(1.6)", filter: "blur(100px) brightness(0.7)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
    </div>
  );
}