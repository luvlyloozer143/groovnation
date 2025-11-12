let access_token = null;

export function setAccessToken(token) {
  access_token = token;
}

/**
 * 🎧 Fetch real Spotify Tamil tracks with valid cover URLs
 */
export async function fetchNewReleases() {
  if (!access_token) {
    console.error("Spotify access token missing");
    return [];
  }

  try {
    console.log("🎧 fetchNewReleases starting...");

    // 🔍 Use search endpoint instead of playlists
    const query = encodeURIComponent("Tamil 2025");
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&market=IN&limit=24`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!res.ok) {
      console.error("Spotify search failed:", res.status, await res.text());
      return [];
    }

    const data = await res.json();

    // 🎵 Map tracks with valid images only
    const tracks = data.tracks.items
      .filter(
        (t) =>
          t.album?.images?.length > 0 &&
          t.album.images[0].url?.startsWith("https://i.scdn.co/image/")
      )
      .map((t) => ({
        id: t.id,
        title: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        album: t.album.name,
        cover: t.album.images[0].url,
        preview: t.preview_url,
        external_url: t.external_urls.spotify,
      }));

    console.log(`✅ Songs fetched: ${tracks.length}`);
    return tracks;
  } catch (err) {
    console.error("🔥 Error fetching Tamil songs:", err);
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
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=24&market=IN`,
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
      external_url: t.external_urls.spotify,
    }));
  } catch (err) {
    console.error("Spotify search error:", err);
    return [];
  }
}

/**
 * 🧠 User Top Tracks
 */
export async function fetchUserTopTracks() {
  if (!access_token) return [];
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=24&market=IN",
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
      preview: item.preview_url,
    }));
  } catch (err) {
    console.error("Error fetching top tracks:", err);
    return [];
  }
}
