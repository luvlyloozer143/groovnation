// src/components/ui/SearchBar.jsx
/*"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { searchSongs } from "@/lib/deezer"

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSearch(e) {
    const q = e.target.value
    setQuery(q)
    if (!q.trim()) {
      onResults([]) // reset results
      return
    }

    setLoading(true)
    const results = await searchSongs(q)
    onResults(results)
    setLoading(false)
  }

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={loading ? "Searching..." : "Search songs, artists..."}
        className="px-4 py-2 w-full rounded-xl frost-glass bg-opacity-40 focus:outline-none
          placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
      <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
    </div>
  )
}*/
