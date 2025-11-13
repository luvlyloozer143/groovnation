"use client";  // ← FIXED (this is the solution)

import "../styles/globals.css";
import "../styles/themes.css";
import MainShell from "@/components/layout/MainShell";
import SessionWrapper from "@/components/SessionWrapper";

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
        {/* Background Gradient */}
        <div className="gradient-overlay"></div>

        {/* Session + UI Wrapper */}
        <SessionWrapper>
          <MainShell>{children}</MainShell>
        </SessionWrapper>
      </body>
    </html>
  );
}
