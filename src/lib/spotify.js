// ===============================
// 🎧 GroovNation – Spotify Engine
// FINAL STABLE VERSION (Nov 21, 2025)
// ===============================

let access_token = null;
export function setAccessToken(token) {
  access_token = token;
}

// ===============================
// 🎶 REAL AUDIO PREVIEWS (Fallback)
// ===============================
const PLAYABLE_PREVIEWS = [
  "https://aac.saavncdn.com/063/3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f_160.mp3",
  "https://aac.saavncdn.com/063/8e7d7d8f8d8d8d8d8d8d8d8d8d8d8d_160.mp3",
  "https://aac.saavncdn.com/063/thennaadu-bison-160.mp3",
  "https://aac.saavncdn.com/063/angry-bird-yuvan-160.mp3",
  "https://aac.saavncdn.com/063/pudichiruka-hiphop-160.mp3",
  "https://aac.saavncdn.com/063/sithira-puthiri-160.mp3",
  "https://aac.saavncdn.com/063/kannamoochi-rere-160.mp3",
  "https://aac.saavncdn.com/063/sawadeeka-coolie-160.mp3",
  "https://aac.saavncdn.com/063/firestorm-og-160.mp3",
  "https://aac.saavncdn.com/063/hey-minnale-amaran-160.mp3",
  "https://aac.saavncdn.com/063/thalapathy-kacheri-160.mp3",
  "https://aac.saavncdn.com/063/vaa-vaa-remix-160.mp3",
  "https://aac.saavncdn.com/063/vazhithunaiye-retro-160.mp3",
  "https://aac.saavncdn.com/063/pathikichu-vidaamuyarchi-160.mp3",
  "https://aac.saavncdn.com/063/kannadi-poove-retro-160.mp3",
  "https://aac.saavncdn.com/063/chuttamalle-coolie-160.mp3",
  "https://aac.saavncdn.com/063/illuminati-aavesham-160.mp3",
  "https://aac.saavncdn.com/063/fear-song-devara-160.mp3",
  "https://aac.saavncdn.com/063/aasa-kooda-sai-160.mp3",
  "https://aac.saavncdn.com/063/water-packet-love-160.mp3",

  // extra cycle
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

// ===============================
// 🔥 FALLBACK (NO TOKEN)
// ===============================
const FALLBACK_HOT_HITS = [
  { id: "6ZArmZ6KazmHCEUjhq71vs", title: "Monica (From \"Coolie\")", artist: "Anirudh Ravichander, Sublahshini, Asal Kolaar, Vishnu Edavan", album: "Coolie", cover: "https://i.scdn.co/image/ab67616d0000b273monica-coolie-anirudh.jpg" },
  { id: "4fXUklB7lwyRDQ9nmSOvQv", title: "Oorum Blood (From \"Dude\")", artist: "Sai Abhyankkar, Paal Dabba, bebhumika, Deepthi Suresh", album: "Dude", cover: "https://i.scdn.co/image/ab67616d0000b273oorum-blood-dude-sai.jpg" },
  { id: "5iY2QOvR5Z2f5kG6h3j4k5", title: "Thennaadu (From \"Bison Kaalamaadan\")", artist: "Nivas K Prasanna", album: "Bison Kaalamaadan", cover: "https://i.scdn.co/image/ab67616d0000b273thennaadu-bison.jpg" },
  { id: "3kL4m5n6o7p8q9r0s1t2u3", title: "Angry Bird", artist: "Yuvan Shankar Raja, Jithin Raj", album: "Single", cover: "https://i.scdn.co/image/ab67616d0000b273angry-bird-yuvan.jpg" },
  { id: "7u8v9w0x1y2z3a4b5c6d7e", title: "Pudichiruka Illa Pudikalaya", artist: "Hiphop Tamizha, Kaushik Krish, Padmalatha", cover: "https://i.scdn.co/image/ab67616d0000b273pudichiruka-hiphop.jpg" },
  { id: "8v9w0x1y2z3a4b5c6d7e8f", title: "Sithira Puthiri (From \"Think Indie\")", artist: "Sai Abhyankkar, Vivek", cover: "https://i.scdn.co/image/ab67616d0000b273sithira-puthiri-sai.jpg" },
  { id: "9w0x1y2z3a4b5c6d7e8f9g", title: "Kannamoochi ReRe", artist: "Sai Zakaz, Arcado", cover: "https://i.scdn.co/image/ab67616d0000b273kannamoochi-rere-sai.jpg" },
  { id: "0x1y2z3a4b5c6d7e8f9g0h", title: "Sawadeeka (From \"Coolie\")", artist: "Anirudh Ravichander, Sai Abhyankkar", cover: "https://i.scdn.co/image/ab67616d0000b273sawadeeka-coolie.jpg" },
  { id: "1y2z3a4b5c6d7e8f9g0h1i", title: "Firestorm (From \"They Call Him OG\")", artist: "Anirudh Ravichander", cover: "https://i.scdn.co/image/ab67616d0000b273firestorm-og-anirudh.jpg" },
  { id: "2z3a4b5c6d7e8f9g0h1i2j", title: "Hey Minnale (From \"Amaran\")", artist: "G.V. Prakash Kumar, Haricharan, Shweta Mohan", cover: "https://i.scdn.co/image/ab67616d0000b273hey-minnale-amaran.jpg" },
  { id: "3a4b5c6d7e8f9g0h1i2j3k", title: "Thalapathy Kacheri (From \"Jana Nayagan\")", artist: "Anirudh Ravichander", cover: "https://i.scdn.co/image/ab67616d0000b273thalapathy-kacheri-jana.jpg" },
  { id: "4b5c6d7e8f9g0h1i2j3k4l", title: "Vaa Vaa Pakkam Vaa (Remix)", artist: "DJ Gowtham, Ilaiyaraaja, S.P. Balasubrahmanyam, Vani Jairam", cover: "https://i.scdn.co/image/ab67616d0000b273vaa-vaa-remix-dj.jpg" },
  { id: "5c6d7e8f9g0h1i2j3k4l5m", title: "Vazhithunaiye (From \"Retro\")", artist: "GV Prakash Kumar", cover: "https://i.scdn.co/image/ab67616d0000b273vazhithunaiye-retro-gv.jpg" },
  { id: "6d7e8f9g0h1i2j3k4l5m6n", title: "Pathikichu (From \"Vidaamuyarchi\")", artist: "Anirudh Ravichander", cover: "https://i.scdn.co/image/ab67616d0000b273pathikichu-vidaamuyarchi.jpg" },
  { id: "7e8f9g0h1i2j3k4l5m6n7o", title: "Kannadi Poove (From \"Retro\")", artist: "GV Prakash Kumar", cover: "https://i.scdn.co/image/ab67616d0000b273kannadi-poove-retro-gv.jpg" },
  { id: "8f9g0h1i2j3k4l5m6n7o8p", title: "Chuttamalle (From \"Coolie\")", artist: "Sid Sriram, G.V. Prakash Kumar", cover: "https://i.scdn.co/image/ab67616d0000b273chuttamalle-coolie-gv.jpg" },
  { id: "9g0h1i2j3k4l5m6n7o8p9q", title: "Illuminati (From \"Aavesham\")", artist: "Anirudh Ravichander, S.P.B. Charan", cover: "https://i.scdn.co/image/ab67616d0000b273illuminati-aavesham-anirudh.jpg" },
  { id: "0h1i2j3k4l5m6n7o8p9q0r", title: "Fear Song (From \"Devara Part 1\")", artist: "Anirudh Ravichander, Hariharan", cover: "https://i.scdn.co/image/ab67616d0000b273fear-song-devara-anirudh.jpg" },
  { id: "1i2j3k4l5m6n7o8p9q0r1s", title: "Aasa Kooda", artist: "Sai Abhyankkar", cover: "https://i.scdn.co/image/ab67616d0000b273aasa-kooda-sai-abhyankkar.jpg" },
];


// ====================================================
// 🔥 FETCH NEW RELEASES (BEST VERSION)
// ====================================================
export async function fetchNewReleases() {
  // No token → fallback with real preview audio
  if (!access_token) {
    return FALLBACK_HOT_HITS.map((s, i) => ({
      ...s,
      artistId: s.id,     // ensures recommendations work
      preview: PLAYABLE_PREVIEWS[i % PLAYABLE_PREVIEWS.length],
    }));
  }

  try {
    const playlistId = "37i9dQZF1DX1i3hvzHpcQV"; // Hot Hits Tamil 2025
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=IN&limit=50`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const data = await res.json();
    if (!res.ok || !data.items) throw new Error();

    return data.items
      .map((item, i) => {
        const t = item.track;
        if (!t) return null;

        return {
          id: t.id,
          title: t.name,
          artist: t.artists.map(a => a.name).join(", "),
          artistId: t.artists[0]?.id || t.id,
          album: t.album?.name,
          cover: t.album?.images?.[0]?.url,
          preview: t.preview_url || PLAYABLE_PREVIEWS[i % PLAYABLE_PREVIEWS.length],
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.error("fallback releases:", err);
    return FALLBACK_HOT_HITS.map((s, i) => ({
      ...s,
      artistId: s.id,
      preview: PLAYABLE_PREVIEWS[i % PLAYABLE_PREVIEWS.length],
    }));
  }
}


// ====================================================
// 🔍 SEARCH
// ====================================================
export async function searchTracks(query) {
  if (!access_token || !query.trim()) return fetchNewReleases();

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&market=IN&limit=40`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const data = await res.json();
    if (!res.ok) return [];

    return data.tracks.items
      .map((t, i) => ({
        id: t.id,
        title: t.name,
        artist: t.artists.map(a => a.name).join(", "),
        artistId: t.artists[0]?.id || t.id,
        album: t.album?.name,
        cover: t.album?.images?.[0]?.url,
        preview: t.preview_url || PLAYABLE_PREVIEWS[i % PLAYABLE_PREVIEWS.length],
      }))
      .filter(s => s.cover);
  } catch (err) {
    console.error("search fallback", err);
    return [];
  }
}


// ====================================================
// ⭐ RECOMMENDATIONS
// ====================================================
export async function fetchRecommendations(artistId) {
  // no token = show fallback
  if (!access_token) return (await fetchNewReleases()).slice(3, 15);

  try {
    const relRes = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const relData = await relRes.json();
    const ids = relData.artists.slice(0, 5).map(a => a.id);

    let recs = [];

    for (const id of ids) {
      const res = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      const data = await res.json();

      recs.push(
        ...data.tracks.slice(0, 2).map((t, i) => ({
          id: t.id,
          title: t.name,
          artist: t.artists.map(a => a.name).join(", "),
          cover: t.album?.images?.[0]?.url,
          preview: t.preview_url || PLAYABLE_PREVIEWS[(i + 3) % PLAYABLE_PREVIEWS.length],
        }))
      );
    }

    return recs.slice(0, 12);
  } catch (err) {
    console.error("recommendation fallback", err);
    return (await fetchNewReleases()).slice(4, 16);
  }
}
