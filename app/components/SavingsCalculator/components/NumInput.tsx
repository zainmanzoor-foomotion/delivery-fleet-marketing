import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function NumInput({
  label,
  value,
  onChange,
  step = 1,
  min = 0,
  className,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
  className?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs sm:text-sm font-medium text-text-2">{label}</label>
      <Input
        type="number"
        value={value}
        step={step}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn('h-10 text-xs sm:text-sm text-text-1 rounded-xl', className)}
      />
    </div>
  )
}
