'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { TrackingIcon } from '@/components/icons/tracking'
import { DollarIcon } from '@/components/icons/dollar'
import { DispatchIcon } from '@/components/icons/dispatch'
import { DeliveryBoxIcon } from '@/components/icons/delivery'

const steps = [
  {
    icon: DispatchIcon,
    title: 'We Auto-Dispatch',
    description: "Our system instantly assigns a driver for a predictable flat fee, handling the logistics so you don't have to.",
    image: '/22 2.png',
    imgClassName: 'absolute z-10 bottom-0 left-0 right-0 px-8',
    imgStyle: { height: '90%' },
  },
  {
    icon: TrackingIcon,
    title: 'Branded Tracking & Opt-Ins',
    description: 'Customers track their driver on a branded map that looks like you. We use this high-engagement moment to capture SMS opt-ins for your list.',
    image: '/Tracking.png',
    imgClassName: 'absolute z-10 bottom-0 left-0 right-0 px-8',
    imgStyle: { height: '90%' },
  },
  {
    icon: DeliveryBoxIcon,
    title: 'Automate Repeat Business',
    description: 'We turn that data into revenue. Our system automatically texts customers to drive Google Reviews and trigger their next order.',
    image: '/Automate.png',
    imgClassName: 'absolute z-10 bottom-0 left-0 right-0 px-8',
    imgStyle: { height: '90%' },
  },
  {
    icon: DollarIcon,
    title: 'You Keep the Profit',
    description: 'Receive the order and keep 100% of the ticket price. No commissions, no percentage fees—just pure revenue.',
    image: '/money.png',
    imgClassName: 'absolute z-10 left-0 right-0 px-16',
    imgStyle: { height: '75%', top: '10%', transform: 'translateY(-50%)' },
  },
]

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 10000)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const handleClick = (index: number) => {
    setActive(index)
    startTimer()
  }

  return (
    <section id="how-it-works" className="w-full px-4 py-16 sm:py-18.75 overflow-hidden">
      <div className="mx-auto max-w-3xl text-center mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-[54px] font-bold text-text-1">
          How It Works
        </h2>
        <p className="mt-4 text-base sm:text-xl md:text-2xl text-text-2 max-w-3xl mx-auto">
          A seamless process designed to maximize your margins and build your customer database.
        </p>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — clickable steps */}
        <div className="flex flex-col gap-3">
          {steps.map(({ icon: Icon, title, description }, index) => {
            const isActive = active === index
            return (
              <button
                key={title}
                onClick={() => handleClick(index)}
                className={`flex items-start gap-4 sm:gap-6 rounded-2xl border text-left transition-all duration-200 p-5 sm:p-6 w-full ${isActive
                    ? 'border-[#E2E8F0] bg-white shadow-sm'
                    : 'border-transparent hover:bg-[#F8FAFC]'
                  }`}
              >
                <div className="shrink-0 mt-0.5">
                  <Icon stroke={isActive ? '#1877F2' : '#475569'} />
                </div>
                <div>
                  <span
                    className={`text-lg sm:text-2xl font-medium transition-colors duration-200 ${isActive ? 'text-text-1 font-semibold' : 'text-text-2'
                      }`}
                  >
                    {title}
                  </span>
                  {isActive && (
                    <p className="mt-2 text-sm sm:text-md text-text-2">{description}</p>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Right — image / card panel */}
        <div className="relative min-h-64 sm:min-h-150 w-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-[#FAFAFB]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={steps[active].imgClassName}
              style={steps[active].imgStyle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={steps[active].image!}
                alt={steps[active].title}
                fill
                className="object-contain object-center rounded-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
