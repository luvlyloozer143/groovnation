// src/lib/spotify.js

let access_token = null;

export function setAccessToken(token) {
  access_token = token;
}

/**
 * 🎧 Fetch Spotify Tamil Trending Songs (Stable Playlist ID)
 */
export async function fetchNewReleases() {
  if (!access_token) {
    console.error("Spotify access token missing");
    return [];
  }

  try {
    // 🔥 Official Spotify playlist: “Tamil Hits 2025” (always active)
    const TAMIL_PLAYLIST_ID = "37i9dQZF1DX9qNcUS2b2o2"; // replace with Tamil playlist ID

    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${TAMIL_PLAYLIST_ID}/tracks?limit=24`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!res.ok) {
      console.error("Spotify playlist fetch failed:", res.statusText);
      return [];
    }

    const data = await res.json();

    // Return cleaned track list
    return data.items
      .filter((item) => item.track)
      .map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists.map((a) => a.name).join(", "),
        album: item.track.album.name,
        cover: item.track.album.images[0]?.url,
        preview: item.track.preview_url,
      }));
  } catch (err) {
    console.error("Error fetching Tamil playlist:", err);
    return [];
  }
}

/**
 * 🔍 Search songs globally on Spotify
 */
export async function searchTracks(query) {
  if (!access_token) return [];

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=24`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    if (!res.ok) return [];

    const data = await res.json();
    return data.tracks.items.map((t) => ({
      id: t.id,
      title: t.name,
      artist: t.artists.map((a) => a.name).join(", "),
      album: t.album.name,
      cover: t.album.images[0]?.url,
      preview: t.preview_url,
    }));
  } catch (err) {
    console.error("Spotify search error:", err);
    return [];
  }
}

/**
 * 🧠 Fetch User's Top Tracks (for Discover later)
 */
export async function fetchUserTopTracks() {
  if (!access_token) return [];
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=24",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data.items.map((item) => ({
      id: item.id,
      title: item.name,
      artist: item.artists.map((a) => a.name).join(", "),
      album: item.album.name,
      cover: item.album.images[0]?.url,
    }));
  } catch (err) {
    console.error("Error fetching top tracks:", err);
    return [];
  }
}
