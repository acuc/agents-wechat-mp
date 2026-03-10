export type ConnectMethod = 'qr' | 'credentials'

export type PaymentStatus =
  | 'Delivered'
  | 'Guaranteed'
  | 'Initiated'
  | 'On hold'
  | 'Cancelled'


export interface ReferralProduct {
  id: string
  name: string
  description: string
  icon: string
}

export interface PaymentTimelineEvent {
  id: string
  label: string
  timestamp: string
}

export interface Payment {
  id: string
  studentName: string
  studentEmail?: string
  /** Amount in the destination (recipient) currency */
  amountTo: number
  /** Destination currency code, e.g. AUD, EUR, USD, GBP */
  amountToCurrency: string
  institution: string
  /** e.g. "Denton, TX, United States" */
  institutionAddress?: string
  date: string
  status: PaymentStatus
  /** Name of the person who made the payment */
  payerName: string
  addedDate: string
  linkedVia: 'Manually' | 'Auto'
  amountFromValue: number
  amountFromCurrency: string
  agentName: string
  agentEmail: string
  /** URL to open payment tracking in a webview or new tab */
  trackingLink: string
  /** When true, the payment has Best Price Guarantee applied */
  bestPriceGuaranteeApplied?: boolean
  timeline: PaymentTimelineEvent[]
}

export interface ProfileData {
  name: string
  email: string
  linked: boolean
  version: string
}
