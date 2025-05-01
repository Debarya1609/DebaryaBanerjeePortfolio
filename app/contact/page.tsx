// app/contact/page.tsx

import ContactForm from '@/components/contact-form'; // Adjust path if needed

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Me</h1>
      <ContactForm />
    </div>
  );
}
