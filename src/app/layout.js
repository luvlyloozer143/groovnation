// src/app/layout.js
import "../styles/globals.css";
import "../styles/themes.css";
import MainShell from "@/components/layout/MainShell";
import SessionWrapper from "@/components/SessionWrapper"; // ✅ fixed import

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
        {/* 🎨 Gradient overlay background */}
        <div className="gradient-overlay"></div>

        {/* ✅ Entire app wrapped with SessionProvider */}
        <SessionWrapper>
          <MainShell>{children}</MainShell>
        </SessionWrapper>
      </body>
    </html>
  );
}
