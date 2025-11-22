"use client";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/store";

export default function YouTubeBackgroundPlayer() {
  const { currentYoutubeId, isPlaying } = usePlayerStore();
  const playerRef = useRef(null);

  useEffect(() => {
    if (!currentYoutubeId) return;

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = createPlayer;
      document.body.appendChild(tag);
    }
  }, [currentYoutubeId]);

  const createPlayer = () => {
    if (playerRef.current) return;

    new window.YT.Player("yt-player", {
      videoId: currentYoutubeId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        iv_load_policy: 3,
        playsinline: 1,
      },
      events: {
        onReady: (e) => {
          playerRef.current = e.target;
          e.target.playVideo();
        },
      },
    });
  };

  useEffect(() => {
    if (!playerRef.current) return;
    if (isPlaying) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [isPlaying]);

  if (!currentYoutubeId) return null;

  return (
    <div className="fixed inset-0 top-24 -z-20 pointer-events-none overflow-hidden">
      <div
        id="yt-player"
        className="w-full h-full scale-150 blur-3xl brightness-75"
        style={{ transform: "scale(1.8)", filter: "blur(120px) brightness(0.7)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
    </div>
  );
}