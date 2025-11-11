"use client"
import { motion } from "framer-motion"

// ⚡ Wrapper for per-page entry animation
export default function PageRevealMotion({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
