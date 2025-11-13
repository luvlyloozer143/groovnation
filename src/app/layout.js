"use client";

import "../styles/globals.css";
import "../styles/themes.css";
import MainShell from "@/components/layout/MainShell";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "GroovNation",
  description: "A dreamy pastel music experience powered by Spotify 🎧",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="
          font-sans text-black dark:text-white
          transition-all duration-700
          bg-[var(--bg-main)]
          relative
        "
      >
        <div className="gradient-overlay"></div>

        <SessionWrapper>
          <MainShell>{children}</MainShell>
        </SessionWrapper>
      </body>
    </html>
  );
}
