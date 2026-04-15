import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-12 sm:pt-16 md:pt-20 lg:pt-28 text-center">

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
        <Button
          className="w-full sm:w-60 h-12 sm:h-15 text-base sm:text-lg px-6"
        >
          Start Free Trial
        </Button>
        <Button
          variant='ghost'
          className="text-text-1 w-full sm:w-60 h-12 sm:h-15 text-base sm:text-lg px-6 border border-[#CBD5E1]"
        >
          How it&apos;s works
        </Button>
      </div>
    </section>
  )
}
