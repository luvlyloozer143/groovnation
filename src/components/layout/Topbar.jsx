// src/components/layout/Topbar.jsx
"use client";

import { Search, UserCircle2 } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import HamburgerToggle from "@/components/ui/HamburgerToggle";
import { useState } from "react";
import { useUIStore } from "@/lib/store";

export default function Topbar() {
  const [query, setQuery] = useState("");
  const onSearch = useUIStore((state) => state.onSearch);

  // 🧠 Handle typing
  async function handleInput(e) {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between
      px-6 z-50 frost-glass backdrop-blur-2xl motion-fade"
    >
      {/* 🍔 Hamburger + Logo */}
      <div className="flex items-center gap-4">
        <HamburgerToggle />
        <h1 className="text-xl font-semibold text-accent tracking-wide">
          GroovNation
        </h1>
      </div>

      {/* 🔍 Search / Avatar / Theme */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInput}
            placeholder="Search songs, artists..."
            className="px-4 py-2 w-72 rounded-xl frost-glass bg-opacity-40 focus:outline-none
              placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-300"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <ThemeToggle />
        <div className="w-10 h-10 flex items-center justify-center rounded-full hover-glow cursor-pointer">
          <UserCircle2 className="w-7 h-7" />
        </div>
      </div>
    </header>
  );
}
