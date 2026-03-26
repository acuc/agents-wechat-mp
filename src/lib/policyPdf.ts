import { jsPDF } from 'jspdf'
import { currencyBeforeAmount } from './currencySymbol'
import type { InsurancePolicy } from '../types/domain'

const MARGIN = 20
const LINE_HEIGHT = 6
const SECTION_GAP = 10

function formatAmount(amount: number): string {
  return amount.toLocaleString('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function loadLogoAsDataUrl(logoUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      } catch (e) {
        reject(e)
      }
    }
    img.onerror = () => reject(new Error('Failed to load logo'))
    img.src = logoUrl
  })
}

export async function generatePolicyPdf(
  policy: InsurancePolicy,
  logoUrl: string
): Promise<Blob> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  let y = MARGIN

  try {
    const logoData = await loadLogoAsDataUrl(logoUrl)
    const logoHeight = 12
    const logoWidth = 45
    doc.addImage(logoData, 'PNG', MARGIN, y, logoWidth, logoHeight)
    y += logoHeight + SECTION_GAP
  } catch {
    doc.setFontSize(14)
    doc.text('Flywire', MARGIN, y + 4)
    y += 14 + SECTION_GAP
  }

  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Insurance policy certificate', MARGIN, y)
  y += LINE_HEIGHT + 4

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text(
    `${policy.status} · ${currencyBeforeAmount(policy.currency)}${formatAmount(policy.amount)}`,
    MARGIN,
    y
  )
  y += LINE_HEIGHT
  doc.text(policy.provider, MARGIN, y)
  y += LINE_HEIGHT + SECTION_GAP
  doc.setTextColor(0, 0, 0)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Policy details', MARGIN, y)
  y += LINE_HEIGHT + 2
  doc.setFont('helvetica', 'normal')

  const details: Array<[string, string]> = [
    ['Reference', policy.reference],
    ['Student name', policy.studentName],
    ['Student email', policy.studentEmail],
    ['Provider', policy.provider],
    ['Amount', `${currencyBeforeAmount(policy.currency)}${formatAmount(policy.amount)}`],
    ['Start date', policy.startDate],
    ['End date', policy.endDate],
    ['Requested on', policy.requestedOn],
    ['Agent name', policy.agentName],
    ['Agent email', policy.agentEmail],
  ]
  if (policy.extensionLink) {
    details.push(['Extension link', policy.extensionLink])
  }
  if (policy.cancellationLink) {
    details.push(['Cancellation link', policy.cancellationLink])
  }

  for (const [label, value] of details) {
    doc.setTextColor(100, 100, 100)
    doc.text(`${label}:`, MARGIN, y)
    doc.setTextColor(0, 0, 0)
    doc.text(value, MARGIN + 45, y)
    y += LINE_HEIGHT
  }

  return doc.output('blob')
}

export async function generatePolicyReceiptPdf(
  policy: InsurancePolicy,
  logoUrl: string
): Promise<Blob> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  let y = MARGIN

  try {
    const logoData = await loadLogoAsDataUrl(logoUrl)
    const logoHeight = 12
    const logoWidth = 45
    doc.addImage(logoData, 'PNG', MARGIN, y, logoWidth, logoHeight)
    y += logoHeight + SECTION_GAP
  } catch {
    doc.setFontSize(14)
    doc.text('Flywire', MARGIN, y + 4)
    y += 14 + SECTION_GAP
  }

  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Premium receipt', MARGIN, y)
  y += LINE_HEIGHT + 4

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text(
    `${currencyBeforeAmount(policy.currency)}${formatAmount(policy.amount)} · ${policy.reference}`,
    MARGIN,
    y
  )
  y += LINE_HEIGHT + SECTION_GAP
  doc.setTextColor(0, 0, 0)

  const rows: Array<[string, string]> = [
    ['Reference', policy.reference],
    ['Student name', policy.studentName],
    ['Student email', policy.studentEmail],
    ['Provider', policy.provider],
    ['Amount', `${currencyBeforeAmount(policy.currency)}${formatAmount(policy.amount)}`],
    ['Agent name', policy.agentName],
    ['Agent email', policy.agentEmail],
    ['Receipt date', policy.requestedOn],
  ]
  if (policy.extensionLink) {
    rows.push(['Extension link', policy.extensionLink])
  }
  if (policy.cancellationLink) {
    rows.push(['Cancellation link', policy.cancellationLink])
  }

  for (const [label, value] of rows) {
    doc.setTextColor(100, 100, 100)
    doc.text(`${label}:`, MARGIN, y)
    doc.setTextColor(0, 0, 0)
    doc.text(value, MARGIN + 45, y)
    y += LINE_HEIGHT
  }

  return doc.output('blob')
}
