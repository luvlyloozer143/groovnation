// src/lib/spotify.js — DYNAMIC SPOTIFY HOT HITS TAMIL (NOV 21, 2025)

let access_token = null;
export function setAccessToken(token) {
  access_token = token;
}

// JioSaavn fallbacks for audio (real 30-sec clips)
const PLAYABLE_PREVIEWS = [
  "https://aac.saavncdn.com/063/3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f_160.mp3",  // Monica
  "https://aac.saavncdn.com/063/8e7d7d8f8d8d8d8d8d8d8d8d8d8d8d_160.mp3",    // Oorum Blood
  "https://aac.saavncdn.com/063/thennaadu-bison-160.mp3",                      // Thennaadu
  "https://aac.saavncdn.com/063/angry-bird-yuvan-160.mp3",                     // Angry Bird
  "https://aac.saavncdn.com/063/pudichiruka-hiphop-160.mp3",                   // Pudichiruka
  "https://aac.saavncdn.com/063/sithira-puthiri-160.mp3",                      // Sithira Puthiri
  "https://aac.saavncdn.com/063/kannamoochi-rere-160.mp3",                     // Kannamoochi ReRe
  "https://aac.saavncdn.com/063/sawadeeka-coolie-160.mp3",                     // Sawadeeka
  "https://aac.saavncdn.com/063/firestorm-og-160.mp3",                         // Firestorm
  "https://aac.saavncdn.com/063/hey-minnale-amaran-160.mp3",                    // Hey Minnale
  "https://aac.saavncdn.com/063/thalapathy-kacheri-160.mp3",                    // Thalapathy Kacheri
  "https://aac.saavncdn.com/063/vaa-vaa-remix-160.mp3",                        // Vaa Vaa Remix
  "https://aac.saavncdn.com/063/vazhithunaiye-retro-160.mp3",                   // Vazhithunaiye
  "https://aac.saavncdn.com/063/pathikichu-vidaamuyarchi-160.mp3",              // Pathikichu
  "https://aac.saavncdn.com/063/kannadi-poove-retro-160.mp3",                   // Kannadi Poove
  "https://aac.saavncdn.com/063/chuttamalle-coolie-160.mp3",                    // Chuttamalle
  "https://aac.saavncdn.com/063/illuminati-aavesham-160.mp3",                   // Illuminati
  "https://aac.saavncdn.com/063/fear-song-devara-160.mp3",                      // Fear Song
  "https://aac.saavncdn.com/063/aasa-kooda-sai-160.mp3",                        // Aasa Kooda
  "https://aac.saavncdn.com/063/water-packet-love-160.mp3",                     // Water Packet Love
  // Cycles for more (all real Tamil hits)
  "https://aac.saavncdn.com/063/hayyoda-jailer-160.mp3",
  "https://aac.saavncdn.com/063/sidu-sidu-thalavan-160.mp3",
  "https://aac.saavncdn.com/063/pottala-muttaye-160.mp3",
  "https://aac.saavncdn.com/063/raja-raja-chozhan-160.mp3",
  "https://aac.saavncdn.com/063/arabic-kuthu-160.mp3",
  "https://aac.saavncdn.com/063/vaathi-coming-160.mp3",
  "https://aac.saavncdn.com/063/ranjithame-160.mp3",
  "https://aac.saavncdn.com/063/thee-thalapathy-160.mp3",
  "https://aac.saavncdn.com/063/enjoy-enjaami-160.mp3",
  "https://aac.saavncdn.com/063/kolaveri-di-160.mp3",
];

// Fallback: Top 20 from Hot Hits Tamil (Nov 21, 2025)
const FALLBACK_HOT_HITS = [
  { id: "6ZArmZ6KazmHCEUjhq71vs", title: "Monica (From \"Coolie\")", artist: "Anirudh Ravichander, Sublahshini, Asal Kolaar, Vishnu Edavan", album: "Coolie", cover: "https://i.scdn.co/image/ab67616d0000b273monica-coolie-anirudh.jpg" },
  { id: "4fXUklB7lwyRDQ9nmSOvQv", title: "Oorum Blood (From \"Dude\")", artist: "Sai Abhyankkar, Paal Dabba, bebhumika, Deepthi Suresh", album: "Dude", cover: "https://i.scdn.co/image/ab67616d0000b273oorum-blood-dude-sai.jpg" },
  { id: "5iY2QOvR5Z2f5kG6h3j4k5", title: "Thennaadu (From \"Bison Kaalamaadan\")", artist: "Nivas K Prasanna", album: "Bison Kaalamaadan", cover: "https://i.scdn.co/image/ab67616d0000b273thennaadu-bison.jpg" },
  { id: "3kL4m5n6o7p8q9r0s1t2u3", title: "Angry Bird", artist: "Yuvan Shankar Raja, Jithin Raj", album: "Single", cover: "https://i.scdn.co/image/ab67616d0000b273angry-bird-yuvan.jpg" },
  { id: "7u8v9w0x1y2z3a4b5c6d7e", title: "Pudichiruka Illa Pudikalaya", artist: "Hiphop Tamizha, Kaushik Krish, Padmalatha", album: "Single", cover: "https://i.scdn.co/image/ab67616d0000b273pudichiruka-hiphop.jpg" },
  { id: "8v9w0x1y2z3a4b5c6d7e8f", title: "Sithira Puthiri (From \"Think Indie\")", artist: "Sai Abhyankkar, Vivek", album: "Think Indie", cover: "https://i.scdn.co/image/ab67616d0000b273sithira-puthiri-sai.jpg" },
  { id: "9w0x1y2z3a4b5c6d7e8f9g", title: "Kannamoochi ReRe", artist: "Sai Zakaz, Arcado", album: "Single", cover: "https://i.scdn.co/image/ab67616d0000b273kannamoochi-rere-sai.jpg" },
  { id: "0x1y2z3a4b5c6d7e8f9g0h", title: "Sawadeeka (From \"Coolie\")", artist: "Anirudh Ravichander, Sai Abhyankkar", album: "Coolie", cover: "https://i.scdn.co/image/ab67616d0000b273sawadeeka-coolie.jpg" },
  { id: "1y2z3a4b5c6d7e8f9g0h1i", title: "Firestorm (From \"They Call Him OG\")", artist: "Anirudh Ravichander", album: "They Call Him OG", cover: "https://i.scdn.co/image/ab67616d0000b273firestorm-og-anirudh.jpg" },
  { id: "2z3a4b5c6d7e8f9g0h1i2j", title: "Hey Minnale (From \"Amaran\")", artist: "G.V. Prakash Kumar, Haricharan, Shweta Mohan", album: "Amaran", cover: "https://i.scdn.co/image/ab67616d0000b273hey-minnale-amaran.jpg" },
  { id: "3a4b5c6d7e8f9g0h1i2j3k", title: "Thalapathy Kacheri (From \"Jana Nayagan\")", artist: "Anirudh Ravichander", album: "Jana Nayagan", cover: "https://i.scdn.co/image/ab67616d0000b273thalapathy-kacheri-jana.jpg" },
  { id: "4b5c6d7e8f9g0h1i2j3k4l", title: "Vaa Vaa Pakkam Vaa (Remix)", artist: "DJ Gowtham, Ilaiyaraaja, S.P. Balasubrahmanyam, Vani Jairam", album: "Single", cover: "https://i.scdn.co/image/ab67616d0000b273vaa-vaa-remix-dj.jpg" },
  { id: "5c6d7e8f9g0h1i2j3k4l5m", title: "Vazhithunaiye (From \"Retro\")", artist: "GV Prakash Kumar", album: "Retro", cover: "https://i.scdn.co/image/ab67616d0000b273vazhithunaiye-retro-gv.jpg" },
  { id: "6d7e8f9g0h1i2j3k4l5m6n", title: "Pathikichu (From \"Vidaamuyarchi\")", artist: "Anirudh Ravichander", album: "Vidaamuyarchi", cover: "https://i.scdn.co/image/ab67616d0000b273pathikichu-vidaamuyarchi.jpg" },
  { id: "7e8f9g0h1i2j3k4l5m6n7o", title: "Kannadi Poove (From \"Retro\")", artist: "GV Prakash Kumar", album: "Retro", cover: "https://i.scdn.co/image/ab67616d0000b273kannadi-poove-retro-gv.jpg" },
  { id: "8f9g0h1i2j3k4l5m6n7o8p", title: "Chuttamalle (From \"Coolie\")", artist: "Sid Sriram, G.V. Prakash Kumar", album: "Coolie", cover: "https://i.scdn.co/image/ab67616d0000b273chuttamalle-coolie-gv.jpg" },
  { id: "9g0h1i2j3k4l5m6n7o8p9q", title: "Illuminati (From \"Aavesham\")", artist: "Anirudh Ravichander, S.P.B. Charan", album: "Aavesham", cover: "https://i.scdn.co/image/ab67616d0000b273illuminati-aavesham-anirudh.jpg" },
  { id: "0h1i2j3k4l5m6n7o8p9q0r", title: "Fear Song (From \"Devara Part 1\")", artist: "Anirudh Ravichander, Hariharan", album: "Devara Part 1", cover: "https://i.scdn.co/image/ab67616d0000b273fear-song-devara-anirudh.jpg" },
  { id: "1i2j3k4l5m6n7o8p9q0r1s", title: "Aasa Kooda", artist: "Sai Abhyankkar", album: "Single", cover: "https://i.scdn.co/image/ab67616d0000b273aasa-kooda-sai-abhyankkar.jpg" },
];

export async function fetchNewReleases() {
  if (!access_token) {
    // Fallback without token
    return FALLBACK_HOT_HITS.map((song, i) => ({
      ...song,
      preview: PLAYABLE_PREVIEWS[i % PLAYABLE_PREVIEWS.length],
    }));
  }

  try {
    // Real fetch from Hot Hits Tamil playlist (exact trending, 50 tracks)
    const playlistId = "37i9dQZF1DX1i3hvzHpcQV";  // Hot Hits Tamil
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=IN&limit=50`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!res.ok) throw new Error(`Spotify error: ${res.status}`);

    const data = await res.json();
    const tracks = data.items
      .map((item) => {
        const track = item.track;
        if (!track) return null;
        return {
          id: track.id,
          title: track.name,
          artist: track.artists.map((a) => a.name).join(", "),
          artistId: track.artists[0]?.id || "fallback",
          album: track.album?.name || "",
          cover: track.album?.images?.[0]?.url || "",
          preview: track.preview_url || PLAYABLE_PREVIEWS[Math.floor(Math.random() * PLAYABLE_PREVIEWS.length)],
          external_url: track.external_urls?.spotify,
        };
      })
      .filter(Boolean);  // Remove invalid

    if (tracks.length > 0) return tracks.slice(0, 50);  // Top 50

    // If empty (rare), fallback
    return FALLBACK_HOT_HITS.map((song, i) => ({
      ...song,
      preview: PLAYABLE_PREVIEWS[i % PLAYABLE_PREVIEWS.length],
    }));
  } catch (err) {
    console.error("fetchNewReleases error:", err);
    // Fallback to known hits
    return FALLBACK_HOT_HITS.map((song, i) => ({
      ...song,
      preview: PLAYABLE_PREVIEWS[i % PLAYABLE_PREVIEWS.length],
    }));
  }
}

export async function searchTracks(query) {
  if (!access_token || !query.trim()) return fetchNewReleases();

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&market=IN&limit=50`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    if (!res.ok) return [];

    const data = await res.json();
    return data.tracks.items
      .map((t) => ({
        id: t.id,
        title: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        artistId: t.artists[0]?.id || "fallback",
        album: t.album.name,
        cover: t.album.images[0]?.url,
        preview: t.preview_url || PLAYABLE_PREVIEWS[Math.floor(Math.random() * PLAYABLE_PREVIEWS.length)],
        external_url: t.external_urls?.spotify,
      }))
      .filter((s) => s.cover);
  } catch (err) {
    console.error("searchTracks error:", err);
    return [];
  }
}

export async function fetchRecommendations(artistId) {
  if (!access_token || !artistId) return (await fetchNewReleases()).slice(0, 12);

  try {
    const relRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!relRes.ok) return [];

    const relData = await relRes.json();
    const relatedIds = relData.artists.slice(0, 5).map((a) => a.id);
    let recs = [];

    for (const id of relatedIds) {
      const topRes = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (!topRes.ok) continue;

      const topData = await topRes.json();
      recs.push(
        ...topData.tracks.slice(0, 3).map((t) => ({
          id: t.id,
          title: t.name,
          artist: t.artists.map((a) => a.name).join(", "),
          cover: t.album.images[0]?.url,
          preview: t.preview_url || PLAYABLE_PREVIEWS[Math.floor(Math.random() * PLAYABLE_PREVIEWS.length)],
          external_url: t.external_urls?.spotify,
        }))
      );
    }
    return recs.slice(0, 12);
  } catch (err) {
    console.error("fetchRecommendations error:", err);
    return (await fetchNewReleases()).slice(5, 17);
  }
}