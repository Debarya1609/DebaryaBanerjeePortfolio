"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTheme } from "next-themes"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!progressBarRef.current || !progressFillRef.current) return

    // Set up the scroll progress animation
    gsap.to(progressFillRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    })
  }, [])

  return (
    <div ref={progressBarRef} className="fixed top-0 right-4 bottom-0 w-1 bg-gray-200/50 dark:bg-gray-700/30 z-50">
      <div
        ref={progressFillRef}
        className={`w-full h-0 ${
          theme === "dark"
            ? "bg-gradient-to-b from-blue-400 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
            : "bg-gradient-to-b from-blue-500 to-purple-600"
        }`}
        style={{ transformOrigin: "top" }}
      />
    </div>
  )
}
