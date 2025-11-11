// src/app/layout.js
import "../styles/globals.css";
import "../styles/themes.css";
import AppWrapper from "@/components/layout/AppWrapper";
import SessionWrapper from "@/components/sessionwrapper"; // 👈 use your existing one

export const metadata = { title: "GroovNation" };

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
        {/* 🎨 Background gradient overlay */}
        <div className="gradient-overlay"></div>

        {/* ✅ Wrap everything inside SessionWrapper (client context) */}
        <SessionWrapper>
          <AppWrapper>{children}</AppWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
