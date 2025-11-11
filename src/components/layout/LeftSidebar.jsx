// src/components/layout/LeftSidebar.jsx
"use client"
import { Home, Search, Library, Heart, ListMusic } from "lucide-react"
import { useUIStore } from "@/lib/store"

export default function LeftSidebar() {
  const { sidebarCollapsed } = useUIStore()

  const menuItems = [
    { icon: <Home />, label: "Home" },
    { icon: <Search />, label: "Discover" },
    { icon: <Library />, label: "Library" },
    { icon: <Heart />, label: "Liked" },
    { icon: <ListMusic />, label: "Playlists" },
  ]

  return (
    <aside
      className={`fixed left-0 top-0 h-screen flex flex-col frost-glass backdrop-blur-xl
        transition-all duration-500 ease-in-out
        ${sidebarCollapsed ? "w-[80px]" : "w-[220px]"}
      `}
    >
      <div className="flex flex-col justify-center items-center gap-6 mt-24">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="flex items-center justify-center gap-4 w-[80%] py-3 hover-contrast rounded-xl motion-fade"
          >
            <div className="w-6 h-6">{item.icon}</div>
            {!sidebarCollapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </div>
    </aside>
  )
}
