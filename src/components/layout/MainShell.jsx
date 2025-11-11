// src/components/layout/MainShell.jsx
"use client"

import { useUIStore, useThemeSync } from "@/lib/store"
import LeftSidebar from "./LeftSidebar"
import Topbar from "./Topbar"
import Playerbar from "./Playerbar"
import RightSidebar from "./RightSidebar"
import { motion } from "framer-motion"

export default function MainShell({ children }) {
  // Zustand hooks for sidebar + theme
  const { sidebarCollapsed } = useUIStore()
  useThemeSync()

  // Sidebar responsive width
  const sidebarWidth = sidebarCollapsed ? 80 : 220
  const rightSidebarWidth = 260 // fixed width for right panel

  return (
    <div className="relative min-h-screen flex bg-transparent text-gray-900 dark:text-white transition-all duration-700">

      {/* 🧊 Frosted background overlay */}
      <div className="gradient-overlay absolute inset-0 -z-10" />

      {/* 🧭 Left Sidebar */}
      <LeftSidebar />

      {/* 🧠 Main Content Wrapper */}
      <motion.div
        className="flex-1 flex flex-col transition-all duration-700 ease-in-out"
        style={{
          marginLeft: sidebarWidth,
          marginRight: rightSidebarWidth,
        }}
        animate={{
          marginLeft: sidebarWidth,
          marginRight: rightSidebarWidth,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* 🧩 Top Navigation */}
        <Topbar />

        {/* 🌈 Page Content */}
        <main className="pt-20 pb-28 px-6 min-h-screen motion-fade">
          {children}
        </main>

        {/* 🎵 Player Bar */}
        <Playerbar />
      </motion.div>

      {/* 🧩 Right Sidebar */}
      <RightSidebar />
    </div>
  )
}
