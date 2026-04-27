import type { ReferralProduct } from '../types/domain'

/** Demo referral query (mock agent referrer + UTM) shared across product links */
const MOCK_REF_PARAMS =
  '?referrer=94e8a0b2-d1ce-041b-2624-7d2b42ae74c8'

const MOCK_SERVICES_BASE = 'https://agents.demo.flywire.com/services/alex-test'

// Agent Services product shape: name + description + icon (asset key for ShareLinkPage).
export const referralProducts: ReferralProduct[] = [
  {
    id: 'landing-page',
    name: 'Landing page',
    description: 'Choose the Flywire product that fits you',
    icon: 'landing',
    referralLink: `${MOCK_SERVICES_BASE}${MOCK_REF_PARAMS}`,
  },
  {
    id: 'education-payments',
    name: 'Education Payments',
    description: 'Make a tuition payment to your school of choice',
    icon: 'tuition-payments',
    referralLink: `${MOCK_SERVICES_BASE}/edu-payments${MOCK_REF_PARAMS}`,
  },
  {
    id: 'germany-blocked-accounts',
    name: 'Germany Blocked Accounts',
    description: 'Fund your blocked account securely with no unexpected fees',
    icon: 'germany-blocked-accounts',
    referralLink: `${MOCK_SERVICES_BASE}/germany-blocked-accounts${MOCK_REF_PARAMS}`,
  },
  {
    id: 'new-zealand-fts',
    name: 'New Zealand FTS',
    description: 'Fund your FTS account securely with no unexpected fees',
    icon: 'nz-fts',
    referralLink: `${MOCK_SERVICES_BASE}/nz-fts${MOCK_REF_PARAMS}`,
  },
  {
    id: 'oshc-insurance-australia',
    name: 'OSHC Insurance Australia',
    description: 'Compare your options and meet your Australian visa requirements',
    icon: 'oshc',
    referralLink: `${MOCK_SERVICES_BASE}/oshc-au${MOCK_REF_PARAMS}`,
  },
  {
    id: 'ovhc-insurance-australia',
    name: 'OVHC Insurance Australia',
    description: 'Get the cover you need and meet the conditions of your Australian Work Right Visa',
    icon: 'oshc',
    referralLink: `${MOCK_SERVICES_BASE}/ovhc-au${MOCK_REF_PARAMS}`,
  },
  {
    id: 'student-health-insurance-new-zealand',
    name: 'Student Health Insurance New Zealand',
    description: 'Choose the best New Zealand Student Health Insurance',
    icon: 'nz-health-insurance',
    referralLink: `${MOCK_SERVICES_BASE}/studenthealth-nz${MOCK_REF_PARAMS}`,
  },
]
