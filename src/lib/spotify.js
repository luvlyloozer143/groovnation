// src/lib/spotify.js

let access_token = null;

/**
 * 🔑 Store access token from Spotify (set after login)
 */
export function setAccessToken(token) {
  access_token = token;
}

/**
 * 🎧 Fetch Real Spotify Trending Tamil Songs (Dynamic & Live)
 *
 * Logic:
 * 1️⃣ Fetch Spotify's featured playlists (country: IN)
 * 2️⃣ Find the one that contains the word "Tamil"
 * 3️⃣ Fetch and return the top 24 tracks from that playlist
 */
export async function fetchNewReleases() {
  if (!access_token) {
    console.error("Spotify access token missing");
    return [];
  }

  try {
    // Step 1: Get all featured playlists from Spotify India
    const playlistsRes = await fetch(
      "https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=20",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!playlistsRes.ok) {
      console.error("Failed to fetch featured playlists:", playlistsRes.statusText);
      return [];
    }

    const playlistsData = await playlistsRes.json();

    // Step 2: Find the Tamil playlist automatically
    const tamilPlaylist = playlistsData.playlists.items.find((p) =>
      p.name.toLowerCase().includes("tamil")
    );

    if (!tamilPlaylist) {
      console.warn("No Tamil playlist found in featured section");
      return [];
    }

    console.log("🎯 Found Tamil Playlist:", tamilPlaylist.name);

    // Step 3: Fetch tracks from that playlist
    const tracksRes = await fetch(
      `https://api.spotify.com/v1/playlists/${tamilPlaylist.id}/tracks?limit=24`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!tracksRes.ok) {
      console.error("Failed to fetch playlist tracks:", tracksRes.statusText);
      return [];
    }

    const data = await tracksRes.json();
    return data.items
      .filter((item) => item.track)
      .map((item) => item.track);
  } catch (err) {
    console.error("Error fetching Tamil playlist:", err);
    return [];
  }
}

/**
 * 🔍 Search songs dynamically on Spotify
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
      console.error("Spotify search request failed:", res.statusText);
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
 * 🎵 Fetch user's top tracks (used for Discover Page later)
 */
export async function fetchUserTopTracks() {
  if (!access_token) return [];

  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=24",
      {
        headers: { Authorization: `Bearer ${access_token}` },
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
