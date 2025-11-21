// src/lib/spotify.js

let access_token = null;

export function setAccessToken(token) {
  access_token = token;
}

/* ============================================================
   Fetch Tamil Trending Tracks (Home Page)
============================================================ */
export async function fetchNewReleases() {
  if (!access_token) return [];

  try {
    const q = encodeURIComponent("Tamil 2025 OR Tamil Hits OR Tamil Trending OR Anirudh OR Ilaiyaraaja OR Yuvan OR AR Rahman");
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${q}&type=track&market=IN&limit=50`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!res.ok) {
      console.error("Spotify search failed:", res.status);
      return [];
    }

    const data = await res.json();

    return data.tracks.items
      .filter((t) => t.preview_url && t.album?.images?.[0]?.url) // Only songs with audio!
      .map((t) => ({
        id: t.id,
        title: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        artistId: t.artists[0]?.id || "no-artist-id", // ← Never null → recommendations work
        album: t.album.name,
        cover: t.album.images[0].url,
        preview: t.preview_url, // Guaranteed to exist here
        external_url: t.external_urls.spotify,
      }));
  } catch (err) {
    console.error("fetchNewReleases error:", err);
    return [];
  }
}

/* ============================================================
   Global Search
============================================================ */
export async function searchTracks(query) {
  if (!access_token || !query?.trim()) return [];

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&market=IN&limit=50`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.tracks.items
      .filter((t) => t.preview_url && t.album?.images?.[0]?.url)
      .map((t) => ({
        id: t.id,
        title: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        artistId: t.artists[0]?.id || "no-artist-id",
        album: t.album.name,
        cover: t.album.images[0].url,
        preview: t.preview_url,
        external_url: t.external_urls.spotify,
      }));
  } catch (err) {
    console.error("searchTracks error:", err);
    return [];
  }
}

/* ============================================================
   Recommended Songs (Right Sidebar)
============================================================ */
export async function fetchRecommendations(artistId) {
  if (!access_token || !artistId || artistId === "no-artist-id") return [];

  try {
    // Get related artists
    const relRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!relRes.ok) return [];

    const relData = await relRes.json();
    const relatedArtistIds = relData.artists.slice(0, 6).map((a) => a.id);

    const recommendations = [];

    for (const id of relatedArtistIds) {
      const topRes = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      if (!topRes.ok) continue;

      const topData = await topRes.json();

      const validTracks = topData.tracks
        .filter((t) => t.preview_url && t.album?.images?.[0]?.url)
        .slice(0, 4)
        .map((t) => ({
          id: t.id,
          title: t.name,
          artist: t.artists.map((a) => a.name).join(", "),
          cover: t.album.images[0].url,
          preview: t.preview_url,
          external_url: t.external_urls.spotify,
        }));

      recommendations.push(...validTracks);
    }

    return recommendations.slice(0, 12);
  } catch (err) {
    console.error("fetchRecommendations error:", err);
    return [];
  }
}