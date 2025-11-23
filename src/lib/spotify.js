// src/lib/spotify.js
const YT_KEY = process.env.NEXT_PUBLIC_YT_KEY;

let access_token = null;
export function setAccessToken(token) {
  access_token = token;
}

/* SAFER YouTube Search — Handles 403 quota error gracefully */
async function findYouTubeVideo(title, artist) {
  if (!YT_KEY) return null;

  try {
    const q = encodeURIComponent(`${title} ${artist} official audio OR official video`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=3&q=${q}&key=${YT_KEY}`;

    const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1 hour
    if (!res.ok) return null; // 403, 429, etc → skip silently

    const data = await res.json();
    for (const item of data.items || []) {
      if (item.id?.videoId) return item.id.videoId;
    }
    return null;
  } catch (e) {
    // Silently fail — your key is probably over quota
    return null;
  }
}

/* FETCH TAMIL TRENDING SONGS */
export async function fetchNewReleases() {
  if (!access_token) return [];

  try {
    const res = await fetch(
      "https://api.spotify.com/v1/search?q=tamil+2025+trending+OR+tamil+hits&type=track&market=IN&limit=30",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    if (!res.ok) return [];

    const data = await res.json();
    const items = data.tracks?.items || [];

    const songs = [];
    for (const t of items) {
      if (!t.album?.images?.[0]?.url) continue;

      const videoId = await findYouTubeVideo(t.name, t.artists?.[0]?.name || "");

      songs.push({
        id: t.id,
        title: t.name,
        artist: t.artists?.map(a => a.name).join(", ") || "Unknown",
        artistId: t.artists?.[0]?.id || null,
        album: t.album.name,
        cover: t.album.images[0].url,
        preview: t.preview_url,
        youtubeId: videoId,
      });
    }
    return songs;
  } catch (err) {
    console.error("fetchNewReleases error:", err);
    return [];
  }
}

/* GLOBAL SEARCH */
export async function searchTracks(query) {
  if (!access_token || !query?.trim()) return [];

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=30&market=IN`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    if (!res.ok) return [];

    const data = await res.json();
    const items = data.tracks?.items || [];

    const songs = [];
    for (const t of items) {
      if (!t.album?.images?.[0]?.url) continue;

      const videoId = await findYouTubeVideo(t.name, t.artists?.[0]?.name || "");

      songs.push({
        id: t.id,
        title: t.name,
        artist: t.artists?.map(a => a.name).join(", ") || "Unknown",
        artistId: t.artists?.[0]?.id || null,
        cover: t.album.images[0].url,
        preview: t.preview_url,
        youtubeId: videoId,
      });
    }
    return songs;
  } catch (err) {
    console.error("searchTracks error:", err);
    return [];
  }
}

/* RECOMMENDATIONS — NOW 100% SAFE (NO CRASH) */
export async function fetchRecommendations(artistId) {
  if (!access_token || !artistId) return [];

  try {
    const rel = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!rel.ok) return []; // 404 or error → just return empty

    const data = await rel.json();
    const relatedArtists = data.artists || [];

    const recommendations = [];

    for (const artist of relatedArtists.slice(0, 5)) {
      try {
        const top = await fetch(
          `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=IN`,
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        if (!top.ok) continue;

        const topData = await top.json();
        const tracks = topData.tracks || [];

        for (const t of tracks.slice(0, 3)) {
          if (!t.album?.images?.[0]?.url) continue;

          const videoId = await findYouTubeVideo(t.name, t.artists?.[0]?.name || "");

          recommendations.push({
            id: t.id,
            title: t.name,
            artist: t.artists?.map(a => a.name).join(", ") || "Unknown",
            cover: t.album.images[0].url,
            preview: t.preview_url,
            youtubeId: videoId,
          });
        }
      } catch (e) {
        continue; // skip this artist if top-tracks fails
      }
    }

    return recommendations.slice(0, 12);
  } catch (err) {
    console.warn("Recommendations failed (normal for some artists):", err);
    return [];
  }
}