import { YT_KEY } from "./env";

export async function fetchYouTubeVideo(query) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        query + " official"
      )}&key=${YT_KEY}&maxResults=1`
    );

    const data = await res.json();
    if (!data.items || data.items.length === 0) return null;

    return data.items[0].id.videoId;
  } catch (err) {
    console.error("YouTube search failed:", err);
    return null;
  }
}
