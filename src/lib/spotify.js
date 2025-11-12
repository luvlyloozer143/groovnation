// src/lib/spotify.js

let access_token = null;

/**
 * 🧠 Store access token globally (set by next-auth session)
 */
export function setAccessToken(token) {
  access_token = token;
  console.log("✅ Spotify token set:", !!token);
}

/**
 * 🎧 Fetch Tamil Trending Songs using Spotify Browse API (region-safe)
 * Automatically fetches top Tamil playlist for Indian users.
 */
export async function fetchNewReleases() {
  if (!access_token) {
    console.warn("⚠ No Spotify token found — skipping fetch.");
    return [];
  }

  try {
    // Step 1️⃣ — Get Tamil category playlists (region-safe)
    const categoryRes = await fetch(
      `https://api.spotify.com/v1/browse/categories/tamil/playlists?country=IN&limit=1`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!categoryRes.ok) {
      console.error("❌ Tamil category fetch failed:", categoryRes.status);
      const errText = await categoryRes.text();
      console.log("Error Response:", errText);
      return [];
    }

    const categoryData = await categoryRes.json();
    const playlist = categoryData.playlists?.items?.[0];

    if (!playlist) {
      console.warn("⚠ No Tamil playlists found in Browse API.");
      return [];
    }

    const playlistId = playlist.id;
    console.log("✅ Found Tamil playlist:", playlist.name);

    // Step 2️⃣ — Fetch songs from the found Tamil playlist
    const trackRes = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=IN&limit=24`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!trackRes.ok) {
      console.error("❌ Track fetch failed:", trackRes.status);
      const errText = await trackRes.text();
      console.log("Track Fetch Error:", errText);
      return [];
    }

    const data = await trackRes.json();
    console.log("✅ Tamil playlist tracks fetched:", data.items?.length);

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
    console.error("💥 Error fetching Tamil trending songs:", err);
    return [];
  }
}

/**
 * 🔍 Global Search (Spotify tracks)
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
      console.error("❌ Spotify search failed:", res.status);
      return [];
    }

    const data = await res.json();
    return (
      data.tracks?.items?.map((t) => ({
        id: t.id,
        title: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        album: t.album.name,
        cover: t.album.images?.[0]?.url ?? "/placeholder.jpg",
        preview: t.preview_url,
        external_url: t.external_urls.spotify,
      })) ?? []
    );
  } catch (err) {
    console.error("💥 Spotify search error:", err);
    return [];
  }
}

/**
 * 💿 User Top Tracks (for Discover page)
 */
export async function fetchUserTopTracks() {
  if (!access_token) return [];
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=24",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!res.ok) {
      console.error("❌ Top tracks fetch failed:", res.status);
      return [];
    }

    const data = await res.json();
    return (
      data.items?.map((item) => ({
        id: item.id,
        title: item.name,
        artist: item.artists.map((a) => a.name).join(", "),
        album: item.album.name,
        cover: item.album.images?.[0]?.url ?? "/placeholder.jpg",
        preview: item.preview_url,
        external_url: item.external_urls.spotify,
      })) ?? []
    );
  } catch (err) {
    console.error("💥 Error fetching user top tracks:", err);
    return [];
  }
}
