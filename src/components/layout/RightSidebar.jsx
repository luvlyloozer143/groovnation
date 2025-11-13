// src/components/layout/RightSidebar.jsx
"use client";

import { motion } from "framer-motion";
import { useUIStore } from "@/lib/store";

export default function RightSidebar() {
  const queueOpen = useUIStore((s) => s.queueOpen);

  return (
    <motion.aside
      initial={{ x: 350 }}
      animate={{ x: queueOpen ? 0 : 350 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="
        fixed top-16 right-0 h-[calc(100vh-4rem)]
        w-[320px] frost-glass backdrop-blur-xl
        shadow-xl border-l border-white/10 z-40 p-5
      "
    >
      <h2 className="text-xl font-bold mb-4">🎶 Up Next</h2>

      <div className="space-y-4 text-sm opacity-80">
        <p>Queue feature coming soon… 🔥</p>
      </div>
    </motion.aside>
  );
}
