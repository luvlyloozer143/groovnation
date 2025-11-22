// src/lib/spotify.js
import { YT_KEY } from "@/lib/env";

let access_token = null;
export function setAccessToken(token) {
  access_token = token;
}

/* -----------------------------------------------------------
   🔍 YouTube search helper (added, safe)
------------------------------------------------------------ */
async function findYouTubeVideo(title, artist) {
  try {
    const q = encodeURIComponent(`${title} ${artist} Official Video`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${q}&key=${YT_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.items?.[0]?.id?.videoId || null;
  } catch (err) {
    console.error("YT Search Error:", err);
    return null;
  }
}

/* ============================================================
   Fetch Tamil Trending Tracks  (UNCHANGED + YT ID added)
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

    const mapped = await Promise.all(
      data.tracks.items
        .filter((t) => t.album?.images?.[0]?.url)
        .map(async (t) => {
          const youtubeId = await findYouTubeVideo(
            t.name,
            t.artists.map((a) => a.name).join(", ")
          );

          return {
            id: t.id,
            title: t.name,
            artist: t.artists.map((a) => a.name).join(", "),
            artistId: t.artists?.[0]?.id || null,
            album: t.album.name,
            cover: t.album.images[0].url,
            preview: t.preview_url || null, // 🎧 still used by your audio player
            external_url: t.external_urls?.spotify,
            youtubeId, // 🎬 newly added
          };
        })
    );

    return mapped;
  } catch (err) {
    console.error("Tamil fetch error:", err);
    return [];
  }
}

/* ============================================================
   Global Search (UNCHANGED + YT added)
============================================================ */
export async function searchTracks(query) {
  if (!access_token) return [];
  if (!query || query.trim() === "") return [];

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=24&market=IN`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!res.ok) return [];

    const data = await res.json();

    const mapped = await Promise.all(
      data.tracks.items
        .filter((t) => t.album?.images?.[0]?.url)
        .map(async (t) => ({
          id: t.id,
          title: t.name,
          artist: t.artists.map((a) => a.name).join(", "),
          artistId: t.artists?.[0]?.id || null,
          album: t.album.name,
          cover: t.album.images[0].url,
          preview: t.preview_url || null,
          external_url: t.external_urls?.spotify,
          youtubeId: await findYouTubeVideo(
            t.name,
            t.artists.map((a) => a.name).join(", ")
          ),
        }))
    );

    return mapped;
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
}

/* ============================================================
   ⭐ Recommended Songs (UNCHANGED)
============================================================ */
export async function fetchRecommendations(artistId) {
  if (!access_token || !artistId) return [];

  try {
    const rel = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!rel.ok) return [];

    const data = await rel.json();
    const artists = data.artists.slice(0, 5).map((a) => a.id);

    let finalSongs = [];

    for (const id of artists) {
      const top = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      if (!top.ok) continue;
      const topData = await top.json();

      finalSongs.push(
        ...topData.tracks
          .filter((t) => t.album?.images?.[0]?.url)
          .map((t) => ({
            id: t.id,
            title: t.name,
            artist: t.artists.map((a) => a.name).join(", "),
            cover: t.album.images[0].url,
            preview: t.preview_url || null,
            external_url: t.external_urls?.spotify,
          }))
      );
    }

    return finalSongs.slice(0, 12);
  } catch (err) {
    console.error("Recommendation fetch error:", err);
    return [];
  }
}
