import { YT_KEY } from "./env";

export async function findYouTubeVideo(query) {
  if (!YT_KEY) return null;

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&key=${YT_KEY}&type=video&maxResults=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.items || data.items.length === 0) return null;

    return data.items[0].id.videoId;
  } catch (err) {
    console.error("YT search error:", err);
    return null;
  }
}
