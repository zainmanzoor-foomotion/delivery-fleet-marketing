'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronDown, ChevronUp, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Currency input — cents-building logic (same as reference HTML) ─────────────
// Digits shift the value left (×10 + digit); backspace shifts right (÷10).
// Value is stored/exposed in dollars (float); internally we work in cents.
function CurrencyInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (dollars: number) => void
}) {
  // Convert incoming dollar value to cents for internal state
  const [cents, setCents] = useState(() => Math.round(value * 100))
  const [focused, setFocused] = useState(false)

  const updateCents = (next: number) => {
    setCents(next)
    onChange(next / 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.key >= '0' && e.key <= '9') {
      updateCents(cents * 10 + Number(e.key))
    } else if (e.key === 'Backspace') {
      updateCents(Math.floor(cents / 10))
    } else if (e.key === 'Delete') {
      updateCents(0)
    }
  }

  const displayed = focused
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
    : `$${(cents / 100).toFixed(2)}`

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-text-2">{label}</label>
      <Input
        readOnly
        value={displayed}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        className="h-10 text-sm text-text-1 rounded-xl"
      />
    </div>
  )
}

// ── Plain number input (shadcn Input, no currency) ─────────────────────────────
function NumInput({
  label,
  value,
  onChange,
  step = 1,
  min = 0,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-text-2">{label}</label>
      <Input
        type="number"
        value={value}
        step={step}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-10 text-sm text-text-1 rounded-xl"
      />
    </div>
  )
}

// ── Counter input (shadcn Input + – / + buttons) ───────────────────────────────
function CounterInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-text-2">{label}</label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex h-10 w-9 shrink-0 items-center justify-center rounded-l-md border border-r-0 border-input  text-[#475569] hover:bg-[#F1F5F9] transition-colors text-lg leading-none"
        >
          –
        </button>
        <Input
          type="number"
          value={value}
          min={0}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="h-10 w-16 rounded-none text-center text-sm text-text-1"
        />
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-10 w-9 shrink-0 items-center justify-center rounded-r-md border border-l-0 border-input  text-[#475569] hover:bg-[#F1F5F9] transition-colors text-lg leading-none"
        >
          +
        </button>
      </div>
    </div>
  )
}

// ── Result row ─────────────────────────────────────────────────────────────────
function ResultRow({
  label,
  value,
  bold,
  colored,
}: {
  label: string
  value: string
  bold?: boolean
  colored?: boolean
}) {
  return (
    <div className={cn(
      'flex items-center justify-between px-4 py-3.5',
      bold && 'border-t border-[#E5E7EB]',
    )}>
      <span className={cn(
        'text-md text-text-2',
        bold && 'font-normal text-text-1',
      )}>
        {label}
      </span>
      <span className={cn(
        'text-md',
        bold ? 'font-normal text-text-1' : 'font-normal text-text-1',
      )}>
        {value}
      </span>
    </div>
  )
}

// ── Impact row ─────────────────────────────────────────────────────────────────
function ImpactRow({
  label,
  daily,
  annual,
}: {
  label: string
  daily: string
  annual: string
}) {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-0 py-3.5">
      <span className="text-md font-medium text-text-2">{label}</span>
      <span className="text-md font-medium text-right text-text-1">{daily}</span>
      <span className="text-md font-medium text-right text-text-1">{annual}</span>
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = (n: number, forceSign = false) => {
  const abs = Math.abs(n)
  const s =
    abs >= 1000
      ? `$${abs.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      : `$${abs.toFixed(2)}`
  if (n < 0) return `-${s}`
  if (forceSign && n > 0) return `+${s}`
  return s
}

// ── Main component ─────────────────────────────────────────────────────────────
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
  const [smartMarketing, setSmartMarketing] = useState(true)
  const [radiusExpansion, setRadiusExpansion] = useState(true)

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

  // MDF: base platform fee + small percentage
  const mdfCPO = 2.99 + avgOrderValue * 0.22

  const savingCPO = currentAvgCPO - mdfCPO

  // Operational savings only when MDF is cheaper
  const opSavingsDaily = Math.max(0, savingCPO * totalOrders)

  // Revenue from growth engines
  const marketingRevDaily = smartMarketing ? totalOrders * avgOrderValue * 0.583 : 0
  const radiusRevDaily = radiusExpansion ? totalOrders * avgOrderValue * 0.467 : 0

  const totalDailyProfit = opSavingsDaily + marketingRevDaily + radiusRevDaily
  const totalAnnualProfit = totalDailyProfit * 365

  // Current cost for each method label
  const inHouseCurrentCost = inHouseEnabled ? inHouseCPO * inHouseOrders : 0
  const onDemandCurrentCost = onDemandEnabled ? onDemandCPO * onDemandOrders : 0
  const thirdPartyCurrentCost = thirdPartyEnabled ? thirdPartyCPO * thirdPartyOrders : 0

  return (
    <section id="calculator" className="w-full px-4 py-16 sm:py-20">
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
      <div className="mx-auto max-w-7xl rounded-[20px] border border-[#E5E7EB] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[##E5E7EB]">

          {/* ── LEFT PANEL ───────────────────────────────────────────────── */}
          <div className="p-6 flex flex-col gap-5">

            {/* Operational Basics */}
            <div className="rounded-xl  px-5 py-4">
              <h3 className="text-lg font-medium text-text-1 mb-4">Operational Basics</h3>
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
            <div className="rounded-xl  px-5 py-4">
              <p className="text-lg font-medium text-text-1 mb-4">
                How do you currently deliver your orders?
              </p>

              {/* ── In-House ── */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-md font-medium text-text-1">In-House Drivers</p>
                    <p className="text-sm font-normal">
                      Current: <span className="text-[#EA332D]">{fmt(inHouseCurrentCost)}</span>
                    </p>
                  </div>
                  <Switch checked={inHouseEnabled} onCheckedChange={setInHouseEnabled} />
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
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-md font-medium text-text-1">Current On-Demand Service</p>
                    <p className="text-sm font-normal">
                      Current: <span className="text-[#EA332D]">{fmt(onDemandCurrentCost)}</span>
                    </p>
                  </div>
                  <Switch checked={onDemandEnabled} onCheckedChange={setOnDemandEnabled} />
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
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-md font-medium text-text-1">3rd Party Orders</p>
                    <p className="text-sm font-normal">
                      Current: <span className="text-[#EA332D]">{fmt(thirdPartyCurrentCost)}</span>
                    </p>
                  </div>
                  <Switch checked={thirdPartyEnabled} onCheckedChange={setThirdPartyEnabled} />
                </div>

                {thirdPartyEnabled && (
                  <div className="mt-3 space-y-3">
                    <p className="text-xs text-[#475569]">
                      Enable to calculate savings of switching to Self-Delivery.
                    </p>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <NumInput
                          label="Orders/Day"
                          value={thirdPartyOrders}
                          onChange={setThirdPartyOrders}
                        />
                      </div>
                      <div className="flex-1">
                        <NumInput
                          label="Current %"
                          value={thirdPartyCurrentPct}
                          onChange={setThirdPartyCurrentPct}
                        />
                      </div>
                      <span className="mb-2.5 text-[#475569] text-sm shrink-0">→</span>
                      <div className="flex-1">
                        <CounterInput
                          label="Self Delivery %"
                          value={thirdPartySelfDeliveryPct}
                          onChange={setThirdPartySelfDeliveryPct}
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-text-2 italic text-right">
                      *Switching to Self-Delivery typically lowers commission to 10–15%.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[##E5E7EB] mb-0" />


            {/* Growth Engines */}
            <div className="rounded-xl  px-5 py-4">
              <h3 className="text-lg font-medium text-text-1 mb-4">Activate Growth Engines</h3>
              <div className="grid grid-cols-2 gap-3">

                {/* Smart Marketing */}
                <label className="flex cursor-pointer gap-3 rounded-lg border border-[##E5E7EB] bg-white p-3 hover:border-[#1877F2]/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={smartMarketing}
                    onChange={(e) => setSmartMarketing(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded accent-[#1877F2] cursor-pointer"
                  />
                  <div>
                    <p className="text-md font-medium text-text-1">Smart Marketing</p>
                    <p className="text-sm text-text-2 mt-0.5">
                      Engage customers on the live tracking page to drive repeat orders.
                    </p>
                  </div>
                </label>

                {/* Radius Expansion */}
                <label className="flex cursor-pointer gap-3 rounded-lg border border-[##E5E7EB] bg-white p-3 hover:border-[#1877F2]/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={radiusExpansion}
                    onChange={(e) => setRadiusExpansion(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded accent-[#1877F2] cursor-pointer"
                  />
                  <div>
                    <p className="text-lg font-medium text-text-1">Radius Expansion</p>
                    <p className="text-sm text-text-2  mt-0.5">
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
              <h3 className="text-lg font-medium text-text-1 mb-3 pt-4">Estimated Results</h3>
              <div className="rounded-xl p-4 border border-[#E5E7EB] overflow-hidden">
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
            <div className="rounded-xl border px-10 border-[#E5E7EB] overflow-hidden bg-[#F8FAFC]">
              {/* Header */}
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 py-4 pt-6 border-b border-[#E5E7EB]">
                <span className="text-[10px] font-semibold uppercase  text-[#64748B]">
                  Impact Summary
                </span>
                <span className="text-[10px] font-semibold uppercase  text-[#64748B] text-right">
                  Daily
                </span>
                <span className="text-[10px] font-semibold uppercase  text-[#64748B] text-right">
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
                className="w-full h-12 sm:h-15 text-base sm:text-lg px-6"
              >
                Download PDF Report
              </Button>

              <Button
                variant='ghost'
                className="text-text-1 w-full h-12 sm:h-15 text-base sm:text-lg px-6 border border-[#CBD5E1]"
              >
                Sign up for Free
              </Button>
            </div>

            {/* Assumptions & Disclaimers */}
            <div className="mt-8">

              <button
                type="button"
                onClick={() => setShowDisclaimer((v) => !v)}
                className="flex w-full items-center justify-start gap-2 px-4 py-3 text-md font-regular text-text-1"
              >
                {showDisclaimer ? (
                  <ChevronUp className="h-4 w-4 text-[#475569]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#475569]" />
                )}
                <span>Assumptions &amp; Disclaimers</span>

              </button>

              {showDisclaimer && (
                <ul className="px-4 pb-4 space-y-2 pt-3">
                  {[
                    'Calculations assume a 5-driveable-mile delivery radius.',
                    'In-House costs include 12% payroll tax, $0.67/mi reimbursement, and $10/day overhead.',
                    'Commission Swap: Projected savings based on switching from Full Commission to Self-Delivery (typically 10–15%).',
                    'Credit Card Processing fees (approx 2.5–3%) are not included.',
                    'Liability: Results are directional estimates only.',
                  ].map((item) => (
                    <li key={item} className="text-sm text-text-2 flex gap-2">
                      <span className="shrink-0 text-text-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
