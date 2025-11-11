// src/lib/sound.js
"use client"

// 🎵 Utility for lightweight UI feedback sounds
const soundMap = {
  click: "/sounds/click.mp3",
  hover: "/sounds/hover.mp3",
  toggle: "/sounds/toggle.mp3",
}

export const playSound = (type = "click", volume = 0.5) => {
  const soundFile = soundMap[type]
  if (!soundFile) return
  const audio = new Audio(soundFile)
  audio.volume = volume
  audio.play().catch(() => {})
}
