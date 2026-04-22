'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function CurrencyInput({
  label,
  value,
  onChange,
  className,
}: {
  label: string
  value: number
  onChange: (dollars: number) => void
  className?: string
}) {
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
        className={cn('h-10 text-sm text-text-1 rounded-xl', className)}
      />
    </div>
  )
}
