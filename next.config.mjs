// next.config.mjs
import fs from "fs";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 optional, just keeps your Webpack config valid
  webpack(config) {
    return config;
  },

  // 👇 HTTPS dev server configuration
  devServer: {
    https: {
      key: fs.readFileSync(path.join(process.cwd(), "cert/key.pem")),
      cert: fs.readFileSync(path.join(process.cwd(), "cert/cert.pem")),
    },
    host: "localhost",
    port: 3000,
  },
};

export default nextConfig;
