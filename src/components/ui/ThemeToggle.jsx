"use client"
import { useUIStore } from "@/lib/store"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useUIStore()

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md hover:scale-105 transition-all"
    >
      {darkMode ? (
        <Moon className="text-white w-6 h-6" />
      ) : (
        <Sun className="text-yellow-400 w-6 h-6" />
      )}
    </motion.button>
  )
}