"use client"

import { Canvas } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { Suspense, useMemo, useEffect, useState } from "react"
import { MeshDistortMaterial } from "@react-three/drei"

export function NetworkBackground() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  // Ensure component only renders on client (avoid SSR mismatch)
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Monotone color that fits both dark & light theme
  const meshColor = useMemo(() => {
    return theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
  }, [theme])

  if (!isClient) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]} // limit pixel density (prevents WebGL crash)
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          failIfMajorPerformanceCaveat: false,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <RotatingMesh color={meshColor} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function RotatingMesh({ color }: { color: string }) {
  return (
    <mesh rotation={[0.3, 0.3, 0.0]}>
      <icosahedronGeometry args={[1.5, 2]} />
      <MeshDistortMaterial
        color={color}
        wireframe
        distort={0.4}
        speed={1.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}
