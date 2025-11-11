"use client"
import { motion } from "framer-motion"
import { User } from "lucide-react" // you can replace with your avatar later

// 🎧 FEATURE: User Profile Button (Topbar Right)
// Glass gradient background + hover glow + motion feedback

export default function UserProfileButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300
                 bg-gradient-to-br from-[#2e8eff] to-transparent bg-opacity-20
                 flex items-center justify-center overflow-hidden group"
    >
      {/* inner frosted layer */}
      <div className="absolute inset-[2px] rounded-[13px] bg-[#1a1a1a] flex items-center justify-center gap-3 text-white font-semibold z-10">
        <User className="w-6 h-6 text-white" />
        <span>Profile</span>
      </div>

      {/* glow hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5, scale: 1.2 }}
        className="absolute inset-0 rounded-[15px] bg-[#2e8eff] blur-md z-0"
      />
    </motion.button>
  )
}
