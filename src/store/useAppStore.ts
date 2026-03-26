import { create } from 'zustand'
import type { ConnectMethod, PaymentStatus, PolicyStatus, ReferralProduct } from '../types/domain'
import type { Locale } from '../i18n/translations'

interface AppState {
  locale: Locale
  isConnected: boolean
  connectMethod: ConnectMethod
  agentAccountName: string
  shareSheetProduct: ReferralProduct | null
  paymentSearch: string
  paymentFilter: PaymentStatus | 'All'
  setLocale: (locale: Locale) => void
  setConnectMethod: (method: ConnectMethod) => void
  setConnected: (isConnected: boolean) => void
  setAgentAccountName: (name: string) => void
  openShareSheet: (product: ReferralProduct) => void
  closeShareSheet: () => void
  setPaymentSearch: (value: string) => void
  setPaymentFilter: (value: PaymentStatus | 'All') => void
  policySearch: string
  policyFilter: PolicyStatus | 'All'
  setPolicySearch: (value: string) => void
  setPolicyFilter: (value: PolicyStatus | 'All') => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'en',
  isConnected: false,
  connectMethod: 'qr',
  agentAccountName: '',
  shareSheetProduct: null,
  paymentSearch: '',
  paymentFilter: 'All',
  setLocale: (locale) => set({ locale }),
  setConnectMethod: (connectMethod) => set({ connectMethod }),
  setConnected: (isConnected) => set({ isConnected }),
  setAgentAccountName: (agentAccountName) => set({ agentAccountName }),
  openShareSheet: (shareSheetProduct) => set({ shareSheetProduct }),
  closeShareSheet: () => set({ shareSheetProduct: null }),
  setPaymentSearch: (paymentSearch) => set({ paymentSearch }),
  setPaymentFilter: (paymentFilter) => set({ paymentFilter }),
  policySearch: '',
  policyFilter: 'All',
  setPolicySearch: (policySearch) => set({ policySearch }),
  setPolicyFilter: (policyFilter) => set({ policyFilter }),
  logout: () =>
    set({
      isConnected: false,
      connectMethod: 'qr',
      agentAccountName: '',
      shareSheetProduct: null,
      paymentSearch: '',
      paymentFilter: 'All',
      policySearch: '',
      policyFilter: 'All',
    }),
}))
