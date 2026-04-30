'use client'

import { ArrowUp, Check, Plus } from 'lucide-react'
import { Bar, BarChart, Cell, XAxis } from 'recharts'
import {
  ChartContainer,
} from '@/components/ui/chart'
import { TickIcon } from '@/components/icons/tick'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const chartData = [
  { month: 'Sep', orders: 55 },
  { month: 'Oct', orders: 68 },
  { month: 'Nov', orders: 78 },
  { month: 'Dec', orders: 85 },
  { month: 'Jan', orders: 90 },
  { month: 'Feb', orders: 120 },
]

const chartConfig = {
  orders: {
    label: 'Orders',
    color: '#22C55E',
  },
}

const features = [
  {
    title: 'Win With Transparency',
    description:
      'Increase conversion rates by offering the live-tracking experience that modern customers demand.',
  },
  {
    title: 'Expand Your Radius',
    description:
      'Unlock revenue from new neighborhoods by extending your delivery reach beyond traditional limits.',
  },
  {
    title: 'Drive Repeat Business',
    description:
      'Turn one-time diners into regulars using automated SMS triggers based on ordering habits.',
  },
]

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 20,
    duration: duration * 1000
  })
  const displayValue = useTransform(springValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])

  return <motion.span ref={ref}>{displayValue}</motion.span>
}

function AnimatedRevenueCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 20,
    duration: duration * 1000
  })
  const displayValue = useTransform(springValue, (latest) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(latest)
  )

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])

  return <motion.span ref={ref}>{displayValue}</motion.span>
}

export default function BoostSales() {
  const [barRadius, setBarRadius] = useState<[number, number, number, number]>([20, 20, 0, 0])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setBarRadius(e.matches ? [12, 12, 0, 0] : [20, 20, 0, 0])
    }
    update(mq)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section id="benefits" className="min-h-screen sm:min-h-screen flex justify-center items-center w-full px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl rounded-2xl border-2 border-[#E5E7EB] p-3 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">

          {/* Left: stats + chart */}
          <div className="flex flex-col gap-3 bg-[#FAFAFB] p-3 sm:p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <motion.div
                className="rounded-xl space-y-2 sm:space-y-3 border border-[#E5E7EB] bg-white p-3 sm:p-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <p className="text-[11px] sm:text-sm font-medium text-text-1">Live Orders</p>
                <div className='flex justify-between flex-row sm:flex-col sm:items-start'>
                  <p className="text-xl sm:text-[32px] font-medium text-text-1">
                    <AnimatedCounter value={7} />
                  </p>
                  <p className="flex items-center gap-0.5 text-sm font-semibold text-[#3FC060]">
                    <ArrowUp className="h-3 w-3 font-bold" />
                    Updating live
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="rounded-xl space-y-2 sm:space-y-3 border border-[#E5E7EB] bg-white p-3 sm:p-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                <p className="text-[11px] sm:text-sm font-medium text-text-1">Revenue this month</p>
                <div className='flex justify-between flex-row sm:flex-col sm:items-start'>
                  <p className="text-xl sm:text-[32px] font-medium text-text-1">
                    <AnimatedRevenueCounter value={17327} />
                  </p>
                  <p className="flex items-center gap-0.5 text-sm font-semibold text-[#3FC060]">
                    <Plus className="h-3 w-3 font-bold" />
                    18% vs last month
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 sm:p-5">
              <p className="text-xs sm:text-base font-medium text-text-1 mb-3 sm:mb-4">Monthly Orders</p>
              <ChartContainer config={chartConfig} className="h-30 sm:h-55.5 w-full pointer-events-none">
                <BarChart data={chartData} barSize={70} barCategoryGap="5%">
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#475569' }}
                  />
                  <Bar dataKey="orders" radius={barRadius} cursor="default" activeBar={false}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={entry.month}
                        fill={index === chartData.length - 1 ? '#3FC060' : '#F0FDF4'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          {/* Right: heading + features */}
          <div className="flex flex-col gap-5 sm:gap-10 p-3 sm:p-6 rounded-xl">
            <div className="flex items-center gap-4 sm:gap-8">
              <div className='border border-[#E5E7EB] rounded-xl p-3 sm:p-5'>
                <div className="h-6 w-6 sm:h-12 sm:w-12 shrink-0 rounded-full bg-[#3FC060] flex items-center justify-center">
                  <span className="sm:hidden"><TickIcon size={12} stroke='white' /></span>
                  <span className="hidden sm:flex"><TickIcon stroke='white' /></span>
                </div>
              </div>
              <h2 className="text-xl sm:text-3xl md:text-[44px] font-bold text-text-1">Boost Sales</h2>
            </div>

            <div className="flex flex-col gap-3 sm:gap-8">
              {features.map(({ title, description }) => (
                <div key={title} className="flex gap-3 sm:gap-6">
                  <div className="mt-0.5 shrink-0 h-fit p-1.5 sm:p-2 rounded-md bg-[#F0FDF4]">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#3FC060]" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-sm sm:text-xl font-semibold text-text-1 mb-1">{title}</p>
                    <p className="text-[10px] sm:text-[14px] text-text-2 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
