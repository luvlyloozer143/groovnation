// src/components/YouTubeBackgroundPlayer.jsx
"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/store";

export default function YouTubeBackgroundPlayer() {
  const { videoId, setPlayerRef, isPlaying } = usePlayerStore();
  const ref = useRef(null);

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
    if (ref.current) return;
    const player = new window.YT.Player("yt-bg", {
      videoId,
      playerVars: { autoplay: 1, controls: 0, rel: 0, mute: 0, modestbranding: 1, playsinline: 1 },
      events: { onReady: (e) => setPlayerRef(e.target) },
    });
    ref.current = player;
  };

  useEffect(() => {
    if (!videoId) return;
    const p = usePlayerStore.getState().playerRef;
    if (!p) return;
    p.loadVideoById(videoId);
    isPlaying ? p.playVideo() : p.pauseVideo();
  }, [videoId]);

  return <div id="yt-bg" className="absolute inset-0 w-full h-full -z-10 opacity-40"></div>;
}
