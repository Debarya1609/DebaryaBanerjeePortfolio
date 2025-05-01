"use client"

import type React from "react"

import { useState, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"

export function StyledContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null)

  // ✅ Replace with your own keys
  const EMAILJS_SERVICE_ID = "service_hs9apxh"
  const EMAILJS_TEMPLATE_ID = "template_tdm6pdf"
  const EMAILJS_PUBLIC_KEY = "ZS5SOb-nRidPdIHGM"
  const RECAPTCHA_SITE_KEY = "6LeKpSorAAAAALC9BrGws1kLfq4OTD4Gk1v7RFEP"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const recaptchaValue = recaptchaRef.current?.getValue()
    if (!recaptchaValue) {
      setStatusMessage("Please complete the reCAPTCHA")
      setStatusType("error")
      return
    }

    if (!formRef.current) return

    setIsSubmitting(true)
    setStatusMessage(null)
    setStatusType(null)

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatusMessage("Message sent successfully!")
        setStatusType("success")
        formRef.current?.reset()
        recaptchaRef.current?.reset()
      })
      .catch(() => {
        setStatusMessage("Failed to send message. Please try again later.")
        setStatusType("error")
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500"
          placeholder="Your message..."
        ></textarea>
      </div>

      <div className="flex justify-center">
        <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} theme="dark" />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 border-0 shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {statusMessage && (
        <div
          className={`mt-4 p-3 rounded-md text-center ${
            statusType === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {statusMessage}
        </div>
      )}
    </form>
  )
}
