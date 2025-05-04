"use client"

import { useState, useEffect } from "react"

// Export with the correct name that's being imported in other components
export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only runs on client
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check on mount
    if (typeof window !== "undefined") {
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [breakpoint])

  return isMobile
}

// Also export as useIsMobile for consistency if needed
export const useIsMobile = useMobile
