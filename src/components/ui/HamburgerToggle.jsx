// src/components/ui/HamburgerToggle.jsx
"use client"
import { useUIStore } from "@/lib/store"
import { motion } from "framer-motion"

export default function HamburgerToggle() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <motion.div
      onClick={toggleSidebar}
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer w-10 h-10 flex flex-col justify-center items-center gap-1.5"
    >
      <span
        className={`h-0.5 w-7 rounded-full transition-all ${
          sidebarCollapsed ? "rotate-45 translate-y-2 bg-[#95eaff]" : "bg-black dark:bg-white"
        }`}
      />
      <span
        className={`h-0.5 w-7 rounded-full transition-all ${
          sidebarCollapsed ? "-rotate-45 -translate-y-1 bg-[#95eaff]" : "bg-black dark:bg-white"
        }`}
      />
    </motion.div>
    
  )
}
