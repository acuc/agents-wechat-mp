export type ConnectMethod = 'qr' | 'credentials'

export type PaymentStatus =
  | 'Delivered'
  | 'Guaranteed'
  | 'Initiated'
  | 'Cancelled'
  | 'On hold'

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
  amountAud: number
  institution: string
  date: string
  status: PaymentStatus
  addedDate: string
  linkedVia: 'Manually' | 'Auto'
  amountFromValue: number
  amountFromCurrency: string
  agentEmail: string
  timeline: PaymentTimelineEvent[]
}

export interface ProfileData {
  name: string
  email: string
  linked: boolean
  version: string
}
