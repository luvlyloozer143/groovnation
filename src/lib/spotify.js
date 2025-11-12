// src/lib/spotify.js
// Robust final version: tries playlist -> featured -> search fallback

let access_token = null;

export function setAccessToken(token) {
  access_token = token;
  console.log("✅ Spotify token set:", !!token);
}

/**
 * 🎧 Robust fetchNewReleases:
 * 1) Try stable public playlist (fast)
 * 2) Try featured playlists (if allowed)
 * 3) FALLBACK -> Search for "Tamil" tracks (always works)
 */
export async function fetchNewReleases() {
  if (!access_token) {
    console.warn("⚠ No Spotify token found — skipping fetch.");
    return [];
  }

  // helper to fetch playlist by id
  async function fetchPlaylistTracks(playlistId) {
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=IN&limit=24`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      if (!res.ok) {
        const txt = await res.text();
        console.warn("playlist fetch failed", res.status, txt);
        return null;
      }
      const json = await res.json();
      return json.items?.filter(i => i.track).map(i => i.track) ?? [];
    } catch (e) {
      console.error("playlist fetch error", e);
      return null;
    }
  }

  // helper to search tracks (fallback)
  async function searchTamilTracks() {
    try {
      const q = encodeURIComponent("Tamil");
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${q}&type=track&market=IN&limit=24`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      if (!res.ok) {
        const txt = await res.text();
        console.warn("search fetch failed", res.status, txt);
        return [];
      }
      const data = await res.json();
      return data.tracks?.items ?? [];
    } catch (e) {
      console.error("search fetch error", e);
      return [];
    }
  }

  try {
    console.log("🎧 fetchNewReleases starting...");

    // 1) Try a known public playlist ID (fast)
    // You can swap this ID anytime if you find a better public Tamil playlist
    const CANDIDATE_PLAYLISTS = [
      "37i9dQZF1DX9qNcUS2b2o2", // common Tamil playlist — may sometimes 404 in some setups
      "37i9dQZF1DX4Im4BVvD2Pf", // alternative
      "37i9dQZF1DX1i3hvzHpcQV"  // another candidate
    ];

    for (const id of CANDIDATE_PLAYLISTS) {
      console.log("Trying playlist id:", id);
      const tracks = await fetchPlaylistTracks(id);
      if (Array.isArray(tracks) && tracks.length > 0) {
        console.log("✅ Playlist fallback success:", id, "tracks:", tracks.length);
        return tracks.map(trackToClient);
      }
    }

    // 2) Try featured playlists (may 404 in dev mode)
    try {
      console.log("Trying featured playlists (country=IN) ...");
      const featuredRes = await fetch(
        `https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=20`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      if (featuredRes.ok) {
        const featuredData = await featuredRes.json();
        const playlists = featuredData.playlists?.items || [];
        const tamilPlaylist = playlists.find(
          p =>
            (p.name && p.name.toLowerCase().includes("tamil")) ||
            (p.description && p.description.toLowerCase().includes("tamil"))
        );
        if (tamilPlaylist) {
          console.log("Found Tamil in featured:", tamilPlaylist.name);
          const tracks = await fetchPlaylistTracks(tamilPlaylist.id);
          if (Array.isArray(tracks) && tracks.length > 0) {
            console.log("✅ Featured playlist success:", tamilPlaylist.id);
            return tracks.map(trackToClient);
          }
        } else {
          console.log("No Tamil playlist found in featured list.");
        }
      } else {
        const txt = await featuredRes.text();
        console.warn("Featured playlists fetch not ok:", featuredRes.status, txt);
      }
    } catch (errFeatured) {
      console.warn("Featured fetch error:", errFeatured);
    }

    // 3) FALLBACK: Search for Tamil tracks (guaranteed)
    console.log("FALLBACK -> Searching for 'Tamil' tracks ...");
    const searchResults = await searchTamilTracks();
    if (Array.isArray(searchResults) && searchResults.length > 0) {
      console.log("✅ Search fallback success, tracks:", searchResults.length);
      return searchResults.map(trackToClient);
    }

    // Nothing found
    console.warn("No tracks found via any method.");
    return [];
  } catch (err) {
    console.error("fetchNewReleases error", err);
    return [];
  }
}

// helper: unify track object for UI
function trackToClient(raw) {
  const track = raw?.track ? raw.track : raw;

  return {
    id: track.id || Math.random().toString(36),
    title: track.name || "Unknown Track",
    artist:
      (track.artists && track.artists.length > 0
        ? track.artists.map((a) => a.name).join(", ")
        : "Unknown Artist") || "Unknown Artist",
    album: track.album?.name || "Unknown Album",
    cover:
      track.album?.images?.[0]?.url ||
      track.images?.[0]?.url || // fallback for search tracks
      "/placeholder.jpg",
    preview: track.preview_url || null,
    external_url: track.external_urls?.spotify || null,
  };
}


/* --- other API helpers (searchTracks, fetchUserTopTracks) unchanged below --- */

export async function searchTracks(query) {
  if (!access_token) return [];
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&market=IN&limit=24`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    if (!res.ok) {
      const text = await res.text();
      console.warn("searchTracks failed:", res.status, text);
      return [];
    }
    const json = await res.json();
    return (json.tracks?.items || []).map(trackToClient);
  } catch (e) {
    console.error("searchTracks error", e);
    return [];
  }
}

export async function fetchUserTopTracks() {
  if (!access_token) return [];
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=24",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map(item => ({
      id: item.id,
      title: item.name,
      artist: (item.artists || []).map(a => a.name).join(", "),
      album: item.album?.name ?? "",
      cover: item.album?.images?.[0]?.url ?? "/placeholder.jpg",
    }));
  } catch (e) {
    console.error("fetchUserTopTracks error", e);
    return [];
  }
}
