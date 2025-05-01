"use client"

import { Canvas } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { Suspense, useEffect, useState, useMemo } from "react"
import { MeshDistortMaterial } from "@react-three/drei"

export function NetworkBackground() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  // Ensure component only runs on client (avoid SSR mismatch)
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Monotone mesh color that fits both themes subtly
  const meshColor = useMemo(() => {
    return theme === "dark" ? "#ffffff15" : "#00000015" // ~8% opacity white/black
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
        filter: "blur(1px)", // subtle blur to soften mesh
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
  // Slight continuous rotation effect
  return (
    <mesh rotation={[0.3, 0.3, 0]}>
      <icosahedronGeometry args={[1.5, 2]} />
      <MeshDistortMaterial
        color={color}
        wireframe
        distort={0.4}
        speed={1.5}
        transparent
        opacity={0.6} // soft opacity
      />
    </mesh>
  )
}
