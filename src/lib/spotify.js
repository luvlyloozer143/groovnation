// src/lib/spotify.js

let access_token = null;

/**
 * 🧠 Store Spotify access token (from next-auth session)
 */
export function setAccessToken(token) {
  access_token = token;
  console.log("✅ Spotify token set:", !!token);
}

/**
 * 🎧 Fetch Tamil Trending Songs using Spotify Featured Playlists (region-safe)
 * Dynamically finds any featured playlist that contains Tamil songs.
 */
export async function fetchNewReleases() {
  if (!access_token) {
    console.warn("⚠ No Spotify token found — skipping fetch.");
    return [];
  }

  try {
    console.log("🎧 Fetching featured playlists for India...");

    // 1️⃣ Get featured playlists (region-safe endpoint)
    const featuredRes = await fetch(
      `https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=20`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!featuredRes.ok) {
      console.error("❌ Featured playlists fetch failed:", featuredRes.status);
      const errText = await featuredRes.text();
      console.log("Error Response:", errText);
      return [];
    }

    const featuredData = await featuredRes.json();
    const playlists = featuredData.playlists?.items || [];

    // 2️⃣ Filter playlist related to Tamil
    const tamilPlaylist = playlists.find(
      (p) =>
        p.name.toLowerCase().includes("tamil") ||
        p.description.toLowerCase().includes("tamil")
    );

    if (!tamilPlaylist) {
      console.warn("⚠ No Tamil playlist found in featured playlists.");
      return [];
    }

    const playlistId = tamilPlaylist.id;
    console.log("✅ Found Tamil playlist:", tamilPlaylist.name);

    // 3️⃣ Fetch the Tamil playlist tracks
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

    // 4️⃣ Format the track info
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
 * 🔍 Search for songs globally (Spotify Search API)
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
