export function ImpactRow({
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
