// src/components/layout/RightSidebar.jsx
"use client"

export default function RightSidebar() {
  return (
    <aside
      className="fixed top-16 right-0 h-[calc(100vh-5rem)] w-[260px]
      frost-glass backdrop-blur-xl motion-fade p-4 overflow-y-auto
      hidden lg:block shadow-lg border-0"
    >
      {/* 🧩 Placeholder for widgets */}
      <div className="text-center text-sm opacity-70 mt-4">
        <p>Right Sidebar</p>
        <p>Coming soon...</p>
      </div>
    </aside>
  )
}

