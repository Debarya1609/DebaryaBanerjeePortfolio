"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

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

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMobile()

  return (
    <motion.div
      className={`${isMobile ? "w-56" : "w-64 md:w-72"} bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200/20 dark:border-purple-900/20 shadow-lg transition-all duration-300`}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered ? "0 0 20px rgba(147, 51, 234, 0.3)" : "0 0 10px rgba(147, 51, 234, 0.1)",
      }}
    >
      <div className="relative h-32 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-3">
          <h3 className={`${isMobile ? "text-base" : "text-lg"} font-bold text-white drop-shadow-md`}>
            {project.title}
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <p className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600 dark:text-gray-300 line-clamp-2`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, isMobile ? 2 : 3).map((tech, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs bg-blue-100/30 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/30"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > (isMobile ? 2 : 3) && (
            <Badge
              variant="outline"
              className="text-xs bg-purple-100/30 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
            >
              +{project.technologies.length - (isMobile ? 2 : 3)}
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            asChild
            variant="outline"
            size={isMobile ? "sm" : "sm"}
            className="flex-1 border-blue-500 dark:border-purple-500 text-blue-600 dark:text-purple-400 hover:shadow-[0_0_10px_rgba(147,51,234,0.5)]"
          >
            <Link
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <Github className={`${isMobile ? "h-3 w-3" : "h-3 w-3"}`} />
              <span className={isMobile ? "text-xs" : ""}>Code</span>
            </Link>
          </Button>

          <Button
            asChild
            size={isMobile ? "sm" : "sm"}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 border-0 hover:shadow-[0_0_15px_rgba(147,51,234,0.7)]"
          >
            <Link
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <ExternalLink className={`${isMobile ? "h-3 w-3" : "h-3 w-3"}`} />
              <span className={isMobile ? "text-xs" : ""}>View</span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
