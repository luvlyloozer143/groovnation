// src/components/ui/MotionLayout.jsx
"use client"
import { motion } from "framer-motion"

export default function MotionLayout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="p-6 pt-24 pb-24 ml-[220px]"
    >
      {children}
    </motion.div>
  )
}
