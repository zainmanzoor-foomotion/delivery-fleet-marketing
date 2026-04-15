'use client'

import { ArrowUp, Check, Plus } from 'lucide-react'
import { Bar, BarChart, Cell, XAxis } from 'recharts'
import {
  ChartContainer,
} from '@/components/ui/chart'
import { TickIcon } from '@/components/icons/tick'

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

export default function BoostSales() {
  return (
    <section className="w-full px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl rounded-2xl border-2 border-[#E5E7EB] p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">

          <div className="flex flex-col gap-5 bg-[#FAFAFB] p-6 rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl space-y-2 border border-[#E5E7EB] bg-white p-6">
                <p className="text-sm font-medium text-text-1">Live Orders</p>
                <p className="text-[32px] font-medium text-text-1">7</p>
                <p className="flex items-center gap-0.5 text-sm font-semibold text-[#3FC060]">
                  <ArrowUp className="h-4 w-4 font-bold" />
                  Updating live
                </p>
              </div>
              <div className="rounded-xl space-y-2 border border-[#E5E7EB] bg-white p-6">
                <p className="text-sm font-medium text-text-1">Revenue this month</p>
                <p className="text-[32px] font-medium text-text-1">$17,327</p>
                <p className="flex items-center gap-0.5 text-sm font-semibold text-[#3FC060]">
                  <Plus className="h-4 w-4 font-bold" />
                  18% vs last month</p>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <p className="text-xl font-medium text-text-1 mb-4">Monthly Orders</p>
              <ChartContainer config={chartConfig} className="w-full" style={{ height: 240 }}>
                <BarChart data={chartData} barSize={70} barCategoryGap="10%">
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fill: '#475569' }}
                  />
                  <Bar
                    dataKey="orders"
                    radius={[20, 20, 0, 0]}
                  >
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

          <div className="flex flex-col gap-12 pl-5">
            <div className="flex items-center gap-8">
              <div className='border border-[#E5E7EB] rounded-xl p-5'>
                <div className="h-12 w-12 shrink-0 rounded-full bg-[#3FC060] flex items-center justify-center">
                  <TickIcon stroke='white' />
                </div>
              </div>
              <h2 className="text-4xl sm:text-[44px] font-bold text-text-1">Boost Sales</h2>
            </div>

            <div className="flex flex-col gap-8">
              {features.map(({ title, description }) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-0.5 shrink-0 h-fit p-2 border border-[#E5E7EB] rounded-md bg-[#F0FDF4]">
                    <Check className="h-4 w-4 text-[#3FC060]" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-text-1 mb-1">{title}</p>
                    <p className="text-md text-text-2 leading-relaxed">{description}</p>
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
