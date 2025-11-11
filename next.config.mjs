import fs from "fs";

const isLocal = process.env.NODE_ENV === "development";

const nextConfig = {
  ...(isLocal
    ? {
        // ✅ Use HTTPS only during local development
        devServer: {
          https: {
            key: fs.readFileSync("./cert/key.pem"),
            cert: fs.readFileSync("./cert/cert.pem"),
          },
        },
      }
    : {
        // ✅ On Vercel (production), run normally (Vercel handles HTTPS)
      }),
};

export default nextConfig;
