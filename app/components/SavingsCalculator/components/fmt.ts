export const fmt = (n: number, forceSign = false) => {
  const abs = Math.abs(n)
  const s =
    abs >= 1000
      ? `$${abs.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      : `$${abs.toFixed(2)}`
  if (n < 0) return `-${s}`
  if (forceSign && n > 0) return `+${s}`
  return s
}
