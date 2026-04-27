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

// ── Constants (matching original) ────────────────────────────────────────────
const MDF_DISPATCH = 6.49
const TAX_LOAD = 1.12
const MILEAGE_PER_ORDER = 5 * 0.67 // 5 miles × $0.67 = $3.35
const OVERHEAD_PER_DAY = 10

export default function SavingsCalculator() {
  // Operational basics
  const [avgOrderValue, setAvgOrderValue] = useState(40)
  const [customerDeliveryFee, setCustomerDeliveryFee] = useState(2.99)

  // In-house drivers
  const [inHouseEnabled, setInHouseEnabled] = useState(true)
  const [inHouseOrders, setInHouseOrders] = useState(10)
  const [inHousePayModel, setInHousePayModel] = useState('Hourly Wage')
  // Hourly fields
  const [inHouseWage, setInHouseWage] = useState(10)
  const [inHouseHrs, setInHouseHrs] = useState(10)
  // Hybrid fields (Wage + Fee Share)
  const [inHouseBaseWage, setInHouseBaseWage] = useState(10)
  const [inHouseHybridHours, setInHouseHybridHours] = useState(10)
  const [inHouseFeeShare, setInHouseFeeShare] = useState(2)

  // On-demand
  const [onDemandEnabled, setOnDemandEnabled] = useState(true)
  const [onDemandOrders, setOnDemandOrders] = useState(10)
  const [onDemandDispatch, setOnDemandDispatch] = useState(7.99)

  // 3rd party
  const [thirdPartyEnabled, setThirdPartyEnabled] = useState(true)
  const [thirdPartyOrders, setThirdPartyOrders] = useState(10)
  const [thirdPartyCurrentPct, setThirdPartyCurrentPct] = useState(30)
  const [thirdPartySelfDeliveryPct, setThirdPartySelfDeliveryPct] = useState(15)

  // Growth engines
  const [smartMarketing, setSmartMarketing] = useState(false)
  const [radiusExpansion, setRadiusExpansion] = useState(false)

  // Disclaimer accordion
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  // ── Calculations (corrected to match original HTML logic) ─────────────────

  // --- IN-HOUSE ---
  let ihLabor = 0
  if (inHousePayModel === 'Hourly Wage') {
    ihLabor = inHouseWage * inHouseHrs * TAX_LOAD
  } else {
    // Hybrid: base wage * hours * tax + (orders × fee share per delivery)
    ihLabor =
      inHouseBaseWage * inHouseHybridHours * TAX_LOAD +
      inHouseOrders * inHouseFeeShare
  }
  // Total daily net cost = labor + mileage reimbursement + overhead - customer fees collected
  const ihTotalDailyCost =
    inHouseOrders > 0
      ? ihLabor +
      inHouseOrders * MILEAGE_PER_ORDER +
      OVERHEAD_PER_DAY -
      inHouseOrders * customerDeliveryFee
      : 0

  const ihMDFDailyCost = inHouseOrders * MDF_DISPATCH - inHouseOrders * customerDeliveryFee

  // --- ON-DEMAND ---
  // Net cost per order = dispatch fee minus what customer pays
  const odCPO = onDemandDispatch - customerDeliveryFee
  const odTotalDailyCost = odCPO * onDemandOrders
  const odMDFDailyCost = onDemandOrders * MDF_DISPATCH - onDemandOrders * customerDeliveryFee

  // --- MARKETPLACE (3rd Party) ---
  // Current cost = commission % of AOV per order
  const mpCPO = avgOrderValue * (thirdPartyCurrentPct / 100)
  const mpTotalDailyCost = mpCPO * thirdPartyOrders
  // MDF cost when switching to Self-Delivery = lower commission + MDF dispatch - customer fee
  const mpMDFDailyCost =
    (avgOrderValue * (thirdPartySelfDeliveryPct / 100) + MDF_DISPATCH - customerDeliveryFee) *
    thirdPartyOrders

  // --- AGGREGATE ---
  let curTotalCost = 0
  let mdfTotalCost = 0
  let totalOrders = 0

  if (inHouseEnabled) {
    curTotalCost += ihTotalDailyCost
    mdfTotalCost += ihMDFDailyCost
    totalOrders += inHouseOrders
  }
  if (onDemandEnabled) {
    curTotalCost += odTotalDailyCost
    mdfTotalCost += odMDFDailyCost
    totalOrders += onDemandOrders
  }
  if (thirdPartyEnabled) {
    curTotalCost += mpTotalDailyCost
    mdfTotalCost += mpMDFDailyCost
    totalOrders += thirdPartyOrders
  }

  const currentAvgCPO = totalOrders > 0 ? curTotalCost / totalOrders : 0
  const mdfAvgCPO = totalOrders > 0 ? mdfTotalCost / totalOrders : 0
  const savingCPO = currentAvgCPO - mdfAvgCPO
  const opSavingsDaily = Math.max(0, curTotalCost - mdfTotalCost)

  // --- GROWTH ENGINES (matching original: 25% and 20% of daily revenue) ---
  const dailyRevenue = totalOrders * avgOrderValue
  const marketingRevDaily = smartMarketing ? dailyRevenue * 0.25 : 0
  const radiusRevDaily = radiusExpansion ? dailyRevenue * 0.20 : 0

  const totalDailyProfit = opSavingsDaily + marketingRevDaily + radiusRevDaily
  const totalAnnualProfit = totalDailyProfit * 365

  // Badge "Current:" values (what each channel costs you net per order today)
  const inHouseCurrentCost = inHouseEnabled ? ihTotalDailyCost : 0
  const onDemandCurrentCost = onDemandEnabled ? odTotalDailyCost : 0
  const thirdPartyCurrentCost = thirdPartyEnabled ? mpTotalDailyCost : 0

  return (
    <section id="calculator" className="w-full px-4 py-16 sm:py-18.5">
      {/* Title */}
      <div className="mx-auto max-w-4xl text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-[54px] font-bold text-text-1">
          See Your Savings Potential
        </h2>
        <p className="mt-4 text-base sm:text-xl text-text-2">
          Don&apos;t take our word for it. Run the numbers yourself and see how our flat-rate
          delivery compares to less profitable methods of delivery
        </p>
      </div>

      {/* Calculator card */}
      <motion.div
        className="mx-auto max-w-7xl rounded-[20px] border border-[#E5E7EB] overflow-hidden"
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[##E5E7EB]">

          {/* ── LEFT PANEL ───────────────────────────────────────────────── */}
          <div className="py-6 px-8 flex flex-col gap-5">

            {/* Operational Basics */}
            <div className="rounded-xl py-2">
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
            <div className="rounded-xl py-2">
              <p className="text-base sm:text-lg font-medium text-text-1 mb-4">
                How do you currently deliver your orders?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* ── In-House ── */}
                <div className="border border-[#E5E7EB] rounded-xl p-3 flex flex-col gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-1">In-House Drivers</p>
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
                    <p className="text-sm font-normal mt-1">
                      Current: <span className="text-[#EA332D]">{fmt(inHouseCurrentCost)}</span>
                    </p>
                  </div>

                  {inHouseEnabled && (
                    <div className="flex flex-col gap-3">
                      <NumInput label="Orders/Day" value={inHouseOrders} onChange={setInHouseOrders} className="h-8" />
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-2">Pay Model</label>
                        <Select value={inHousePayModel} onValueChange={setInHousePayModel}>
                          <SelectTrigger className="h-8 w-full rounded-xl text-sm text-text-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hourly Wage">Hourly Wage</SelectItem>
                            <SelectItem value="Hybrid">Wage + Fee Share</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {inHousePayModel === 'Hourly Wage' && (
                        <>
                          <CurrencyInput label="Wage ($/hr)" value={inHouseWage} onChange={setInHouseWage} className="h-8" />
                          <NumInput label="Driver Hrs/Day" value={inHouseHrs} onChange={setInHouseHrs} className="h-8" />
                        </>
                      )}

                      {inHousePayModel === 'Hybrid' && (
                        <>
                          <CurrencyInput label="Base Wage ($)" value={inHouseBaseWage} onChange={setInHouseBaseWage} className="h-8" />
                          <NumInput label="Driver Hrs/Day" value={inHouseHybridHours} onChange={setInHouseHybridHours} className="h-8" />
                          <CurrencyInput label="Fee Share / Delivery" value={inHouseFeeShare} onChange={setInHouseFeeShare} className="h-8" />
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* ── On-Demand + 3rd Party (right column, 2 rows) ── */}
                <div className="flex flex-col gap-3">

                  {/* On-Demand */}
                  <div className="border border-[#E5E7EB] rounded-xl p-3 flex flex-col gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-text-1">On-Demand Service</p>
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
                      <p className="text-sm font-normal mt-1">
                        Current: <span className="text-[#EA332D]">{fmt(onDemandCurrentCost)}</span>
                      </p>
                    </div>

                    {onDemandEnabled && (
                      <div className="flex flex-col gap-3">
                        <NumInput label="Orders/Day" value={onDemandOrders} onChange={setOnDemandOrders} className="h-8" />
                        <CurrencyInput label="Dispatch Fee" value={onDemandDispatch} onChange={setOnDemandDispatch} className="h-8" />
                      </div>
                    )}
                  </div>

                  {/* 3rd Party */}
                  <div className="border border-[#E5E7EB] rounded-xl p-3 flex flex-col gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-text-1">3rd Party Orders</p>
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
                      <p className="text-sm font-normal mt-1">
                        Current: <span className="text-[#EA332D]">{fmt(thirdPartyCurrentCost)}</span>
                      </p>
                      {!thirdPartyEnabled && (
                        <p className="text-xs text-text-2 mt-1">
                          Enable to calculate savings of switching to Self-Delivery.
                        </p>
                      )}
                    </div>

                    {thirdPartyEnabled && (
                      <div className="flex flex-col gap-3">
                        <NumInput label="Orders/Day" value={thirdPartyOrders} onChange={setThirdPartyOrders} className="h-8" />
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <NumInput label="Current %" value={thirdPartyCurrentPct} onChange={setThirdPartyCurrentPct} className="h-8" />
                          </div>
                          <ArrowRight className="mb-2 shrink-0 h-4 w-4 text-primary" />
                          <div className="flex-1">
                            <NumInput label="Self Delivery %" value={thirdPartySelfDeliveryPct} onChange={setThirdPartySelfDeliveryPct} className="h-8" />
                          </div>
                        </div>
                        <p className="text-[10px] text-text-2">
                          *Switching to Self-Delivery typically lowers commission to 10–15%.
                        </p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>

            <div className="border-t border-[##E5E7EB] mb-0" />

            {/* Growth Engines */}
            <div className="rounded-xl py-2">
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
                    'mt-0.5 h-5 w-5 shrink-0 rounded border bg-primary/10 flex items-center justify-center transition-colors',
                    smartMarketing ? 'border-primary' : 'border-[#CBD5E1]',
                  )}>
                    {smartMarketing && (
                      <svg viewBox="0 0 12 10" className="h-2 w-2 text-text-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 5 4.5 8.5 11 1" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm sm:text-[16px] font-medium text-text-1">Smart Marketing</p>
                    <p className="text-sm text-text-2 mt-1">
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
                    'mt-0.5 h-5 w-5 shrink-0 rounded border bg-primary/10 flex items-center justify-center transition-colors',
                    radiusExpansion ? 'border-primary' : 'border-[#CBD5E1]',
                  )}>
                    {radiusExpansion && (
                      <svg viewBox="0 0 12 10" className="h-2 w-2 text-text-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 5 4.5 8.5 11 1" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm sm:text-[16px] font-medium text-text-1">Radius Expansion</p>
                    <p className="text-sm text-text-2 mt-1">
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
              <h3 className="text-base sm:text-lg font-medium text-text-1 mb-3 pt-0">Estimated Results</h3>
              <div className="rounded-xl py-4 px-6 border border-[#E5E7EB] overflow-hidden">
                <ResultRow label="Current Avg Cost / Order" value={fmt(currentAvgCPO)} />
                <ResultRow label="MDF Cost / Order" value={fmt(mdfAvgCPO)} />
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
              {smartMarketing && (
                <ImpactRow
                  label="+ Marketing Revenue"
                  daily={fmt(marketingRevDaily)}
                  annual={fmt(marketingRevDaily * 365)}
                />
              )}
              {radiusExpansion && (
                <ImpactRow
                  label="+ Radius Revenue"
                  daily={fmt(radiusRevDaily)}
                  annual={fmt(radiusRevDaily * 365)}
                />
              )}
              <ImpactRow
                label="Total Profit Increase"
                daily={fmt(totalDailyProfit)}
                annual={fmt(totalAnnualProfit)}
                muted
                divider
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <Button
                variant='ghost'
                className="text-text-1 w-full h-10 sm:h-12 text-base sm:text-md px-6 border border-[#CBD5E1]"
                onClick={() => generatePDF({
                  currentAvgCPO,
                  mdfCPO: mdfAvgCPO,
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
                className="w-full h-10 sm:h-12 text-base sm:text-md px-6"
              >
                Sign up for Free
              </Button>
            </div>

            {/* Assumptions & Disclaimers */}
            <div className="mt-1">
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