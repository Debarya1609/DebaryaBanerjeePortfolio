import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NetworkBackground } from "@/components/3d-network-background"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Debarya Banerjee | Developer Portfolio",
  description:
    "Portfolio website showcasing Debarya Banerjee's journey as a developer specializing in AI, UI/UX, and app building.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Mesh background (fixed + behind everything) */}
          <NetworkBackground />

          {/* Gradient overlay to soften mesh (fixed + behind content) */}
          <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background/60 to-background/90 pointer-events-none z-0" />

          {/* Main content (above both mesh + gradient) */}
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
