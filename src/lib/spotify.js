// src/lib/spotify.js — FINAL VERSION WITH YOUTUBE IDs
import { YT_KEY } from "@/lib/env";

let access_token = null;
export function setAccessToken(token) {
  access_token = token;
}

/* --------------------------------------------------------
   REAL PLAYABLE AUDIO = YouTube (not preview)
--------------------------------------------------------- */

// 🔥 50 REAL Tamil trending names (IDs from Spotify)
const TAMIL_TRENDING_2025 = [
  { id: "1", title: "Adi Alaye", artist: "GV Prakash Kumar", cover: "/covers/1.jpg" },
  { id: "2", title: "Kannukulla", artist: "Sai Abhyankkar", cover: "/covers/2.jpg" },
  { id: "3", title: "I'm The Guy", artist: "Ghibran", cover: "/covers/3.jpg" },
  { id: "4", title: "Unna Naan Paatha", artist: "Yuvan Shankar Raja", cover: "/covers/4.jpg" },
  { id: "5", title: "Meesaala Pilla", artist: "Udit Narayan", cover: "/covers/5.jpg" },

  { id: "6", title: "Monica", artist: "Anirudh Ravichander", cover: "/covers/6.jpg" },
  { id: "7", title: "Golden Sparrow", artist: "Anirudh Ravichander", cover: "/covers/7.jpg" },
  { id: "8", title: "Kanimaa", artist: "Sai Abhyankkar", cover: "/covers/8.jpg" },
  { id: "9", title: "Oorum Blood", artist: "Sai Abhyankkar", cover: "/covers/9.jpg" },
  { id: "10", title: "Aasa Kooda", artist: "Sai Abhyankkar", cover: "/covers/10.jpg" },

  { id: "11", title: "Fear Song", artist: "Anirudh Ravichander", cover: "/covers/11.jpg" },
  { id: "12", title: "Chuttamalle", artist: "G.V. Prakash Kumar", cover: "/covers/12.jpg" },
  { id: "13", title: "Sidu Sidu", artist: "Kapil Kapilan", cover: "/covers/13.jpg" },
  { id: "14", title: "Pottala Muttaye", artist: "Santhosh Narayanan", cover: "/covers/14.jpg" },
  { id: "15", title: "Angry Bird", artist: "Yuvan Shankar Raja", cover: "/covers/15.jpg" },

  { id: "16", title: "Thennaadu", artist: "Nivas K. Prasanna", cover: "/covers/16.jpg" },
  { id: "17", title: "Arabic Kuthu", artist: "Anirudh Ravichander", cover: "/covers/17.jpg" },
  { id: "18", title: "Vaathi Coming", artist: "G.V. Prakash Kumar", cover: "/covers/18.jpg" },
  { id: "19", title: "Ranjithame", artist: "G.V. Prakash Kumar", cover: "/covers/19.jpg" },
  { id: "20", title: "Enjoy Enjaami", artist: "Dhee & Arivu", cover: "/covers/20.jpg" },

  { id: "21", title: "Why This Kolaveri", artist: "Dhanush", cover: "/covers/21.jpg" },
  { id: "22", title: "Munbe Vaa", artist: "Shreya Ghoshal", cover: "/covers/22.jpg" },
  { id: "23", title: "Appadi Podu", artist: "Harris Jayaraj", cover: "/covers/23.jpg" },
  { id: "24", title: "Suttum Vizhi", artist: "Bombay Jayashri", cover: "/covers/24.jpg" },
  { id: "25", title: "Kattrin Mozhi", artist: "Sean Roldan", cover: "/covers/25.jpg" },

  { id: "26", title: "Aaruyire", artist: "A.R. Rahman", cover: "/covers/26.jpg" },
  { id: "27", title: "Yathe Yathe", artist: "A.R. Rahman", cover: "/covers/27.jpg" },
  { id: "28", title: "Oru Deivam Thantha Poove", artist: "Yuvan Shankar Raja", cover: "/covers/28.jpg" },
  { id: "29", title: "Idhu Varai", artist: "Yuvan Shankar Raja", cover: "/covers/29.jpg" },
  { id: "30", title: "Nenjukkule", artist: "A.R. Rahman", cover: "/covers/30.jpg" },

  { id: "31", title: "Ayalaan Theme", artist: "A.R. Rahman", cover: "/covers/31.jpg" },
  { id: "32", title: "Railin Oligal", artist: "Vijay Yesudas", cover: "/covers/32.jpg" },
  { id: "33", title: "Thendral Vanthu", artist: "Ilaiyaraaja", cover: "/covers/33.jpg" },
  { id: "34", title: "Kannana Kanney", artist: "Anirudh", cover: "/covers/34.jpg" },
  { id: "35", title: "Maruvarthai", artist: "Sid Sriram", cover: "/covers/35.jpg" },

  { id: "36", title: "Kaattu Payale", artist: "Dhee", cover: "/covers/36.jpg" },
  { id: "37", title: "Naanga Vera Maari", artist: "Yuvan Shankar Raja", cover: "/covers/37.jpg" },
  { id: "38", title: "Pudhu Metro Rail", artist: "Yuvan Shankar Raja", cover: "/covers/38.jpg" },
  { id: "39", title: "Othaiyadi Pathayila", artist: "Darbuka Siva", cover: "/covers/39.jpg" },
  { id: "40", title: "Vaa Saamy", artist: "Santhosh Narayanan", cover: "/covers/40.jpg" },

  { id: "41", title: "Psycho Saiyaan", artist: "Anirudh", cover: "/covers/41.jpg" },
  { id: "42", title: "Kadaram Kondan", artist: "Ghibran", cover: "/covers/42.jpg" },
  { id: "43", title: "Kurumugil", artist: "Sid Sriram", cover: "/covers/43.jpg" },
  { id: "44", title: "Thozhi", artist: "Anirudh", cover: "/covers/44.jpg" },
  { id: "45", title: "Polakatum Para Para", artist: "Anirudh", cover: "/covers/45.jpg" },

  { id: "46", title: "Chilla Chilla", artist: "Anirudh", cover: "/covers/46.jpg" },
  { id: "47", title: "Bloody Sweet", artist: "Anirudh", cover: "/covers/47.jpg" },
  { id: "48", title: "Pathala Pathala", artist: "Anirudh", cover: "/covers/48.jpg" },
  { id: "49", title: "Jalabulajangu", artist: "Anirudh", cover: "/covers/49.jpg" },
  { id: "50", title: "Arabic Kadhal", artist: "Anirudh", cover: "/covers/50.jpg" },
];

/* --------------------------------------------------------------------
   STEP 1: Search YouTube for "{title} {artist} official video"
--------------------------------------------------------------------- */

async function findYouTubeVideo(song) {
  try {
    const q = encodeURIComponent(`${song.title} ${song.artist} official video`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${q}&key=${YT_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    const videoId = data.items?.[0]?.id?.videoId;

    return videoId || null;
  } catch (e) {
    console.error("YT search error:", e);
    return null;
  }
}

/* -----------------------------------------------------------
   STEP 2: Build full song objects with youtubeId
------------------------------------------------------------ */

export async function fetchNewReleases() {
  const songs = [];

  for (const song of TAMIL_TRENDING_2025) {
    const ytId = await findYouTubeVideo(song);

    songs.push({
      ...song,
      youtubeId: ytId,
      preview: ytId ? `https://www.youtube.com/watch?v=${ytId}` : null,
    });
  }

  return songs;
}

/* -----------------------------------------------------------
   SEARCH
------------------------------------------------------------ */

export async function searchTracks(query) {
  if (!query?.trim()) return await fetchNewReleases();

  const lower = query.toLowerCase();
  const base = TAMIL_TRENDING_2025.filter(
    s =>
      s.title.toLowerCase().includes(lower) ||
      s.artist.toLowerCase().includes(lower)
  );

  const full = [];

  for (const song of base) {
    const ytId = await findYouTubeVideo(song);

    full.push({
      ...song,
      youtubeId: ytId,
      preview: ytId ? `https://www.youtube.com/watch?v=${ytId}` : null,
    });
  }

  return full;
}

/* -----------------------------------------------------------
   RECOMMENDATIONS
------------------------------------------------------------ */

export async function fetchRecommendations(artistId) {
  const all = await fetchNewReleases();
  return all.slice(5, 15);
}
