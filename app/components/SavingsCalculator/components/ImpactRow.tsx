export function ImpactRow({
  label,
  daily,
  annual,
  muted = false,
  divider = false,
}: {
  label: string
  daily: string
  annual: string
  muted?: boolean
  divider?: boolean
}) {
  return (
    <>
      {divider && <div className="border-t border-[#E5E7EB]" />}
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-0 py-3.5">
        <span className={`text-xs sm:text-md font-medium ${muted ? 'text-text-1' : 'text-text-2'}`}>{label}</span>
        <span className="text-xs sm:text-md font-normal text-right text-text-1">{daily}</span>
        <span className="text-xs sm:text-md font-medium text-right text-text-1">{annual}</span>
      </div>
    </>
  )
}
