'use client'

import { Check } from 'lucide-react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { TickDownIcon } from '@/components/icons/tickDown'

const MDF_FEE = 6.49

const features = [
    {
        title: 'Eliminate Commissions',
        description:
            'Keep 100% of your menu price—stop giving away 30% of every order to delivery apps.',
    },
    {
        title: 'Zero Subscription Fees',
        description:
            'Say goodbye to monthly overhead; pay only for the deliveries you actually make.',
    },
    {
        title: 'Flat-Fee Transparency',
        description:
            'Switch to predictable, flat-rate delivery pricing that protects your margins and simplifies your books.',
    },
]

const SPRING = { stiffness: 100, damping: 20 }

function AnimatedCurrency({ value, decimals = 2, compact = false }: { value: number; decimals?: number; compact?: boolean }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '0px' })
    const mv = useMotionValue(0)
    const spring = useSpring(mv, SPRING)
    const display = useTransform(spring, (v) =>
        compact
            ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
            }).format(v)
            : new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            }).format(v)
    )
    useEffect(() => { if (isInView) mv.set(value) }, [isInView, mv, value])
    return <motion.span ref={ref}>{display}</motion.span>
}

function AnimatedPercent({ value }: { value: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '0px' })
    const mv = useMotionValue(0)
    const spring = useSpring(mv, SPRING)
    const display = useTransform(spring, (v) => `${Math.round(v)}%`)
    useEffect(() => { if (isInView) mv.set(value) }, [isInView, mv, value])
    return <motion.span ref={ref}>{display}</motion.span>
}

function InteractiveSlider({
    label,
    value,
    min,
    max,
    step,
    format,
    onChange,
}: {
    label: string
    value: number
    min: number
    max: number
    step: number
    format: (v: number) => string
    onChange: (v: number) => void
}) {
    const pct = ((value - min) / (max - min)) * 100

    return (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 sm:p-4 flex flex-col gap-1 sm:gap-3">
            <div className="flex items-center justify-between">
                <p className="text-[11px] sm:text-sm font-medium text-text-1">{label}</p>
                <p className="text-[11px] sm:text-sm font-semibold text-primary">{format(value)}</p>
            </div>
            <div className="relative flex items-center" style={{ height: 20 }}>
                <div className="absolute inset-x-0 h-0.5 sm:h-1 rounded-full bg-[#E5E7EB]" />
                <div
                    className="absolute left-0 h-0.5 sm:h-1 rounded-full bg-primary"
                    style={{ width: `${pct}%` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="h-3 sm:h-5 absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                    style={{ height: 20 }}
                />
                <div
                    className="absolute w-4 h-4 sm:h-5 sm:w-5 top-1/2 -translate-y-1/2 rounded-full bg-white border-2 sm:border-[3px] border-primary shadow-md pointer-events-none z-20"
                    style={{ left: `calc(${pct}% - ${(pct / 100) * 20}px)` }}
                />
            </div>
        </div>
    )
}

export default function CutCosts() {
    const [avgOrderValue, setAvgOrderValue] = useState(50)
    const [ordersPerDay, setOrdersPerDay] = useState(50)

    const thirdPartyCost = 0.30 * avgOrderValue
    const youSavePerOrder = Math.max(0, thirdPartyCost - MDF_FEE)
    const savingsPerDay = youSavePerOrder * ordersPerDay
    const savingsPerYear = savingsPerDay * 365
    const savingsPct = thirdPartyCost > 0 ? (youSavePerOrder / thirdPartyCost) * 100 : 0

    return (
        <section id="cut-costs" className="min-h-screen sm:min-h-screen flex justify-center items-center w-full px-4 py-10 sm:py-16">
            <div className="mx-auto max-w-7xl rounded-2xl border-2 border-[#E5E7EB] p-3 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-4 items-center">

                    {/* Left */}
                    <div className="flex flex-col gap-5 sm:gap-10 p-3 sm:p-6 rounded-xl">
                        <div className="flex items-center gap-4 sm:gap-8">
                            <div className='border border-[#E5E7EB] rounded-xl p-3 sm:p-5'>
                                <div className="h-6 w-6 sm:h-12 sm:w-12 shrink-0 rounded-full bg-[#2563EB] flex items-center justify-center">
                                    <span className="sm:hidden"><TickDownIcon size={12} stroke='white' /></span>
                                    <span className="hidden sm:flex"><TickDownIcon stroke='white' /></span>
                                </div>
                            </div>
                            <h2 className="text-xl sm:text-3xl md:text-[44px] font-bold text-text-1">Cut Costs</h2>
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-8">
                            {features.map(({ title, description }) => (
                                <div key={title} className="flex gap-3 sm:gap-6">
                                    <div className="mt-0.5 shrink-0 h-fit p-1.5 sm:p-2 rounded-md bg-[#EFF6FF]">
                                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2563EB]" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <p className="text-sm sm:text-xl font-semibold text-text-1 mb-1">{title}</p>
                                        <p className="text-[10px] sm:text-[14px] text-text-2 leading-relaxed">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col gap-3 p-3 sm:p-6 bg-[#FAFAFB] rounded-xl">
                        <InteractiveSlider
                            label="Average Order Value"
                            value={avgOrderValue}
                            min={10}
                            max={200}
                            step={1}
                            format={(v) => `$${v}`}
                            onChange={setAvgOrderValue}
                        />
                        <InteractiveSlider
                            label="Average Orders per Day"
                            value={ordersPerDay}
                            min={1}
                            max={200}
                            step={1}
                            format={(v) => `${v}`}
                            onChange={setOrdersPerDay}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 sm:p-4 flex flex-col gap-1 sm:gap-2">
                                <p className="text-[11px] sm:text-sm font-medium text-text-1">Third-party Apps</p>
                                <p className="text-lg sm:text-[32px] font-medium text-text-1">
                                    <AnimatedCurrency value={thirdPartyCost} />
                                </p>
                                <p className="text-[11px] sm:text-sm text-text-2">30% per order</p>
                            </div>
                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 sm:p-4 flex flex-col gap-1 sm:gap-2">
                                <p className="text-[11px] sm:text-sm font-medium text-text-1">With Us</p>
                                <p className="text-lg sm:text-[32px] font-medium text-text-1">
                                    <AnimatedCurrency value={MDF_FEE} />
                                </p>
                                <p className="text-[7px] sm:text-sm font-medium text-[#3FC060]">Flat Fee Always (As low as $6.49)</p>
                            </div>
                        </div>

                        <motion.div
                            className="rounded-xl bg-primary p-3 sm:p-4 sm:py-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            style={{ transformOrigin: 'center' }}
                        >
                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-0 items-center">
                                {([
                                    { label: 'You Save Per Order', value: youSavePerOrder, decimals: 2 },
                                    { label: 'Savings Per Day', value: savingsPerDay, decimals: 2 },
                                    { label: 'Savings Per Year', value: savingsPerYear, decimals: 0 },
                                ] as const).map(({ label, value, decimals }) => (
                                    <div key={label} className="flex flex-col gap-1 sm:gap-4 py-1 sm:py-2">
                                        <p className="text-[8px] sm:text-xs font-medium text-white leading-tight">{label}</p>
                                        <p className="text-sm sm:text-[28px] font-medium text-white">
                                            <AnimatedCurrency value={value} decimals={decimals} compact />
                                        </p>
                                    </div>
                                ))}
                                <div className="flex flex-col gap-1 bg-[#0E6CE6] rounded-xl py-2 p-2 sm:py-3 items-start xl:items-center justify-center">
                                    <p className="text-[8px] sm:text-xs font-medium text-white">Savings</p>
                                    <p className="text-sm sm:text-[28px] font-medium text-white">
                                        <AnimatedPercent value={savingsPct} />
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <p className="text-xs text-text-2 pl-1 -mt-1">Estimated</p>
                    </div>

                </div>
            </div>
        </section>
    )
}
