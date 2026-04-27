'use client'

import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'

const mobileScreens = [
  '/22 2.png',
  '/11 1.png',
  '/33 1.png',
]

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mobileStarted, setMobileStarted] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { amount: 0,once: true })

  // Step 1: center (0s), Step 2: left card (delay 0.8s), Step 3: phone appears + starts cycling (delay 1.6s)
  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => setMobileStarted(true), 1700)
    return () => clearTimeout(t)
  }, [isInView])

  useEffect(() => {
    if (!mobileStarted) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mobileScreens.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [mobileStarted])

  return (
    <section className="flex flex-col items-center justify-center px-4 py-8 md:py-10 text-center overflow-x-hidden">

      <div className="mb-8 bg-green-100 inline-flex items-center rounded-full border border-[#3FC060] px-4 py-1.5">
        <span className="text-sm font-medium text-text-1 tracking-wide">
          $0 Commissions. $0 Subscription.
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-[54px] font-bold text-text-1">
        Deliver More, Spend Less.
      </h1>

      <p className="mt-2 max-w-5xl text-base sm:text-lg md:text-xl text-text-2">
        Boost sales and cut costs with AI-powered On-Demand Drivers that expand your reach —{' '}
        paired with smart marketing to turn every delivery into a direct, loyal customer.
      </p>

      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
        <a href='https://app.mydeliveryfleet.com/sign-up' target='_blank'>
          <Button className="w-full sm:w-60 h-12 sm:h-15 text-base sm:text-lg px-6">
            Start Free Trial
          </Button>
        </a>
        <a href="#how-it-works">
          <Button
            variant="ghost"
            className="text-text-1 w-full sm:w-50 h-12 sm:h-15 text-base sm:text-lg px-6 border border-[#CBD5E1]"
          >
            How It Works
          </Button>
        </a>
      </div>

      <div ref={containerRef} className='mt-5 w-full max-w-6xl relative h-40 sm:h-70 md:h-90 lg:h-130 overflow-hidden'>

        {/* Step 1: Center dashboard — zoom in immediately on viewport enter */}
        <motion.div
          className='absolute left-1/2 -translate-x-1/2 w-[90%] sm:w-130 sm:max-w-130 md:w-185 md:max-w-185 lg:w-230 lg:max-w-230'
          initial={{ scale: 0.85, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src='/Group 5961.png'
            alt='Dashboard'
            width={800}
            height={600}
            className='w-full h-auto object-contain rounded-xl'
          />
        </motion.div>

        {/* Step 2: Left card — slides in from left after center finishes (delay 0.8s) */}
        <motion.div
          className='absolute left-0 top-4/6 -translate-y-1/2 w-20 max-w-20 sm:w-36 sm:max-w-36 md:w-50 md:max-w-50 lg:w-65 lg:max-w-65'
          initial={{ x: -80, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src='/Group 5847.png'
            alt='Order details'
            width={260}
            height={400}
            className='w-full h-auto object-contain rounded-xl'
          />
        </motion.div>

        {/* Step 3: Right phone — slides up from bottom after left card (delay 1.6s), then cycles */}
        <motion.div
          className='absolute right-0 bottom-0 lg:-bottom-10 w-20 sm:w-36 md:w-50 lg:w-65 overflow-hidden h-30 sm:h-55 md:h-72 lg:h-100'
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndex}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={mobileScreens[activeIndex]}
                alt={`Mobile screen ${activeIndex + 1}`}
                width={260}
                height={400}
                className='w-full h-full object-contain rounded-xl'
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

    </section>
  )
}
