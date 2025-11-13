// src/app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";
import SessionWrapper from "@/components/SessionWrapper";
import AppWrapper from "@/components/layout/AppWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "GroovNation",
  description: "Modern Music Player App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} bg-white dark:bg-black`}>
        <SessionWrapper>
          <AppWrapper>{children}</AppWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
