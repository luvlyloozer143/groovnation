// src/lib/spotify.js — FINAL (STATIC JSON + FAST LOAD)

let access_token = null;
export function setAccessToken(token) {
  access_token = token;
}

/* ============================================================
   FETCH STATIC SONG LIST (NO YOUTUBE API CALLS)
============================================================ */
export async function fetchNewReleases() {
  try {
    const res = await fetch("/data/songs.json");
    const songs = await res.json();
    return songs;
  } catch (err) {
    console.error("Static song load error:", err);
    return [];
  }
}

/* ============================================================
   GLOBAL SEARCH (LOCAL SEARCH FROM STATIC DATA)
============================================================ */
export async function searchTracks(query) {
  try {
    const res = await fetch("/data/songs.json");
    const songs = await res.json();

    if (!query || query.trim() === "") return songs;

    const lower = query.toLowerCase();
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(lower) ||
        s.artist.toLowerCase().includes(lower)
    );
  } catch (err) {
    console.error("Search filter error:", err);
    return [];
  }
}

/* ============================================================
   RECOMMENDATIONS (STATIC SHUFFLED PICK)
============================================================ */
export async function fetchRecommendations() {
  try {
    const res = await fetch("/data/songs.json");
    const songs = await res.json();

    return songs.sort(() => 0.5 - Math.random()).slice(0, 10);
  } catch (err) {
    console.error("Recommendation error:", err);
    return [];
  }
}
