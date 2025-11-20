let access_token = null;

export function setAccessToken(token) {
  access_token = token;
}

/* ============================================================
   🎧 Fetch Tamil Trending Tracks
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
        preview: t.preview_url,
        external_url: t.external_urls?.spotify,
      }));
  } catch (err) {
    console.error("Tamil fetch error:", err);
    return [];
  }
}

/* ============================================================
   🔍 Global Search
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

    return data.tracks.items
      .filter((t) => t.album?.images?.[0]?.url)
      .map((t) => ({
        id: t.id,
        title: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        artistId: t.artists?.[0]?.id || null,
        album: t.album.name,
        cover: t.album.images[0]?.url,
        preview: t.preview_url,
        external_url: t.external_urls?.spotify,
      }));
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
}

/* ============================================================
   ⭐ NEW — Recommended Songs (Based on Artist ID)
============================================================ */
export async function fetchRecommendations(artistId) {
  if (!access_token || !artistId) return [];

  try {
    // First: get related artists
    const rel = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!rel.ok) return [];

    const data = await rel.json();
    const artists = data.artists.slice(0, 5).map((a) => a.id); // Top 5 similar artists

    let finalSongs = [];

    // Now fetch a few top tracks from each similar artist
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
            preview: t.preview_url,
            external_url: t.external_urls.spotify,
          }))
      );
    }

    return finalSongs.slice(0, 12); // return max 12 recommendations
  } catch (err) {
    console.error("Recommendation fetch error:", err);
    return [];
  }
}
