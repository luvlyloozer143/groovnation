// src/components/YouTubeBackgroundPlayer.jsx
"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/store";

export default function YouTubeBackgroundPlayer() {
  const { videoId, setPlayerRef, isPlaying } = usePlayerStore();
  const playerRef = useRef(null);

  useEffect(() => {
    if (window.YT) init();
    else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = init;
    }
  }, []);

  const init = () => {
    if (playerRef.current) return;

    const player = new window.YT.Player("yt-bg-player", {
      height: "100%",
      width: "100%",
      playerVars: {
        autoplay: 1,
        loop: 1,
        controls: 0,
        mute: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
      },
      events: {
        onReady: (ev) => {
          setPlayerRef(ev.target);
        },
      },
    });
  };

  useEffect(() => {
    if (!videoId) return;
    if (!usePlayerStore.getState().playerRef) return;

    const player = usePlayerStore.getState().playerRef;
    player.loadVideoById(videoId);
    isPlaying ? player.playVideo() : player.pauseVideo();
  }, [videoId]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl">
      <div id="yt-bg-player" className="w-full h-full"></div>
    </div>
  );
}
