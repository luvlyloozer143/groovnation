"use client"
import { motion } from "framer-motion"

export default function Button({ children, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-medium transition-colors duration-200
        bg-[#95eaff] text-black hover:bg-[#aef2ff] active:bg-[#6dd6f7]
        ${className}`}
    >
      {children}
    </motion.button>
  )
}
