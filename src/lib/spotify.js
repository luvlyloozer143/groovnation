// src/lib/spotify.js
let access_token = null;
export function setAccessToken(token) {
  access_token = token;
}

/* ============================================================
   Tamil Trending Songs
============================================================ */
export async function fetchNewReleases() {
  if (!access_token) return [];

  try {
    const q = encodeURIComponent("Tamil 2025 OR Tamil Hits OR Tamil Trending");
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${q}&type=track&market=IN&limit=24`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.tracks.items
      .filter((t) => t.album?.images?.[0]?.url)
      .map((t) => ({
        id: t.id,
        title: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        artistId: t.artists?.[0]?.id || null,
        album: t.album.name,
        cover: t.album.images[0].url,
        preview: t.preview_url || null,    // ⭐ REQUIRED FOR PLAYERBAR
        external_url: t.external_urls?.spotify,
      }));
  } catch (err) {
    console.error("Tamil fetch error:", err);
    return [];
  }
}

/* ============================================================
   Global Search
============================================================ */
export async function searchTracks(query) {
  if (!access_token) return [];
  if (!query || query.trim() === "") return [];

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=24&market=IN`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!res.ok) return [];
    const data = await res.json();

    return data.tracks.items
      .filter((t) => t.album?.images?.[0]?.url)
      .map((t) => ({
        id: t.id,
        title: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        artistId: t.artists?.[0]?.id || null,
        album: t.album.name,
        cover: t.album.images[0].url,
        preview: t.preview_url || null,
        external_url: t.external_urls?.spotify,
      }));
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
}
