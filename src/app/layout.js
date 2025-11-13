import "@/styles/globals.css";
import { Inter } from "next/font/google";
import SessionWrapper from "@/components/SessionWrapper";
import LeftSidebar from "@/components/layout/LeftSidebar";
import Topbar from "@/components/layout/Topbar";
import RightSidebar from "@/components/layout/RightSidebar";
import Playerbar from "@/components/layout/Playerbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GroovNation",
  description: "Modern Music App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Topbar />
          <LeftSidebar />
          <RightSidebar />
          <main className="pt-20 pb-20 px-6">{children}</main>
          <Playerbar />
        </SessionWrapper>
      </body>
    </html>
  );
}
