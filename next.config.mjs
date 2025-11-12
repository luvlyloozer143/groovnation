import fs from "fs";

/** @type {import('next').NextConfig} */
const isLocal = process.env.NODE_ENV === "development";

const nextConfig = {
  images: {
    domains: ["i.scdn.co"], // ✅ Allow Spotify album art
  },

  ...(isLocal
    ? {
        // ✅ Use HTTPS only in local dev mode
        devServer: (() => {
          try {
            return {
              https: {
                key: fs.readFileSync("./cert/key.pem"),
                cert: fs.readFileSync("./cert/cert.pem"),
              },
            };
          } catch (err) {
            console.warn(
              "⚠️ SSL certs not found — running in HTTP mode instead."
            );
            return {};
          }
        })(),
      }
    : {
        // ✅ Production config (Vercel handles HTTPS)
        reactStrictMode: true,
      }),
};

export default nextConfig;
