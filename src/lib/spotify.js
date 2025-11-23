// // src/lib/spotify.js
// const YT_KEY = process.env.NEXT_PUBLIC_YT_KEY;

// let access_token = null;
// export function setAccessToken(token) {
//   access_token = token;
// }

// /* ============================================================
//    GET YOUTUBE VIDEO ID (official video first priority)
// ============================================================ */
// async function findYouTubeVideo(title, artist) {
//   try {
//     const q = encodeURIComponent(`${title} ${artist} official video`);
//     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=1&q=${q}&key=${YT_KEY}`;

//     const res = await fetch(url);
//     const data = await res.json();
//     return data?.items?.[0]?.id?.videoId || null;
//   } catch (e) {
//     console.error("YT search error:", e);
//     return null;
//   }
// }

// /* ============================================================
//    FETCH TAMIL TRENDING SONGS (real metadata)
// ============================================================ */
// export async function fetchNewReleases() {
//   if (!access_token) return [];

//   try {
//     const q = encodeURIComponent("Tamil Hits OR Tamil Trending 2025 OR Tamil");
//     const res = await fetch(
//       `https://api.spotify.com/v1/search?q=${q}&type=track&market=IN&limit=24`,
//       { headers: { Authorization: `Bearer ${access_token}` } }
//     );
//     if (!res.ok) return [];

//     const data = await res.json();

//     const mapped = [];
//     for (const t of data.tracks.items) {
//       if (!t.album?.images?.[0]?.url) continue;

//       const videoId = await findYouTubeVideo(t.name, t.artists[0]?.name);

//       mapped.push({
//         id: t.id,
//         title: t.name,
//         artist: t.artists.map((a) => a.name).join(", "),
//         artistId: t.artists?.[0]?.id,
//         album: t.album.name,
//         cover: t.album.images[0].url,
//         preview: videoId ? `https://www.youtube.com/watch?v=${videoId}` : null,
//         youtubeId: videoId,
//       });
//     }

//     return mapped;
//   } catch (err) {
//     console.error("Tamil fetch error:", err);
//     return [];
//   }
// }

// /* ============================================================
//    GLOBAL SEARCH (Spotify + YouTube ID)
// ============================================================ */
// export async function searchTracks(query) {
//   if (!access_token) return [];
//   if (!query || query.trim() === "") return [];

//   try {
//     const res = await fetch(
//       `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=24&market=IN`,
//       { headers: { Authorization: `Bearer ${access_token}` } }
//     );

//     const data = await res.json();
//     const base = data.tracks.items.filter((t) => t.album?.images?.[0]?.url);

//     const mapped = [];
//     for (const t of base) {
//       const videoId = await findYouTubeVideo(t.name, t.artists[0]?.name);

//       mapped.push({
//         id: t.id,
//         title: t.name,
//         artist: t.artists.map((a) => a.name).join(", "),
//         artistId: t.artists?.[0]?.id,
//         cover: t.album.images[0].url,
//         preview: videoId ? `https://www.youtube.com/watch?v=${videoId}` : null,
//         youtubeId: videoId,
//       });
//     }

//     return mapped;
//   } catch (err) {
//     console.error("Search error:", err);
//     return [];
//   }
// }

// /* ============================================================
//    RECOMMENDATIONS (Auto changes on now playing)
// ============================================================ */
// export async function fetchRecommendations(artistId) {
//   if (!access_token || !artistId) return [];

//   try {
//     const rel = await fetch(
//       `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
//       { headers: { Authorization: `Bearer ${access_token}` } }
//     );

//     const data = await rel.json();
//     const artists = data.artists.slice(0, 5).map((a) => a.id);

//     let finalSongs = [];
//     for (const id of artists) {
//       const top = await fetch(
//         `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`,
//         { headers: { Authorization: `Bearer ${access_token}` } }
//       );

//       const topData = await top.json();

//       for (const t of topData.tracks) {
//         if (!t.album?.images?.[0]?.url) continue;

//         const videoId = await findYouTubeVideo(t.name, t.artists[0].name);

//         finalSongs.push({
//           id: t.id,
//           title: t.name,
//           artist: t.artists.map((a) => a.name).join(", "),
//           cover: t.album.images[0].url,
//           preview: videoId ? `https://www.youtube.com/watch?v=${videoId}` : null,
//           youtubeId: videoId,
//         });
//       }
//     }

//     return finalSongs.slice(0, 12);
//   } catch (err) {
//     console.error("Recommendation fetch error:", err);
//     return [];
//   }
// }

// src/lib/spotify.js
let access_token = null;
export function setAccessToken(token) {
  access_token = token;
}

// HARDCODED TAMIL HITS — NO API, NO QUOTA, INSTANT LOAD
const FALLBACK_SONGS = [
  {
    id: "1",
    title: "Oorum Blood - From \"Dude\"",
    artist: "Sai Abhyankkar, Paal Dabba, bebhumika, Deepthi Suresh",
    artistId: "fallback",
    album: "Dude",
    cover: "/covers/1.jpg",
    youtubeId: "rV4H0j2mP1Q",
  },
  {
    id: "2",
    title: "Sidu Sidu",
    artist: "Barath Dhanasekar",
    artistId: "fallback",
    album: "Single",
    cover: "/covers/2.jpg",
    youtubeId: "hVxC1EW1Y2Q",
  },
  {
    id: "3",
    title: "Monica (From \"Coolie\")",
    artist: "Anirudh Ravichander, Subhalashini, Asal Kolaar",
    artistId: "fallback",
    album: "Coolie",
    cover: "/covers/3.jpg",
    youtubeId: "hnhFCEzYdjU",
  },
  {
    id: "4",
    title: "Raja Raja Chozhan (From \"Rettai Vaal Kuruvi\")",
    artist: "Ilaiyaraaja",
    artistId: "fallback",
    album: "Rettai Vaal Kuruvi",
    cover: "/covers/4.jpg",
    youtubeId: "m1RouXjgK7c",
  },
  {
    id: "5",
    title: "Matta",
    artist: "Yuvan Shankar Raja",
    artistId: "fallback",
    album: "The Greatest Of All Time",
    cover: "/covers/5.jpg",
    youtubeId: "Ay-urNn3WZw",
  },
  // Add more later if you want
];

// Use fallback songs (fast + no quota)
export async function fetchNewReleases() {
  return FALLBACK_SONGS;
}

export async function searchTracks(query) {
  if (!query?.trim()) return FALLBACK_SONGS;

  const lower = query.toLowerCase();
  return FALLBACK_SONGS.filter(song =>
    song.title.toLowerCase().includes(lower) ||
    song.artist.toLowerCase().includes(lower)
  );
}

// Keep recommendations simple (just return same songs)
export async function fetchRecommendations() {
  return FALLBACK_SONGS.sort(() => Math.random() - 0.5);
}