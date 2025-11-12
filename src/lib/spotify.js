// src/lib/spotify.js

let access_token = null;

export function setAccessToken(token) {
  access_token = token;
  console.log("✅ Spotify token set:", !!token);
}

/**
 * 🎧 Fetch Spotify Tamil Trending Songs (Stable Playlist)
 */
export async function fetchNewReleases() {
  if (!access_token) {
    console.warn("⚠ No Spotify token found — skipping fetch.");
    return [];
  }

  try {
    // ✅ Official “Tamil Hits 2025” playlist (or fallback)
    const TAMIL_PLAYLIST_ID = "37i9dQZF1DX9qNcUS2b2o2";

    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${TAMIL_PLAYLIST_ID}/tracks?limit=24`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!res.ok) {
      console.error("❌ Spotify fetch failed:", res.status, await res.text());
      return [];
    }

    const data = await res.json();
    console.log("✅ Spotify API returned", data.items?.length, "tracks");

    return (
      data.items
        ?.filter((item) => item.track)
        .map((item) => ({
          id: item.track.id,
          title: item.track.name,
          artist: item.track.artists.map((a) => a.name).join(", "),
          album: item.track.album.name,
          cover: item.track.album.images?.[0]?.url ?? "/placeholder.jpg",
          preview: item.track.preview_url,
          external_url: item.track.external_urls.spotify,
        })) ?? []
    );
  } catch (err) {
    console.error("💥 Error fetching Tamil playlist:", err);
    return [];
  }
}

/**
 * 🔍 Global Search
 */
export async function searchTracks(query) {
  if (!access_token) return [];
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=24`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.tracks.items.map((t) => ({
      id: t.id,
      title: t.name,
      artist: t.artists.map((a) => a.name).join(", "),
      album: t.album.name,
      cover: t.album.images?.[0]?.url ?? "/placeholder.jpg",
      preview: t.preview_url,
      external_url: t.external_urls.spotify,
    }));
  } catch (err) {
    console.error("Spotify search error:", err);
    return [];
  }
}

/**
 * 🧠 User’s Top Tracks (for Discover Page)
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

    return data.items.map((t) => ({
      id: t.id,
      title: t.name,
      artist: t.artists.map((a) => a.name).join(", "),
      album: t.album.name,
      cover: t.album.images?.[0]?.url ?? "/placeholder.jpg",
      preview: t.preview_url,
      external_url: t.external_urls.spotify,
    }));
  } catch (err) {
    console.error("Error fetching user top tracks:", err);
    return [];
  }
}
