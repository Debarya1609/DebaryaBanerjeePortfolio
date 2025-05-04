"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Github, Mail, Linkedin, Moon, Sun, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/animated-background"
import { NetworkBackground } from "@/components/3d-network-background"
import { JourneyPath } from "@/components/journey-path"
import { ScrollProgress } from "@/components/scroll-progress"
import { motion } from "framer-motion"
import ContactForm from "@/components/contact-form"
import { MobileMenu } from "@/components/mobile-menu"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Project data
const projects = [
  {
    id: 1,
    title: "AI Image Generator",
    description: "A web application that uses machine learning to generate unique images from text descriptions.",
    image: "/placeholder.svg?height=250&width=500",
    technologies: ["React", "TensorFlow.js", "Node.js"],
    github: "https://github.com",
    demo: "https://demo.com",
    position: 20, // percentage from top of journey path
    side: "right", // which side of the path
  },
  {
    id: 2,
    title: "Smart Home Dashboard",
    description: "An IoT dashboard for monitoring and controlling connected home devices with real-time updates.",
    image: "/placeholder.svg?height=250&width=500",
    technologies: ["Vue.js", "Firebase", "WebSockets"],
    github: "https://github.com",
    demo: "https://demo.com",
    position: 35,
    side: "left",
  },
  {
    id: 3,
    title: "Crypto Portfolio Tracker",
    description: "A cryptocurrency portfolio tracker with real-time price updates and performance analytics.",
    image: "/placeholder.svg?height=250&width=500",
    technologies: ["Next.js", "TypeScript", "CoinGecko API"],
    github: "https://github.com",
    demo: "https://demo.com",
    position: 50,
    side: "right",
  },
  {
    id: 4,
    title: "AR Navigation App",
    description: "An augmented reality mobile app for indoor navigation in large buildings and complexes.",
    image: "/placeholder.svg?height=250&width=500",
    technologies: ["React Native", "ARKit", "ARCore"],
    github: "https://github.com",
    demo: "https://demo.com",
    position: 65,
    side: "left",
  },
  {
    id: 5,
    title: "AI Content Summarizer",
    description: "A tool that uses natural language processing to generate concise summaries of long articles.",
    image: "/placeholder.svg?height=250&width=500",
    technologies: ["Python", "Flask", "Hugging Face"],
    github: "https://github.com",
    demo: "https://demo.com",
    position: 80,
    side: "right",
  },
]

// Skills data
const skills = [
  { name: "JavaScript/TypeScript", category: "frontend" },
  { name: "React/Next.js", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "UI/UX Design", category: "design" },
  { name: "Machine Learning", category: "ai" },
  { name: "CSS/Tailwind", category: "frontend" },
]

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollToSection } = useSmoothScroll()

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Initialize animations after mount
  useEffect(() => {
    setMounted(true)

    // Initialize animations only after component is mounted
    if (mainRef.current) {
      // Hero section animations
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".hero-description", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      })

      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      })

      gsap.from(".hero-skills", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      })
    }
  }, [])

  // Don't render until client-side to prevent hydration issues with theme
  if (!mounted) return null

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen font-sans antialiased overflow-hidden transition-colors duration-300
        dark:bg-gradient-to-br dark:from-black dark:to-purple-950
        bg-gradient-to-br from-white to-blue-50"
    >
      {/* 3D Network Background */}
      <NetworkBackground />

      {/* Pure CSS Animated Background */}
      <AnimatedBackground />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-gray-200/20 dark:border-purple-900/20">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            Debarya Banerjee
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#journey"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("journey")
              }}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
            >
              Journey
            </Link>
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("contact")
              }}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
            >
              Contact
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2 text-gray-700 dark:text-gray-300">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <Badge className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                Full Stack Developer
              </Badge>
            </motion.div>

            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Building the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                future
              </span>{" "}
              with code
            </h1>

            <p className="hero-description max-w-2xl text-lg md:text-xl text-gray-700 dark:text-gray-300">
              I'm Debarya, a developer passionate about AI, UI/UX, and building applications that make a difference.
              Join me on my journey through code and creativity.
            </p>

            <div className="hero-skills flex flex-wrap justify-center gap-2 max-w-2xl">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  className={`
                    ${skill.category === "frontend" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : ""}
                    ${skill.category === "backend" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : ""}
                    ${skill.category === "design" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" : ""}
                    ${skill.category === "ai" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" : ""}
                  `}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 border-0 shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
              >
                <Link href="#journey">Explore My Journey</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-blue-500 dark:border-purple-500 text-blue-600 dark:text-purple-400 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="border border-gray-300 dark:border-gray-700 hover:bg-white/10 dark:hover:bg-white/5"
              >
                <Link href="#" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Link>
              </Button>
            </div>

            <div className="flex gap-4 mt-8">
              <Link href="https://github.com" target="_blank" rel="noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
            >
              <ChevronDown className="text-gray-500 dark:text-gray-400 h-6 w-6" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white-300 dark:text-purple-300 border border-blue-200 dark:border-purple-800">
              MY PROJECTS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Journey Through My Work
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my projects along this interactive timeline. Each project represents a milestone in my development
              journey.
            </p>
          </div>

          <div className="relative min-h-[200vh]">
            {/* Journey Path Component */}
            <JourneyPath projects={projects} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white-300 dark:text-purple-300 border border-blue-200 dark:border-purple-800">
              GET IN TOUCH
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Let's Connect
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or
                just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-800 dark:text-gray-200">debaryab@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-lg shadow-purple-500/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-600 dark:text-purple-400"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-gray-800 dark:text-gray-200">Howrah, West Bengal, India</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Link href="https://github.com" target="_blank" rel="noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-blue-500 dark:border-purple-500 text-blue-600 dark:text-purple-400 hover:bg-blue-50 dark:hover:bg-purple-900/20 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-blue-500 dark:border-purple-500 text-blue-600 dark:text-purple-400 hover:bg-blue-50 dark:hover:bg-purple-900/20 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-blue-500 dark:border-purple-500 text-blue-600 dark:text-purple-400 hover:bg-blue-50 dark:hover:bg-purple-900/20 shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/20 dark:border-purple-900/20 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200/20 dark:border-purple-900/20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Debarya Banerjee. All rights reserved.
            </p>

            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
