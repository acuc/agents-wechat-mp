import tuitionPaymentsIcon from '../assets/tuition-payments.svg'
import oshcIcon from '../assets/oshc.svg'
import nzHealthInsuranceIcon from '../assets/nz-health-insurance.svg'
import canadaGicIcon from '../assets/canada-GIC.svg'
import germanyBlockedAccountsIcon from '../assets/germany-blocked-accounts.svg'
import nzFtsIcon from '../assets/nz-fts.svg'
import landingIcon from '../assets/landing.svg'

export const productIconMap: Record<string, string> = {
  'education-payments': tuitionPaymentsIcon,
  'oshc-insurance-australia': oshcIcon,
  'ovhc-insurance-australia': oshcIcon,
  'student-health-insurance-new-zealand': nzHealthInsuranceIcon,
  'canadian-gic-accounts': canadaGicIcon,
  'germany-blocked-accounts': germanyBlockedAccountsIcon,
  'new-zealand-fts': nzFtsIcon,
  'landing-page': landingIcon,
}

export function getProductIconUrl(productId: string): string {
  return productIconMap[productId] ?? ''
}
