'use client'

import { Check } from 'lucide-react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { TickDownIcon } from '@/components/icons/tickDown'

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

function AnimatedCurrency({ value, decimals = 2 }: { value: number; decimals?: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '0px' })
    const mv = useMotionValue(0)
    const spring = useSpring(mv, SPRING)
    const display = useTransform(spring, (v) =>
        new Intl.NumberFormat('en-US', {
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

function RangeSlider({ label, pct: targetPct }: { label: string; pct: number }) {
    const thumbSize = 20
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '0px' })
    const mv = useMotionValue(0)
    const spring = useSpring(mv, SPRING)
    const fillWidth = useTransform(spring, (v) => `${v}%`)
    const thumbLeft = useTransform(spring, (v) => `calc(${v}% - ${(v / 100) * thumbSize}px)`)

    useEffect(() => { if (isInView) mv.set(targetPct) }, [isInView, mv, targetPct])

    return (
        <div ref={ref} className="rounded-xl border border-[#E5E7EB] bg-white p-3 sm:p-4 flex flex-col gap-3">
            <p className="text-xs sm:text-sm font-medium text-text-1">{label}</p>
            <div className="relative flex items-center" style={{ height: thumbSize }}>
                <div className="absolute inset-x-0 h-1.5 rounded-full bg-[#E5E7EB]" />
                <motion.div
                    className="absolute left-0 h-1.5 rounded-full bg-primary"
                    style={{ width: fillWidth }}
                />
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white border-3 border-primary shadow-md pointer-events-none z-10"
                    style={{ width: thumbSize, height: thumbSize, left: thumbLeft }}
                />
            </div>
        </div>
    )
}

export default function CutCosts() {
    return (
        <section className="w-full px-4 py-10 sm:py-16">
            <div className="mx-auto max-w-7xl rounded-2xl border-2 border-[#E5E7EB] p-3 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">

                    {/* Left */}
                    <div className="flex flex-col gap-5 sm:gap-10 p-3 sm:p-6 rounded-xl">
                        <div className="flex items-center gap-4 sm:gap-8">
                            <div className='border border-[#E5E7EB] rounded-xl p-3 sm:p-5'>
                                <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-full bg-[#2563EB] flex items-center justify-center">
                                    <TickDownIcon stroke='white' />
                                </div>
                            </div>
                            <h2 className="text-3xl sm:text-[44px] font-bold text-text-1">Cut Costs</h2>
                        </div>

                        <div className="flex flex-col gap-5 sm:gap-8">
                            {features.map(({ title, description }) => (
                                <div key={title} className="flex gap-3 sm:gap-6">
                                    <div className="mt-0.5 shrink-0 h-fit p-1.5 sm:p-2 border border-[#E5E7EB] rounded-md bg-[#EFF6FF]">
                                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2563EB]" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <p className="text-base sm:text-2xl font-semibold text-text-1 mb-1">{title}</p>
                                        <p className="text-xs sm:text-[16px] text-text-2 leading-relaxed">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col gap-3 p-3 sm:p-6 bg-[#FAFAFB] rounded-xl">
                        <RangeSlider label="Average Order Value" pct={28} />
                        <RangeSlider label="Average Orders per Day" pct={15} />

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 sm:p-4 flex flex-col gap-1 sm:gap-2">
                                <p className="text-cm font-medium text-text-1">Third-party Apps</p>
                                <p className="text-xl sm:text-[32px] font-bold text-text-1">
                                    <AnimatedCurrency value={15} />
                                </p>
                                <p className="text-sm text-text-2">30% per order</p>
                            </div>
                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 sm:p-4 flex flex-col gap-1 sm:gap-2">
                                <p className="text-sm font-medium text-text-1">With Us</p>
                                <p className="text-xl sm:text-[32px] font-bold text-text-1">
                                    <AnimatedCurrency value={6.49} />
                                </p>
                                <p className="text-sm font-medium text-[#3FC060]">Flat Fee Always (As low as $6.49)</p>
                            </div>
                        </div>

                        <motion.div
                            className="rounded-xl bg-primary p-3 sm:p-4"
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.75 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            style={{ transformOrigin: 'center' }}
                        >
                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 items-center">
                                {([
                                    { label: 'You Save Per Order', value: 8.51, decimals: 2 },
                                    { label: 'Savings Per Day', value: 42.55, decimals: 2 },
                                    { label: 'Savings Per Year', value: 15531, decimals: 0 },
                                ] as const).map(({ label, value, decimals }) => (
                                    <div key={label} className="flex flex-col gap-1 py-1 sm:py-2">
                                        <p className="text-[9px] sm:text-xs font-medium text-white leading-tight">{label}</p>
                                        <p className="text-base sm:text-[28px] font-medium text-white">
                                            <AnimatedCurrency value={value} decimals={decimals} />
                                        </p>
                                    </div>
                                ))}
                                <div className="flex flex-col gap-1 bg-[#0E6CE6] rounded-xl p-2 py-3 items-start xl:items-center justify-center">
                                    <p className="text-[9px] sm:text-xs font-medium text-white">Savings</p>
                                    <p className="text-xl sm:text-[28px] font-medium text-white">
                                        <AnimatedPercent value={57} />
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
