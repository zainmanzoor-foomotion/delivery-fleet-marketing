import { cn } from '@/lib/utils'

export function ResultRow({
  label,
  value,
  bold,
}: {
  label: string
  value: string
  bold?: boolean
  colored?: boolean
}) {
  return (
    <div className={cn(
      'flex items-center justify-between py-3.5',
      bold && 'border-t border-[#E5E7EB]',
    )}>
      <span className={cn(
        'text-xs sm:text-sm text-text-2',
        bold && 'font-normal text-text-1',
      )}>
        {label}
      </span>
      <span className={cn(
        'text-xs sm:text-sm',
        bold ? 'font-normal text-text-1' : 'font-normal text-text-1',
      )}>
        {value}
      </span>
    </div>
  )
}
