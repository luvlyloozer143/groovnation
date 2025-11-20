"use client";

import { useEffect } from "react";
import MainShell from "@/components/layout/MainShell";
import SessionWrapper from "@/components/SessionWrapper";
import { useUIStore } from "@/lib/store";

export default function ClientLayout({ children }) {
  // ⬆ Load theme from localStorage on first render
  useEffect(() => {
    // instantly load saved theme (light/dark)
    useUIStore.getState().loadTheme();
  }, []);

  return (
    <SessionWrapper>
      <MainShell>{children}</MainShell>
    </SessionWrapper>
  );
}
