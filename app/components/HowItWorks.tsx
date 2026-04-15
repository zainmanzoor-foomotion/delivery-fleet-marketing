'use client'

import { motion } from 'framer-motion'
import { TrackingIcon } from '@/components/icons/tracking'
import { DollarIcon } from '@/components/icons/dollar'
import { DispatchIcon } from '@/components/icons/dispatch'
import { DeliveryBoxIcon } from '@/components/icons/delivery'

const steps = [
  { icon: DispatchIcon, title: 'We Auto-Dispatch' },
  { icon: TrackingIcon, title: 'Branded Tracking & Opt-Ins' },
  { icon: DeliveryBoxIcon, title: 'Automate Repeat Business' },
]

export default function HowItWorks() {
  return (
    <section className="w-full px-4 py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-3xl text-center mb-14">
        <h2 className="text-[54px] sm:text-4xl md:text-5xl font-bold text-text-1">
          How It Works
        </h2>
        <p className="mt-4 text-base sm:text-2xl text-text-2 max-w-3xl mx-auto">
          A seamless process designed to maximize your margins and build your customer database.
        </p>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-10 relative">
          {steps.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-4 relative z-10 pl-5">
              {/* <div className="h-9 w-9 shrink-0 rounded-lg bg-[#F1F5F9] flex items-center justify-center"> */}
                <Icon stroke={"#475569"} />
              {/* </div> */}
              <span className="text-2xl font-medium text-text-2">{title}</span>
            </div>
          ))}

          <div className="relative z-10 rounded-2xl border border-[#E2E8F0] bg-white p-8 flex gap-6">
               <DollarIcon stroke={"#1877F2"} />
            <div>
              <p className="text-2xl font-semibold text-text-2">You Keep the Profit</p>
              <p className="mt-2 text-md text-text-2">
                Receive the order and keep 100% of the ticket price. No commissions, no percentage
                fees—just pure revenue.
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-150 min-w-sm flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-[#FAFAFB]" />

          <div className="relative" style={{ width: 370, height: 420 }}>
            <motion.div
              className="absolute rounded-2xl bg-white border border-[#E2E8F0]"
              style={{ transformOrigin: 'bottom center', top: -8, left: 0, right: 0, height: 400 }}
              initial={{ opacity: 0, x: -120, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="absolute rounded-2xl bg-white border border-[#E2E8F0]"
              style={{ transformOrigin: 'bottom center', top: -10, left: 0, right: 0, height: 400 }}
              initial={{ opacity: 0, x: -120, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: 3 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="absolute inset-0 rounded-2xl bg-white border border-[#E2E8F0]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-6 h-full flex flex-col justify-center">
                <div className="flex justify-center mb-5">
                  <div className="h-30 w-30 rounded-full bg-[#F7F9FB] flex items-center justify-center">
                    <span className="text-[34px] font-bold text-primary">$45</span>
                  </div>
                </div>

                <p className="text-center text-2xl font-semibold text-text-1">
                  New Order Received
                </p>

                <div className="space-y-3 mt-8">
                  <div className="flex items-center justify-between">
                    <span className="text-md text-text-2">Order Total</span>
                    <span className="text-md text-text-1">$45.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-md text-text-2">Commission</span>
                    <span className="text-md text-primary">$0.00</span>
                  </div>
                  <div className="border-t border-[#E2E8F0] mt-6 pt-6 flex items-center justify-between">
                    <span className="text-md font-bold text-text-1">You Keep</span>
                    <span className="text-md font-semibold text-primary">$45.00</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
