import { jsPDF } from 'jspdf'
import type { Payment } from '../types/domain'
import { getTimelineSteps } from '../components/payments/paymentTimelineSteps'

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

export async function generatePaymentReceiptPdf(
  payment: Payment,
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
  doc.text('Payment receipt', MARGIN, y)
  y += LINE_HEIGHT + 4

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text(`${payment.status} · ${formatAmount(payment.amountAud)} AUD`, MARGIN, y)
  y += LINE_HEIGHT
  doc.text(payment.institution, MARGIN, y)
  y += LINE_HEIGHT + SECTION_GAP
  doc.setTextColor(0, 0, 0)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Payment details', MARGIN, y)
  y += LINE_HEIGHT + 2
  doc.setFont('helvetica', 'normal')

  const details: Array<[string, string]> = [
    ['Payment ID', payment.id],
    ['Student name', payment.studentName],
    ['Institution', payment.institution],
    ['Payment date', payment.date],
    ['Amount', `AUD ${formatAmount(payment.amountAud)}`],
    ['Added date', payment.addedDate],
    ['Linked via', payment.linkedVia],
    ['Amount from', `${payment.amountFromValue.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${payment.amountFromCurrency}`],
    ['Amount to', `${formatAmount(payment.amountAud)} AUD`],
    ['Agent email', payment.agentEmail],
  ]

  for (const [label, value] of details) {
    doc.setTextColor(100, 100, 100)
    doc.text(`${label}:`, MARGIN, y)
    doc.setTextColor(0, 0, 0)
    doc.text(value, MARGIN + 45, y)
    y += LINE_HEIGHT
  }
  y += SECTION_GAP

  const steps = getTimelineSteps(payment)
  doc.setFont('helvetica', 'bold')
  doc.text('Payment timeline', MARGIN, y)
  y += LINE_HEIGHT + 2
  doc.setFont('helvetica', 'normal')

  for (const step of steps) {
    doc.text(step.label, MARGIN + 4, y)
    doc.setTextColor(100, 100, 100)
    doc.text(step.timestamp ?? '--', MARGIN + 4, y + 5)
    doc.setTextColor(0, 0, 0)
    y += LINE_HEIGHT + 8
  }

  return doc.output('blob')
}
