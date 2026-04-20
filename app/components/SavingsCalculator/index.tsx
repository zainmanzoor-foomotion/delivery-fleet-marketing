'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { generatePDF } from './components/generatePDF'
import { cn } from '@/lib/utils'
import { CurrencyInput } from './components/CurrencyInput'
import { NumInput } from './components/NumInput'
import { ResultRow } from './components/ResultRow'
import { ImpactRow } from './components/ImpactRow'
import { fmt } from './components/fmt'

export default function SavingsCalculator() {
  // Operational basics
  const [avgOrderValue, setAvgOrderValue] = useState(12)
  const [customerDeliveryFee, setCustomerDeliveryFee] = useState(1)

  // In-house drivers
  const [inHouseEnabled, setInHouseEnabled] = useState(true)
  const [inHouseOrders, setInHouseOrders] = useState(10)
  const [inHousePayModel, setInHousePayModel] = useState('Hourly Wage')
  const [inHouseWage, setInHouseWage] = useState(10)
  const [inHouseHrs, setInHouseHrs] = useState(10)

  // On-demand
  const [onDemandEnabled, setOnDemandEnabled] = useState(true)
  const [onDemandOrders, setOnDemandOrders] = useState(10)
  const [onDemandDispatch, setOnDemandDispatch] = useState(7.99)

  // 3rd party
  const [thirdPartyEnabled, setThirdPartyEnabled] = useState(true)
  const [thirdPartyOrders, setThirdPartyOrders] = useState(10)
  const [thirdPartyCurrentPct, setThirdPartyCurrentPct] = useState(10)
  const [thirdPartySelfDeliveryPct, setThirdPartySelfDeliveryPct] = useState(1)

  // Growth engines
  const [smartMarketing, setSmartMarketing] = useState(false)
  const [radiusExpansion, setRadiusExpansion] = useState(false)

  // Disclaimer accordion
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  // ── Calculations ─────────────────────────────────────────────────────────────
  const inHouseCPO =
    (inHouseWage * inHouseHrs * 1.12 + 10) / Math.max(inHouseOrders, 1) + 0.67 * 5
  const onDemandCPO = onDemandDispatch
  const thirdPartyCPO = avgOrderValue * (thirdPartyCurrentPct / 100)

  const enabledEntries = [
    { enabled: inHouseEnabled, cpo: inHouseCPO, orders: inHouseOrders },
    { enabled: onDemandEnabled, cpo: onDemandCPO, orders: onDemandOrders },
    { enabled: thirdPartyEnabled, cpo: thirdPartyCPO, orders: thirdPartyOrders },
  ].filter((e) => e.enabled)

  const totalOrders = enabledEntries.reduce((s, e) => s + e.orders, 0)
  const totalCost = enabledEntries.reduce((s, e) => s + e.cpo * e.orders, 0)
  const currentAvgCPO = totalOrders > 0 ? totalCost / totalOrders : 0

  const mdfCPO = 2.99 + avgOrderValue * 0.22
  const savingCPO = currentAvgCPO - mdfCPO
  const opSavingsDaily = Math.max(0, savingCPO * totalOrders)

  const marketingRevDaily = smartMarketing ? totalOrders * avgOrderValue * 0.583 : 0
  const radiusRevDaily = radiusExpansion ? totalOrders * avgOrderValue * 0.467 : 0

  const totalDailyProfit = opSavingsDaily + marketingRevDaily + radiusRevDaily
  const totalAnnualProfit = totalDailyProfit * 365

  const inHouseCurrentCost = inHouseEnabled ? inHouseCPO * inHouseOrders : 0
  const onDemandCurrentCost = onDemandEnabled ? onDemandCPO * onDemandOrders : 0
  const thirdPartyCurrentCost = thirdPartyEnabled ? thirdPartyCPO * thirdPartyOrders : 0

  return (
    <section id="calculator" className="w-full px-4 py-16 sm:py-32">
      {/* Title */}
      <div className="mx-auto max-w-4xl text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-[54px] font-bold text-text-1">
          See Your Savings Potential
        </h2>
        <p className="mt-4 text-base sm:text-2xl text-text-2">
          Don&apos;t take our word for it. Run the numbers yourself and see how our flat-rate
          delivery compares to less profitable methods of delivery
        </p>
      </div>

      {/* Calculator card */}
      <motion.div
        className="mx-auto max-w-7xl rounded-[20px] border border-[#E5E7EB] overflow-hidden"
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[##E5E7EB]">

          {/* ── LEFT PANEL ───────────────────────────────────────────────── */}
          <div className="py-6 px-8 flex flex-col gap-5">

            {/* Operational Basics */}
            <div className="rounded-xl py-4">
              <h3 className="text-base sm:text-lg font-medium text-text-1 mb-4">Operational Basics</h3>
              <div className="grid grid-cols-2 gap-4">
                <CurrencyInput
                  label="Average Order Value"
                  value={avgOrderValue}
                  onChange={setAvgOrderValue}
                />
                <CurrencyInput
                  label="Customer Delivery Fee"
                  value={customerDeliveryFee}
                  onChange={setCustomerDeliveryFee}
                />
              </div>
            </div>

            <div className="border-t border-[##E5E7EB] mb-0" />

            {/* Delivery methods */}
            <div className="rounded-xl py-4">
              <p className="text-base sm:text-lg font-medium text-text-1 mb-4">
                How do you currently deliver your orders?
              </p>

              {/* ── In-House ── */}
              <div className="mb-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm sm:text-md font-medium text-text-1">In-House Drivers</p>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={inHouseEnabled}
                      onClick={() => setInHouseEnabled(!inHouseEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${inHouseEnabled ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${inHouseEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <p className="text-sm font-normal">
                    Current: <span className="text-[#EA332D]">{fmt(inHouseCurrentCost)}</span>
                  </p>
                </div>

                {inHouseEnabled && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <NumInput
                      label="Orders/Day"
                      value={inHouseOrders}
                      onChange={setInHouseOrders}
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-text-2">Pay Model</label>
                      <Select value={inHousePayModel} onValueChange={setInHousePayModel}>
                        <SelectTrigger className="h-10 w-full rounded-xl text-sm text-text-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hourly Wage">Hourly Wage</SelectItem>
                          <SelectItem value="Per Delivery">Per Delivery</SelectItem>
                          <SelectItem value="Salary">Salary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <CurrencyInput
                      label="Wage ($/hr)"
                      value={inHouseWage}
                      onChange={setInHouseWage}
                    />
                    <NumInput
                      label="Driver Hrs/Day"
                      value={inHouseHrs}
                      onChange={setInHouseHrs}
                    />
                  </div>
                )}
              </div>

              {/* ── On-Demand ── */}
              <div className="mb-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm sm:text-md font-medium text-text-1">Current On-Demand Service</p>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={onDemandEnabled}
                      onClick={() => setOnDemandEnabled(!onDemandEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${onDemandEnabled ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${onDemandEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <p className="text-sm font-normal">
                    Current: <span className="text-[#EA332D]">{fmt(onDemandCurrentCost)}</span>
                  </p>
                </div>

                {onDemandEnabled && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <NumInput
                      label="Orders/Day"
                      value={onDemandOrders}
                      onChange={setOnDemandOrders}
                    />
                    <CurrencyInput
                      label="Dispatch Fee"
                      value={onDemandDispatch}
                      onChange={setOnDemandDispatch}
                    />
                  </div>
                )}
              </div>

              {/* ── 3rd Party ── */}
              <div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm sm:text-md font-medium text-text-1">3rd Party Orders</p>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={thirdPartyEnabled}
                      onClick={() => setThirdPartyEnabled(!thirdPartyEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${thirdPartyEnabled ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${thirdPartyEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className='flex justify-between mt-1 items-center'>
                    <p className="text-sm font-normal">
                      Current: <span className="text-[#EA332D]">{fmt(thirdPartyCurrentCost)}</span>
                    </p>
                    {!thirdPartyEnabled &&
                      <p className="text-xs text-text-2">
                        Enable to calculate savings of switching to Self-Delivery.
                      </p>}
                  </div>
                </div>

                {thirdPartyEnabled && (
                  <div className="mt-3 space-y-3">
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <NumInput
                          label="Orders/Day"
                          value={thirdPartyOrders}
                          onChange={setThirdPartyOrders}
                        />
                      </div>
                      <div className="flex-1 flex items-end gap-2">
                        <div className="flex-1">
                          <NumInput
                            label="Current %"
                            value={thirdPartyCurrentPct}
                            onChange={setThirdPartyCurrentPct}
                          />
                        </div>
                        <ArrowRight className="mb-2.5 shrink-0 h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <NumInput
                            label="Self Delivery %"
                            value={thirdPartySelfDeliveryPct}
                            onChange={setThirdPartySelfDeliveryPct}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-text-2 text-right">
                      *Switching to Self-Delivery typically lowers commission to 10–15%.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[##E5E7EB] mb-0" />

            {/* Growth Engines */}
            <div className="rounded-xl py-4">
              <h3 className="text-base sm:text-lg font-medium text-text-1 mb-4">Activate Growth Engines</h3>
              <div className="flex flex-col md:flex-row gap-3">

                {/* Smart Marketing */}
                <label className="flex cursor-pointer gap-3 rounded-lg border border-[##E5E7EB] bg-white p-3 hover:border-primary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={smartMarketing}
                    onChange={(e) => setSmartMarketing(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={cn(
                    'mt-0.5 h-5 w-5 shrink-0 rounded border-2 bg-white flex items-center justify-center transition-colors',
                    smartMarketing ? 'border-primary' : 'border-[#CBD5E1]',
                  )}>
                    {smartMarketing && (
                      <svg viewBox="0 0 12 10" className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 5 4.5 8.5 11 1" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm sm:text-md font-medium text-text-1">Smart Marketing</p>
                    <p className="text-sm text-text-2 mt-0.5">
                      Engage customers on the live tracking page to drive repeat orders.
                    </p>
                  </div>
                </label>

                {/* Radius Expansion */}
                <label className="flex cursor-pointer gap-3 rounded-lg border border-[##E5E7EB] bg-white p-3 hover:border-primary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={radiusExpansion}
                    onChange={(e) => setRadiusExpansion(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={cn(
                    'mt-0.5 h-5 w-5 shrink-0 rounded border-2 bg-white flex items-center justify-center transition-colors',
                    radiusExpansion ? 'border-primary' : 'border-[#CBD5E1]',
                  )}>
                    {radiusExpansion && (
                      <svg viewBox="0 0 12 10" className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 5 4.5 8.5 11 1" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm sm:text-md font-medium text-text-1">Radius Expansion</p>
                    <p className="text-sm text-text-2 mt-0.5">
                      Leverage on-demand drivers to deliver farther and reach new zip codes.
                    </p>
                  </div>
                </label>

              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ──────────────────────────────────────────────── */}
          <div className="p-6 flex flex-col gap-5">

            {/* Estimated Results */}
            <div>
              <h3 className="text-base sm:text-lg font-medium text-text-1 mb-3 pt-4">Estimated Results</h3>
              <div className="rounded-xl py-4 px-6 border border-[#E5E7EB] overflow-hidden">
                <ResultRow label="Current Avg Cost / Order" value={fmt(currentAvgCPO)} />
                <ResultRow label="MDF Cost / Order" value={fmt(mdfCPO)} />
                <ResultRow
                  label="Saving / Order"
                  value={fmt(savingCPO)}
                  bold
                  colored={savingCPO < 0}
                />
              </div>
            </div>

            {/* Impact Summary */}
            <div className="rounded-xl border px-6 border-[#E5E7EB] overflow-hidden bg-[#F8FAFC]">
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 py-4 pt-6 border-b border-[#E5E7EB]">
                <span className="text-[10px] font-semibold uppercase text-[#64748B]">
                  Impact Summary
                </span>
                <span className="text-[10px] font-semibold uppercase text-[#64748B] text-right">
                  Daily
                </span>
                <span className="text-[10px] font-semibold uppercase text-[#64748B] text-right">
                  Annual
                </span>
              </div>

              <ImpactRow
                label="Operational Savings"
                daily={fmt(opSavingsDaily)}
                annual={fmt(opSavingsDaily * 365)}
              />
              <ImpactRow
                label="+ Marketing Revenue"
                daily={fmt(marketingRevDaily)}
                annual={fmt(marketingRevDaily * 365)}
              />
              <ImpactRow
                label="+ Radius Revenue"
                daily={fmt(radiusRevDaily)}
                annual={fmt(radiusRevDaily * 365)}
              />
              <ImpactRow
                label="Total Profit Increase"
                daily={fmt(totalDailyProfit)}
                annual={fmt(totalAnnualProfit)}
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <Button
                variant='ghost'
                className="text-text-1 w-full h-12 sm:h-15 text-base sm:text-lg px-6 border border-[#CBD5E1]"
                onClick={() => generatePDF({
                  currentAvgCPO,
                  mdfCPO,
                  savingCPO,
                  opSavingsDaily,
                  marketingRevDaily,
                  radiusRevDaily,
                  totalDailyProfit,
                  totalAnnualProfit,
                })}
              >
                Download PDF Report
              </Button>

              <Button
                className="w-full h-12 sm:h-15 text-base sm:text-lg px-6"
              >
                Sign up for Free
              </Button>
            </div>

            {/* Assumptions & Disclaimers */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setShowDisclaimer((v) => !v)}
                className="flex w-full items-center justify-start gap-2 py-3 text-md font-regular text-text-1"
              >
                <motion.span
                  animate={{ rotate: showDisclaimer ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <ChevronDown className="h-4 w-4 text-text-2" />
                </motion.span>
                <span>Assumptions &amp; Disclaimers</span>
              </button>

              <motion.div
                initial={false}
                animate={showDisclaimer
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <ul className="list-disc list-outside pl-5 space-y-1 pt-1 pb-2">
                  {[
                    'Calculations assume a 5-driveable-mile delivery radius.',
                    'In-House costs include 12% payroll tax, $0.67/mi reimbursement, and $10/day overhead.',
                    'Commission Swap: Projected savings based on switching from Full Commission to Self-Delivery (typically 10–15%).',
                    'Credit Card Processing fees (approx 2.5–3%) are not included.',
                    'Liability: Results are directional estimates only.',
                  ].map((item) => (
                    <li key={item} className="text-sm text-text-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
