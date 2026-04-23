'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const inputClass =
  'h-10 w-full rounded-xl border border-[#E5E7EB] px-3 text-sm text-text-1 placeholder:text-text-2/50 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30 bg-white'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    companyName: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', companyName: '', phone: '', message: '' })
  }

  return (
    <>
      <main className="flex-1 bg-white px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-8xl text-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-[54px] font-bold text-text-1">
            Deliver faster. Cut costs.<br />Own your customers.
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-xl text-text-2 max-w-4xl mx-auto">
            My Delivery Fleet platform helps restaurants, couriers, and local shops automate dispatch,
            delight customers, and grow — commission-free.
          </p>
        </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-4xl border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
          >
            {/* Row: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs md:text-sm font-medium text-text-2">Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs md:text-sm font-medium text-text-2">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row: Company + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs md:text-sm font-medium text-text-2">Company Name *</label>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs md:text-sm font-medium text-text-2">Phone number *</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs md:text-sm font-medium text-text-2">
                How do you plan to use My Delivery Fleet? *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your business needs and timeline"
                required
                rows={5}
                className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm text-text-1 placeholder:text-text-2/50 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30 resize-none bg-white"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="px-8 h-11">
                Submit Form
              </Button>
            </div>
          </form>

        {submitted && (
          <div className="mx-auto max-w-4xl mt-4 text-center py-6 border border-[#E5E7EB] rounded-2xl">
            <p className="text-xl font-bold text-text-1 mb-1">Thank you!</p>
            <p className="text-text-2 text-sm">We&apos;ll be in touch shortly.</p>
          </div>
        )}
      </main>
    </>
  )
}
