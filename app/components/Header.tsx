'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-20 text-center">

      <div className="mb-8 bg-green-100 inline-flex items-center rounded-full border border-[#3FC060] px-4 py-1.5">
        <span className="text-sm font-medium text-green-700 tracking-wide">
          $0 Commissions. $0 Subscription.
        </span>
      </div>

      <h1 className="max-w-6xl text-4xl sm:text-5xl md:text-6xl lg:text-[74px] font-bold text-text-1">
        Deliver More, Spend Less.
      </h1>

      <p className="mt-4 max-w-5xl text-base sm:text-lg md:text-xl lg:text-[24px] text-text-2">
        Boost sales and cut costs with AI-powered On-Demand Drivers that expand your reach —{' '}
        paired with smart marketing to turn every delivery into a direct, loyal customer.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button className="w-full sm:w-60 h-12 sm:h-15 text-base sm:text-lg px-6">
          Start Free Trial
        </Button>
        <Button
          variant="ghost"
          className="text-text-1 w-full sm:w-60 h-12 sm:h-15 text-base sm:text-lg px-6 border border-[#CBD5E1]"
        >
          How it&apos;s works
        </Button>
      </div>

      <div className="relative w-full max-w-6xl h-150 py-8 sm:py-12 md:mt-16 hidden md:block">

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-200 max-w-200"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/Mask group.png"
            alt="Dashboard overview"
            width={800}
            height={500}
            className="w-full h-auto drop-shadow-xl"
            priority
          />
        </motion.div>

        <motion.div
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-85 max-w-85"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/Group 5817.png"
            alt="Order details panel"
            width={260}
            height={390}
            className="w-full h-auto drop-shadow-xl"
          />
        </motion.div>

        <motion.div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-85 max-w-85"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/Group 5614.png"
            alt="Delivery charge summary"
            width={260}
            height={390}
            className="w-full h-auto drop-shadow-xl"
          />
        </motion.div>

        <motion.div
          className="absolute left-1/2 -top-10 -translate-x-1/2 w-85 max-w-85"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/Group 5833.png"
            alt="Driver assignment panel"
            width={260}
            height={130}
            className="w-full h-auto drop-shadow-xl"
          />
        </motion.div>

      </div>
    </section>
  )
}
