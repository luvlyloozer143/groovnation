import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// 🔑 Helper to set the access token before each call
export function setAccessToken(token) {
  spotifyApi.setAccessToken(token);
}

// 🎵 Fetch new releases
export async function fetchNewReleases() {
  try {
    const data = await spotifyApi.getNewReleases({ limit: 20 });
    return data.body.albums.items.map((album) => ({
      id: album.id,
      title: album.name,
      artist: album.artists[0]?.name || "Unknown Artist",
      image: album.images[0]?.url,
      previewUrl: null, // Spotify API doesn’t return preview for albums
    }));
  } catch (err) {
    console.error("Error fetching new releases:", err);
    return [];
  }
}

// 🔥 Fetch user’s top tracks
export async function fetchUserTopTracks() {
  try {
    const data = await spotifyApi.getMyTopTracks({ limit: 20 });
    return data.body.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0]?.name || "Unknown Artist",
      image: track.album.images[0]?.url,
      previewUrl: track.preview_url,
    }));
  } catch (err) {
    console.error("Error fetching user top tracks:", err);
    return [];
  }
}

// 🔍 Search tracks by keyword
export async function searchTracks(query) {
  if (!query || query.trim() === "") return [];
  try {
    const data = await spotifyApi.searchTracks(query, { limit: 20 });
    return data.body.tracks.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0]?.name || "Unknown Artist",
      image: track.album.images[0]?.url,
      previewUrl: track.preview_url,
    }));
  } catch (err) {
    console.error("Error searching tracks:", err);
    return [];
  }
}
