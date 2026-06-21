"use client"

import { useEffect, useState } from "react"

export default function CircleCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)")

    const updateCursorSupport = () => {
      setIsEnabled(mediaQuery.matches)
    }

    updateCursorSupport()
    mediaQuery.addEventListener("change", updateCursorSupport)

    if (!mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener("change", updateCursorSupport)
      }
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseover", handleMouseOver)
      mediaQuery.removeEventListener("change", updateCursorSupport)
    }
  }, [])

  if (!isEnabled) {
    return null
  }

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      >
        <div
          className={`rounded-full border-2 border-white transition-all duration-200 ${
            isHovering ? "w-12 h-12" : "w-6 h-6"
          }`}
        />
      </div>

      <div
        className="fixed pointer-events-none z-50 h-1 w-1 rounded-full bg-white mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  )
}
