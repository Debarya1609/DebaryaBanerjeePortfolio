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
      <Dialog.Panel className="fixed inset-0 overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 lg:hidden">
        <div className="flex items-center justify-between">
          <Link
            href="#"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            Debarya Banerjee
          </Link>
          <button type="button" onClick={onClose} className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300">
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-800">
            <div className="space-y-2 py-6">
              <Link
                href="/"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
                onClick={onClose}
              >
                Home
              </Link>
              <Link
                href="#journey"
                onClick={(e) => {
                  e.preventDefault()
                  props.scrollToSection?.("journey")
                  onClose()
                }}
                className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
              >
                Journey
              </Link>
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  props.scrollToSection?.("contact")
                  onClose()
                }}
                className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="py-6">
              <button
                onClick={toggleTheme}
                className="flex w-full items-center justify-center rounded-md bg-blue-600 dark:bg-purple-500 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-blue-500 dark:hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-purple-500"
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
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
