"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SpotifyAuthButton() {
  const { data: session } = useSession();

  if (!session)
    return (
      <button
        onClick={() => signIn("spotify")}
        className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition"
      >
        Sign in with Spotify
      </button>
    );

  return (
    <div className="flex items-center gap-3">
      <span>🎧 {session.user?.name}</span>
      <button
        onClick={() => signOut()}
        className="px-3 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
      >
        Sign out
      </button>
    </div>
  );
}
