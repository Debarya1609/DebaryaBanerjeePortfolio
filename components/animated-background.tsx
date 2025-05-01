"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-gradient-to-br from-black to-purple-950" : "bg-gradient-to-br from-white to-blue-50"
        }`}
      />

      {/* Animated circles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              isDark ? "bg-purple-600/5 border border-purple-500/10" : "bg-blue-500/5 border border-blue-500/10"
            }`}
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i % 6} ${Math.random() * 20 + 20}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Animated gradient overlay */}
      <div
        className={`absolute inset-0 opacity-30 ${
          isDark
            ? "bg-gradient-radial from-purple-900/20 to-transparent"
            : "bg-gradient-radial from-blue-300/10 to-transparent"
        }`}
        style={{
          backgroundSize: "120% 120%",
          backgroundPosition: "center",
          animation: "pulse 15s infinite ease-in-out",
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute rounded-full ${isDark ? "bg-purple-400/20" : "bg-blue-400/20"}`}
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `particle-float ${Math.random() * 30 + 20}s infinite linear`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Animated glow effect */}
      <div
        className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-3xl ${
          isDark ? "bg-purple-900/10" : "bg-blue-500/10"
        }`}
        style={{
          animation: "glow 10s infinite alternate ease-in-out",
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { background-size: 100% 100%; }
          50% { background-size: 140% 140%; }
        }
        @keyframes float-0 {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-60%, -40%) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-40%, -60%) rotate(-180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-55%, -45%) rotate(90deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-45%, -55%) rotate(-90deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-45%, -45%) scale(1.1); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-55%, -55%) scale(0.9); }
        }
        @keyframes particle-float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(50px, 25px); }
          50% { transform: translate(0, 50px); }
          75% { transform: translate(-50px, 25px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

export default AnimatedBackground
