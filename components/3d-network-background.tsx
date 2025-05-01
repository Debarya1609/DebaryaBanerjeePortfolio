"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Node class for network points
    class Node {
      x: number
      y: number
      z: number
      radius: number
      color: string
      vx: number
      vy: number
      vz: number

      constructor(x: number, y: number, z: number, isDark: boolean) {
        this.x = x
        this.y = y
        this.z = z
        this.radius = Math.random() * 1.5 + 0.5
        this.color = isDark
          ? `rgba(168, 85, 247, ${Math.random() * 0.5 + 0.25})` // Purple in dark mode
          : `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.25})` // Blue in light mode
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.vz = (Math.random() - 0.5) * 0.3
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.z += this.vz

        // Boundary check
        if (Math.abs(this.x) > 1000) this.vx *= -1
        if (Math.abs(this.y) > 1000) this.vy *= -1
        if (Math.abs(this.z) > 1000) this.vz *= -1
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
        // Perspective projection
        const scale = 1000 / (1000 + this.z)
        const x2d = this.x * scale + centerX
        const y2d = this.y * scale + centerY
        const r = this.radius * scale

        // Draw node
        ctx.beginPath()
        ctx.arc(x2d, y2d, r, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        return { x: x2d, y: y2d, scale }
      }
    }

    // Create nodes
    const isDark = theme === "dark"
    const nodes: Node[] = []
    for (let i = 0; i < 100; i++) {
      nodes.push(
        new Node((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000, isDark),
      )
    }

    // Animation variables
    let angle = 0
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update rotation angle
      angle += 0.002

      // Rotate nodes around Y axis
      const positions: { x: number; y: number; scale: number }[] = []

      nodes.forEach((node) => {
        // Apply rotation
        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)

        const rotatedX = node.x * cosA - node.z * sinA
        const rotatedZ = node.x * sinA + node.z * cosA

        node.x = rotatedX
        node.z = rotatedZ

        node.update()
        const pos = node.draw(ctx, centerX, centerY)
        positions.push(pos)
      })

      // Draw connections
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = positions[i].x - positions[j].x
          const dy = positions[i].y - positions[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / 100

            ctx.beginPath()
            ctx.moveTo(positions[i].x, positions[i].y)
            ctx.lineTo(positions[j].x, positions[j].y)
            ctx.strokeStyle = isDark ? `rgba(168, 85, 247, ${opacity * 0.2})` : `rgba(59, 130, 246, ${opacity * 0.2})`
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />
}
