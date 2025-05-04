"use client"
import { Dialog } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"
import Link from "next/link"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  toggleTheme: () => void
  scrollToSection?: (id: string) => void
}

export function MobileMenu(props: MobileMenuProps) {
  const { isOpen, onClose, toggleTheme, scrollToSection } = props
  const { theme } = useTheme()

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <Dialog.Panel
        className="
          fixed inset-0 backdrop-blur-md bg-black/60 dark:bg-black/70
          px-6 py-6 transition-transform transform duration-300 ease-out
          animate-slidein
        "
      >
        <div className="flex items-center justify-between">
          <Link
            href="#"
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-300 dark:to-purple-400"
          >
            Debarya Banerjee
          </Link>
          <button type="button" onClick={onClose} className="-m-2.5 rounded-md p-2.5 text-gray-300 hover:text-white transition">
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 space-y-6 text-center">
          <Link
            href="/"
            onClick={onClose}
            className="block text-xl font-medium text-gray-200 hover:text-white transition"
          >
            Home
          </Link>
          <button
            onClick={() => {
              scrollToSection?.("journey")
              onClose()
            }}
            className="block text-xl font-medium text-gray-200 hover:text-white transition w-full"
          >
            Journey
          </button>
          <button
            onClick={() => {
              scrollToSection?.("contact")
              onClose()
            }}
            className="block text-xl font-medium text-gray-200 hover:text-white transition w-full"
          >
            Contact
          </button>
        </div>

        <div className="mt-10">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-lg font-semibold text-white shadow-lg hover:opacity-90 transition backdrop-blur-md"
          >
            {theme === "dark" ? (
              <>
                <SunIcon className="mr-2 h-5 w-5" /> Light Mode
              </>
            ) : (
              <>
                <MoonIcon className="mr-2 h-5 w-5" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </Dialog.Panel>

      {/* Animation (optional, Tailwind) */}
      <style jsx global>{`
        @keyframes slidein {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slidein {
          animation: slidein 0.3s ease-out;
        }
      `}</style>
    </Dialog>
  )
}
