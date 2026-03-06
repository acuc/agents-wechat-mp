import type { ReferralProduct } from '../types/domain'

// Agent Services product shape: name + description + icon (asset key for ShareLinkPage).
export const referralProducts: ReferralProduct[] = [
  {
    id: 'education-payments',
    name: 'Education Payments',
    description: 'Make a tuition payment to your school of choice',
    icon: 'tuition-payments',
  },
  {
    id: 'germany-blocked-accounts',
    name: 'Germany Blocked Accounts',
    description: 'Fund your blocked account securely with no unexpected fees',
    icon: 'germany-blocked-accounts',
  },
  {
    id: 'new-zealand-fts',
    name: 'New Zealand FTS',
    description: 'Fund your FTS account securely with no unexpected fees',
    icon: 'nz-fts',
  },
  {
    id: 'canadian-gic-accounts',
    name: 'Canadian GIC Accounts',
    description: 'Fund your GIC account with no unexpected fees',
    icon: 'canada-gic',
  },
  {
    id: 'oshc-insurance-australia',
    name: 'OSHC Insurance Australia',
    description: 'Compare your options and meet your Australian visa requirements',
    icon: 'oshc',
  },
  {
    id: 'ovhc-insurance-australia',
    name: 'OVHC Insurance Australia',
    description: 'Get the cover you need and meet the conditions of your Australian Work Right Visa',
    icon: 'oshc',
  },
  {
    id: 'student-health-insurance-new-zealand',
    name: 'Student Health Insurance New Zealand',
    description: 'Choose the best New Zealand Student Health Insurance',
    icon: 'nz-health-insurance',
  }
]
