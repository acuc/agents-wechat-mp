export type ConnectMethod = 'qr' | 'credentials'

export type PaymentStatus =
  | 'Delivered'
  | 'Guaranteed'
  | 'Initiated'
  | 'On hold'
  | 'Cancelled'

export type PolicyStatus = 'Active' | 'Processing' | 'Unpaid' | 'Cancelled'

export type InsuranceProviderName =
  | 'AHM - OSHC'
  | 'Allianz Care Australia - OSHC'
  | 'NIB - OSHC'
  | 'CBHS - OSHC'
  | 'Medibank - OSHC'

export interface InsurancePolicy {
  id: string
  reference: string
  studentName: string
  studentEmail: string
  provider: InsuranceProviderName
  amount: number
  currency: string
  startDate: string
  endDate: string
  /** Date the policy was requested (display format, e.g. "3 Dec 2024") */
  requestedOn: string
  agentName: string
  agentEmail: string
  /** Present for Active policies: URL to extend cover */
  extensionLink?: string
  /** Present for Active policies: URL to request cancellation */
  cancellationLink?: string
  status: PolicyStatus
}


export interface ReferralProduct {
  id: string
  name: string
  description: string
  icon: string
  /** Referral link URL to share or copy. If omitted, a placeholder is used. */
  referralLink?: string
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
