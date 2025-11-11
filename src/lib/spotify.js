// src/lib/spotify.js

let access_token = null;

/**
 * 🔐 Set Spotify access token (after login)
 */
export function setAccessToken(token) {
  access_token = token;
}

/**
 * 🎵 Fetch Top Tamil Trending Songs (2025)
 * Uses Spotify search API to get Tamil genre tracks
 */
export async function fetchNewReleases() {
  if (!access_token) {
    console.error("Spotify access token missing");
    return [];
  }

  try {
    // Fetch Tamil genre tracks (limit 24 for clean grid)
    const res = await fetch(
      "https://api.spotify.com/v1/search?q=genre%3Atamil&type=track&limit=24",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch Tamil tracks:", res.statusText);
      return [];
    }

    const data = await res.json();
    return data.tracks?.items || [];
  } catch (err) {
    console.error("Error fetching Tamil tracks:", err);
    return [];
  }
}

/**
 * 🔍 Search Spotify tracks dynamically (used in Topbar search)
 */
export async function searchTracks(query) {
  if (!access_token) {
    console.error("Spotify access token missing for search");
    return [];
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=24`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Search request failed:", res.statusText);
      return [];
    }

    const data = await res.json();
    return data.tracks?.items || [];
  } catch (err) {
    console.error("Error searching Spotify:", err);
    return [];
  }
}

/**
 * 🧩 Optional — Fetch user’s top tracks (for Discover tab, future use)
 */
export async function fetchUserTopTracks() {
  if (!access_token) return [];

  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=24",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("Error fetching top tracks:", err);
    return [];
  }
}
