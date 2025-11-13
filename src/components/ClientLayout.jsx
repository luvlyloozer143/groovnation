"use client";

import MainShell from "@/components/layout/MainShell";
import SessionWrapper from "@/components/SessionWrapper";

export default function ClientLayout({ children }) {
  return (
    <SessionWrapper>
      <MainShell>{children}</MainShell>
    </SessionWrapper>
  );
}
