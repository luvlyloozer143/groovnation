// src/components/YouTubeBackgroundPlayer.jsx
"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/store";

export default function YouTubeBackgroundPlayer() {
  const { videoId, setPlayerRef, isPlaying } = usePlayerStore();
  const localPlayerRef = useRef(null);

  useEffect(() => {
    // Load YT API
    if (window.YT) initPlayer();
    else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  const initPlayer = () => {
    if (localPlayerRef.current) return;

    const player = new window.YT.Player("yt-bg-player", {
      height: "100%",
      width: "100%",
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        modestbranding: 1,
        rel: 0,
        mute: 0,
        playsinline: 1,
      },
      events: {
        onReady: (ev) => {
          setPlayerRef(ev.target);
        },
      },
    });

    localPlayerRef.current = player;
  };

  // Load + play video when a track selected
  useEffect(() => {
    if (!videoId) return;

    const player = usePlayerStore.getState().playerRef;
    if (!player) return;

    player.loadVideoById(videoId);
    isPlaying ? player.playVideo() : player.pauseVideo();
  }, [videoId, isPlaying]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl">

      {/* Background YouTube video */}
      <div
        id="yt-bg-player"
        className="w-full h-full transition-all duration-500 
                   opacity-0 pointer-events-none
                   data-[active=true]:opacity-40"
        data-active={videoId ? "true" : "false"}
      />

      {/* 🔥 Overlay container (Big Card will be placed here) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" id="video-overlay-slot"></div>

    </div>
  );
}
