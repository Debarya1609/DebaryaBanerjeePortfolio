'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // ✅ Replace with your own keys
  const EMAILJS_SERVICE_ID = 'service_hs9apxh';
  const EMAILJS_TEMPLATE_ID = 'template_tdm6pdf';
  const EMAILJS_PUBLIC_KEY = 'ZS5SOb-nRidPdIHGM';
  const RECAPTCHA_SITE_KEY = '6LeKpSorAAAAALC9BrGws1kLfq4OTD4Gk1v7RFEP';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setStatusMessage('Please complete the reCAPTCHA');
      return;
    }

    if (!formRef.current) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatusMessage('Message sent successfully!');
        formRef.current?.reset();
        recaptchaRef.current?.reset();
      })
      .catch(() => {
        setStatusMessage('Failed to send message. Please try again later.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        rows={5}
        className="w-full p-2 border rounded"
      />

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LeKpSorAAAAALC9BrGws1kLfq4OTD4Gk1v7RFEP"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {statusMessage && (
        <p className="text-center mt-2 text-sm text-gray-700">
          {statusMessage}
        </p>
      )}
    </form>
  );
}
