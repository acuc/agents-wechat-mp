/** Maps ISO 4217 codes to symbols for display. Unknown codes fall back to the uppercase code. */
const ISO_TO_SYMBOL: Record<string, string> = {
  AUD: 'AU$',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
  JPY: '¥',
  NZD: 'NZ$',
  CAD: 'CA$',
  SGD: 'S$',
  HKD: 'HK$',
  INR: '₹',
  KRW: '₩',
}

export function currencySymbol(isoCode: string): string {
  const upper = isoCode.trim().toUpperCase()
  return ISO_TO_SYMBOL[upper] ?? upper
}

/** Symbol plus a space before the formatted amount (UI and PDF). */
export function currencyBeforeAmount(isoCode: string): string {
  return `${currencySymbol(isoCode)} `
}
