"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  // 🧠 Detect scroll depth
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // 🧭 Smooth scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0,
        y: visible ? 0 : 40,
      }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center 
                 bg-gradient-to-r from-[#95eaff] to-[#a47cff] text-white shadow-lg hover:scale-110 
                 active:scale-95 transition-all"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  )
}
