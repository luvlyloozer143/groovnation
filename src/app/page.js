"use client";

import { motion } from "framer-motion";
import SpotifyAuthButton from "@/components/SpotifyAuthButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // 🚀 Redirect if already signed in
  if (session?.user) {
    router.push("/home");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center relative overflow-hidden">
      {/* dreamy pastel background */}
      <div className="absolute inset-0 gradient-overlay -z-10" />

      {/* Animated heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl sm:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400"
      >
        Welcome to GroovNation
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-gray-500 dark:text-gray-300 text-lg mb-12 max-w-lg"
      >
        Connect your Spotify account to explore trending tracks, discover new vibes, and groove nonstop 🎧
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <SpotifyAuthButton />
      </motion.div>

      {/* floating glow */}
      <div className="absolute w-96 h-96 bg-gradient-to-tr from-sky-300/20 to-purple-300/20 rounded-full blur-3xl -z-20 animate-pulse" />
    </div>
  );
}
