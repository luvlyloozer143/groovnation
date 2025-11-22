"use client";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/store";

export default function YouTubeBackgroundPlayer({ videoId }) {
  const playerRef = useRef(null);
  const { isPlaying } = usePlayerStore();

  useEffect(() => {
    if (!videoId) return;

    if (window.YT) initPlayer();
    else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, [videoId]);

  const initPlayer = () => {
    if (playerRef.current) return;

    new window.YT.Player("yt-cinematic-player", {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        iv_load_policy: 3,
        playsinline: 1,
        mute: 0,
      },
      events: {
        onReady: (e) => {
          playerRef.current = e.target;
          isPlaying ? e.target.playVideo() : e.target.pauseVideo();
        },
      },
    });
  };

  useEffect(() => {
    if (!playerRef.current || !videoId) return;
    if (isPlaying) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [isPlaying, videoId]);

  if (!videoId) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        id="yt-cinematic-player"
        className="w-full h-full scale-150 blur-3xl opacity-50"
        style={{ transform: "scale(1.5)", filter: "blur(80px) brightness(0.8)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    </div>
  );
}