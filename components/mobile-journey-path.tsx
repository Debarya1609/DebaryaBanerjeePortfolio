"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MobileProjectCard } from "./mobile-project-card"
import { ChevronRight, ChevronLeft } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  position: number
  side: "left" | "right"
}

interface MobileJourneyPathProps {
  projects: Project[]
}

export function MobileJourneyPath({ projects }: MobileJourneyPathProps) {
  const pathRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    if (!pathRef.current || !dotRef.current || !containerRef.current) return

    // Clear any existing ScrollTrigger instances to prevent duplicates
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // Set up the journey path animation
    const pathHeight = containerRef.current.offsetHeight

    // Animate the dot along the path as user scrolls
    gsap.to(dotRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      top: pathHeight,
      ease: "none",
    })

    // Animate each project branch and card
    projects.forEach((project) => {
      const projectId = `mobile-project-${project.id}`
      const branchEl = document.getElementById(`mobile-branch-${project.id}`)
      const cardEl = document.getElementById(projectId)

      if (branchEl && cardEl) {
        // Animate branch growing from the path
        gsap.fromTo(
          branchEl,
          { width: 0 },
          {
            width: "60px",
            duration: 1,
            scrollTrigger: {
              trigger: branchEl,
              start: "top center+=100",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Animate card appearing
        gsap.fromTo(
          cardEl,
          {
            opacity: 0,
            x: project.side === "left" ? 30 : -30,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
              trigger: branchEl,
              start: "top center+=100",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    })

    // Hide scroll hint after 5 seconds
    const timer = setTimeout(() => {
      setShowScrollHint(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [projects])

  const handleProjectTouch = (projectId: number, isEnter: boolean) => {
    setActiveProject(isEnter ? projectId : null)

    const branchEl = document.getElementById(`mobile-branch-${projectId}`)

    if (branchEl) {
      gsap.to(branchEl, {
        height: isEnter ? "3px" : "1px",
        boxShadow: isEnter ? "0 0 15px rgba(147,51,234,0.7)" : "0 0 5px rgba(147,51,234,0.3)",
        duration: 0.3,
      })
    }

    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: isEnter ? 1.5 : 1,
        boxShadow: isEnter ? "0 0 20px rgba(147,51,234,0.9)" : "0 0 10px rgba(147,51,234,0.7)",
        duration: 0.3,
      })
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Main vertical path */}
      <div
        ref={pathRef}
        className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-500 to-blue-400 dark:from-blue-500 dark:via-purple-600 dark:to-blue-500"
      />

      {/* Moving dot */}
      <div
        ref={dotRef}
        className="absolute left-1/2 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-white shadow-[0_0_10px_rgba(147,51,234,0.7)] dark:shadow-[0_0_15px_rgba(168,85,247,0.7)] z-10 transition-all duration-300"
      />

      {/* Project branches and cards */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ top: `${project.position}%` }}
        >
          {/* Branch line */}
          <div
            id={`mobile-branch-${project.id}`}
            className={`absolute top-0 h-1 bg-gradient-to-r transition-all duration-300 ${
              project.side === "left"
                ? "right-0 from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                : "left-0 from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400"
            } shadow-[0_0_5px_rgba(147,51,234,0.3)] dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]`}
            style={{
              width: "60px",
              [project.side === "left" ? "right" : "left"]: "0px",
            }}
          />

          {/* Project card container with horizontal scroll */}
          <div
            className={`absolute top-[-60px] ${
              project.side === "left" ? "right-[70px]" : "left-[70px]"
            } max-w-[calc(100vw-100px)] overflow-x-auto pb-4 hide-scrollbar`}
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
          >
            {/* Project card */}
            <div
              id={`mobile-project-${project.id}`}
              className="min-w-[220px]"
              onTouchStart={() => handleProjectTouch(project.id, true)}
              onTouchEnd={() => handleProjectTouch(project.id, false)}
            >
              <MobileProjectCard project={project} />
            </div>
          </div>
        </div>
      ))}

      {/* Scroll hint */}
      {showScrollHint && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center z-50 animate-pulse">
          <div className="bg-black/40 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs text-white">
            <ChevronLeft className="h-3 w-3" />
            <span>Swipe cards to view details</span>
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>
      )}

      {/* Hide scrollbars */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
