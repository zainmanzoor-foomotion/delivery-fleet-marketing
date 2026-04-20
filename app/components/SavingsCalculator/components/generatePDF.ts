import jsPDF from 'jspdf'

interface PDFData {
  currentAvgCPO: number
  mdfCPO: number
  savingCPO: number
  opSavingsDaily: number
  marketingRevDaily: number
  radiusRevDaily: number
  totalDailyProfit: number
  totalAnnualProfit: number
}

function currency(val: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val)
}

export function generatePDF(data: PDFData) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  const blue = [24, 119, 242] as const
  const gray = [100, 116, 139] as const
  const dark = [15, 23, 42] as const
  const border = [226, 232, 240] as const
  const bg = [248, 250, 252] as const

  let y = 48

  // ── Logo / Brand ──────────────────────────────────────────────────────────
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...blue)
  doc.text('My Delivery Fleet', 40, y)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...gray)
  doc.text('Savings Report  ·  mydeliveryfleet.com', 40, y + 16)

  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  doc.text(date, W - 40, y + 16, { align: 'right' })

  y += 40

  // Divider
  doc.setDrawColor(...border)
  doc.setLineWidth(0.5)
  doc.line(40, y, W - 40, y)
  y += 28

  // ── Estimated Results ─────────────────────────────────────────────────────
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...dark)
  doc.text('Estimated Results', 40, y)
  y += 16

  // Card background
  const cardX = 40
  const cardW = W - 80
  const cardH = 90
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(...border)
  doc.setLineWidth(0.5)
  doc.roundedRect(cardX, y, cardW, cardH, 8, 8, 'FD')

  const rowH = cardH / 3
  const labelX = cardX + 20
  const valX = cardX + cardW - 20

  const resultRows = [
    { label: 'Current Avg Cost / Order', value: currency(data.currentAvgCPO), bold: false },
    { label: 'MDF Cost / Order', value: currency(data.mdfCPO), bold: false },
    { label: 'Saving / Order', value: currency(data.savingCPO), bold: true },
  ]

  resultRows.forEach((row, i) => {
    const ry = y + rowH * i + rowH / 2 + 4

    // Row divider (not first)
    if (i > 0) {
      doc.setDrawColor(...border)
      doc.line(cardX + 12, y + rowH * i, cardX + cardW - 12, y + rowH * i)
    }

    doc.setFontSize(10)
    doc.setFont('helvetica', row.bold ? 'bold' : 'normal')
    doc.setTextColor(...dark)
    doc.text(row.label, labelX, ry)

    doc.setFont('helvetica', row.bold ? 'bold' : 'normal')
    doc.setTextColor(row.bold && data.savingCPO < 0 ? 234 : dark[0], row.bold && data.savingCPO < 0 ? 51 : dark[1], row.bold && data.savingCPO < 0 ? 45 : dark[2])
    doc.text(row.value, valX, ry, { align: 'right' })
  })

  y += cardH + 24

  // ── Impact Summary ────────────────────────────────────────────────────────
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...dark)
  doc.text('Impact Summary', 40, y)
  y += 16

  const impactCardH = 180
  doc.setFillColor(...bg)
  doc.setDrawColor(...border)
  doc.setLineWidth(0.5)
  doc.roundedRect(cardX, y, cardW, impactCardH, 8, 8, 'FD')

  const col1X = cardX + 20
  const col2X = cardX + cardW * 0.62
  const col3X = cardX + cardW - 20

  // Header row
  const headerY = y + 22
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...gray)
  doc.text('IMPACT SUMMARY', col1X, headerY)
  doc.text('DAILY', col2X, headerY, { align: 'right' })
  doc.text('ANNUAL', col3X, headerY, { align: 'right' })

  // Header divider
  doc.setDrawColor(...border)
  doc.line(cardX + 12, y + 32, cardX + cardW - 12, y + 32)

  const impactRows = [
    { label: 'Operational Savings', daily: data.opSavingsDaily, annual: data.opSavingsDaily * 365, bold: false },
    { label: '+ Marketing Revenue', daily: data.marketingRevDaily, annual: data.marketingRevDaily * 365, bold: false },
    { label: '+ Radius Revenue', daily: data.radiusRevDaily, annual: data.radiusRevDaily * 365, bold: false },
    { label: 'Total Profit Increase', daily: data.totalDailyProfit, annual: data.totalAnnualProfit, bold: true },
  ]

  const impRowH = (impactCardH - 36) / 4

  impactRows.forEach((row, i) => {
    const ry = y + 36 + impRowH * i + impRowH / 2 + 4

    if (i > 0) {
      doc.setDrawColor(...border)
      doc.line(cardX + 12, y + 36 + impRowH * i, cardX + cardW - 12, y + 36 + impRowH * i)
    }

    doc.setFontSize(10)
    doc.setFont('helvetica', row.bold ? 'bold' : 'normal')
    doc.setTextColor(...dark)
    doc.text(row.label, col1X, ry)

    doc.setTextColor(row.bold ? blue[0] : dark[0], row.bold ? blue[1] : dark[1], row.bold ? blue[2] : dark[2])
    doc.text(currency(row.daily), col2X, ry, { align: 'right' })
    doc.text(currency(row.annual), col3X, ry, { align: 'right' })
  })

  y += impactCardH + 32

  // ── Footer ────────────────────────────────────────────────────────────────
  doc.setDrawColor(...border)
  doc.line(40, y, W - 40, y)
  y += 14
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...gray)

  doc.save('MDF-Savings-Report.pdf')
}
