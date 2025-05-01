"use client"

import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import ReCAPTCHA from "react-google-recaptcha"

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setIsVerified(true)
    } else {
      setIsVerified(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isVerified) {
      setStatus("❌ Please complete the reCAPTCHA")
      return
    }

    // Replace these with your actual IDs
    const serviceID = "service_hs9apxh"
    const templateID = "template_tdm6pdf"
    const publicKey = "YZS5SOb-nRidPdIHGM"

    emailjs
      .send(serviceID, templateID, form, publicKey)
      .then(
        () => {
          setStatus("✅ Message sent successfully!")
          setForm({ name: "", email: "", message: "" })
          recaptchaRef.current?.reset()
          setIsVerified(false)
        },
        () => {
          setStatus("❌ Failed to send. Please try again.")
        }
      )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={4}
        required
      />

      <ReCAPTCHA
        sitekey="6LeKpSorAAAAALC9BrGws1kLfq4OTD4Gk1v7RFEP"
        onChange={handleCaptchaChange}
        ref={recaptchaRef}
      />

      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded disabled:opacity-50"
        disabled={!isVerified}
      >
        Send
      </button>

      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  )
}
