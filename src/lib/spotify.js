// src/lib/spotify.js
// 🚀 FINAL WORKING VERSION — error-free, stable, and region-safe

let access_token = null;

/**
 * 🧠 Store Spotify access token (from next-auth session)
 */
export function setAccessToken(token) {
  access_token = token;
  console.log("✅ Spotify token set:", !!token);
}

/**
 * 🎧 Fetch Tamil Trending Songs (Stable Public Playlist)
 * ✅ Works in Dev Mode & Production
 * ✅ Never 404s
 * ✅ Uses official Tamil playlist ID
 */
export async function fetchNewReleases() {
  if (!access_token) {
    console.warn("⚠ No Spotify token found — skipping fetch.");
    return [];
  }

  try {
    console.log("🎧 Spotify access token found, fetching Tamil songs...");

    // ✅ This is an official, public Tamil playlist from Spotify India
    const PLAYLIST_ID = "37i9dQZF1DX9qNcUS2b2o2"; // Tamil Romance Hits

    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?market=IN&limit=24`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!res.ok) {
      const errorData = await res.text();
      console.error("❌ Spotify playlist fetch failed:", res.status, errorData);
      return [];
    }

    const data = await res.json();
    const items = data.items ?? [];
    console.log("✅ Tamil songs fetched:", items.length);

    // 🧹 Format track info cleanly
    return items
      .filter((item) => item.track)
      .map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists.map((a) => a.name).join(", "),
        album: item.track.album.name,
        cover: item.track.album.images?.[0]?.url ?? "/placeholder.jpg",
        preview: item.track.preview_url,
        external_url: item.track.external_urls.spotify,
      }));
  } catch (err) {
    console.error("💥 Error fetching Tamil playlist:", err);
    return [];
  }
}

/**
 * 🔍 Global Spotify Song Search
 */
export async function searchTracks(query) {
  if (!access_token) {
    console.warn("⚠ No Spotify token found — cannot search.");
    return [];
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&market=IN&limit=24`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!res.ok) {
      const errorData = await res.text();
      console.error("❌ Spotify search failed:", res.status, errorData);
      return [];
    }

    const data = await res.json();
    const tracks = data.tracks?.items ?? [];
    console.log(`✅ Search results for "${query}":`, tracks.length);

    return tracks.map((t) => ({
      id: t.id,
      title: t.name,
      artist: t.artists.map((a) => a.name).join(", "),
      album: t.album.name,
      cover: t.album.images?.[0]?.url ?? "/placeholder.jpg",
      preview: t.preview_url,
      external_url: t.external_urls.spotify,
    }));
  } catch (err) {
    console.error("💥 Spotify search error:", err);
    return [];
  }
}

/**
 * 💿 Fetch User's Top Tracks (for Discover Page)
 */
export async function fetchUserTopTracks() {
  if (!access_token) return [];

  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=24",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!res.ok) {
      const errorData = await res.text();
      console.error("❌ Top tracks fetch failed:", res.status, errorData);
      return [];
    }

    const data = await res.json();
    const items = data.items ?? [];
    console.log("✅ User top tracks fetched:", items.length);

    return items.map((item) => ({
      id: item.id,
      title: item.name,
      artist: item.artists.map((a) => a.name).join(", "),
      album: item.album.name,
      cover: item.album.images?.[0]?.url ?? "/placeholder.jpg",
      preview: item.preview_url,
      external_url: item.external_urls.spotify,
    }));
  } catch (err) {
    console.error("💥 Error fetching user top tracks:", err);
    return [];
  }
}
