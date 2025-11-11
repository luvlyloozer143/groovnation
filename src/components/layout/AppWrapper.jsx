"use client";

import { usePathname } from "next/navigation";
import MainShell from "./MainShell";

export default function AppWrapper({ children }) {
  const pathname = usePathname();

  // 🚪 Routes that shouldn't show sidebar / player
  const publicRoutes = ["/"];
  const isPublic = publicRoutes.includes(pathname);

  return (
    <>
      {isPublic ? (
        // Landing page (no layout)
        <>{children}</>
      ) : (
        // Authenticated area (full layout)
        <MainShell>{children}</MainShell>
      )}
    </>
  );
}
