// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyWebApi from "spotify-web-api-node";

async function refreshAccessToken(token) {
  try {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    spotifyApi.setRefreshToken(token.refreshToken);
    const data = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: data.body.access_token,
      accessTokenExpires: Date.now() + data.body.expires_in * 1000,
      refreshToken: data.body.refresh_token ?? token.refreshToken,
    };
  } catch (err) {
    console.error("Refresh token error:", err);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: [
            "user-read-email",
            "user-read-private",
            "user-read-playback-state",
            "user-modify-playback-state",
            "playlist-read-private",
            "user-library-read",
            "user-top-read",
          ].join(" "),
          show_dialog: "true",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, user }) {
      // first sign-in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // use existing token if still valid
      if (Date.now() < token.accessTokenExpires) return token;

      // otherwise refresh
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
