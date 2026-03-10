import type { Payment } from '../types/domain'

const CNY_PER_AUD = 4.85

const DEMO_TRACKING_LINK = 'https://payment.demo.flywire.com/tracking/39a98f02-63cb-4d24-a078-09dce6ce119a?token=6e9b08d6-d9d5-4837-a85b-6b786c698193'

function makePaymentId(seed: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''
  for (let i = 0; i < 3; i++) {
    id += letters[(seed * 17 + i * 7) % letters.length]
  }
  const num = String(100000000 + (seed * 7919) % 900000000)
  return id + num
}

const statuses: Payment['status'][] = ['Delivered', 'Guaranteed', 'Initiated', 'Cancelled', 'On hold']
const institutions = [
  'University of Melbourne',
  'University of Auckland',
  'UNSW Sydney',
  'University of Otago',
  'Monash University',
  'Victoria University of Wellington',
  'University of Sydney',
  'University of Queensland',
  'University of Western Australia',
  'Auckland University of Technology',
  'Massey University',
  'University of Adelaide',
  'University of Newcastle',
  'Macquarie University',
  'RMIT University',
]

const amountToCurrencies: string[] = ['AUD', 'EUR', 'USD', 'GBP']

const institutionAddresses: string[] = [
  'Melbourne, VIC, Australia',
  'Auckland, New Zealand',
  'Sydney, NSW, Australia',
  'Dunedin, New Zealand',
  'Melbourne, VIC, Australia',
  'Wellington, New Zealand',
  'Sydney, NSW, Australia',
  'Brisbane, QLD, Australia',
  'Perth, WA, Australia',
  'Auckland, New Zealand',
  'Palmerston North, New Zealand',
  'Adelaide, SA, Australia',
  'Newcastle, NSW, Australia',
  'Sydney, NSW, Australia',
  'Melbourne, VIC, Australia',
]

const chineseNames = [
  'Li Xiaoming',
  'Wang Fang',
  'Zhang Wei',
  'Liu Yang',
  'Chen Jing',
  'Yang Min',
  'Huang Lei',
  'Zhou Jie',
  'Wu Qian',
  'Xu Lin',
  'Sun Hao',
  'Ma Li',
  'Zhu Ting',
  'Hu Qiang',
  'Guo Na',
  'Lin Tao',
  'He Xin',
  'Gao Lei',
  'Luo Min',
  'Liang Jing',
  'Song Wei',
  'Tang Fang',
  'Han Bing',
  'Deng Chao',
  'Peng Li',
  'Cao Yang',
  'Yuan Min',
  'Dong Lei',
  'Xiao Hong',
  'Cheng Lin',
  'Tian Hao',
  'Ren Jie',
  'Du Ting',
  'Fan Wei',
  'Shi Fang',
  'Yao Ming',
  'Zou Jing',
  'Lu Tao',
  'Jiang Na',
  'Fu Qiang',
  'Bai Li',
  'Cui Hao',
  'Kang Min',
  'Mao Lei',
  'Qian Fang',
  'Chang Jing',
  'Wu Jie',
  'Li Ting',
  'Wan Wei',
  'Duan Lin',
  'Qin Hao',
  'Shi Min',
  'Gu Lei',
  'Hou Na',
  'Shao Yang',
  'Long Jing',
  'Ye Ting',
  'Yan Wei',
  'Yu Fang',
  'Pan Hao',
  'Dai Lin',
  'Xia Min',
  'Zhong Lei',
  'Wang Na',
]

function makeTimeline(status: Payment['status'], day: number): Payment['timeline'] {
  const d = `Feb ${day}`
  if (status === 'Delivered') {
    return [
      { id: '1', label: 'Payment Initiated', timestamp: `${d}, 10:32 AM` },
      { id: '2', label: 'Funds Received', timestamp: `${d}, 2:15 PM` },
      { id: '3', label: 'Processing', timestamp: `${d}, 9:00 AM` },
      { id: '4', label: 'Delivered to Institution', timestamp: `${d}, 3:45 PM` },
    ]
  }
  if (status === 'Guaranteed') {
    return [
      { id: '1', label: 'Payment Initiated', timestamp: `${d}, 10:00 AM` },
      { id: '2', label: 'Funds Received', timestamp: `${d}, 2:15 PM` },
      { id: '3', label: 'Processing', timestamp: `${d}, 11:10 AM` },
    ]
  }
  if (status === 'Cancelled') {
    return [
      { id: '1', label: 'Payment Initiated', timestamp: `${d}, 9:00 AM` },
      { id: '2', label: 'Payment Cancelled', timestamp: `${d}, 10:20 AM` },
    ]
  }
  if (status === 'On hold') {
    return [
      { id: '1', label: 'Payment Initiated', timestamp: `${d}, 10:00 AM` },
      { id: '2', label: 'Funds Received', timestamp: `${d}, 1:30 PM` },
      { id: '3', label: 'Processing', timestamp: `${d}, 6:05 PM` },
    ]
  }
  return [{ id: '1', label: 'Payment Initiated', timestamp: `${d}, 7:40 PM` }]
}

const firstSix: Payment[] = [
  {
    id: makePaymentId(1001),
    studentName: 'Li Xiaoming',
    amountTo: 32500,
    amountToCurrency: 'AUD',
    institution: 'University of Melbourne',
    institutionAddress: 'Melbourne, VIC, Australia',
    date: 'Feb 20, 2026',
    status: 'Delivered',
    payerName: 'Li Xiaoming',
    addedDate: 'Feb 18, 2026',
    linkedVia: 'Manually',
    amountFromValue: Math.round(32500 * CNY_PER_AUD),
    amountFromCurrency: 'CNY',
    agentName: 'Flywire Agent',
    agentEmail: 'agent.example@flywire.com',
    trackingLink: DEMO_TRACKING_LINK,
    bestPriceGuaranteeApplied: true,
    timeline: [
      { id: '1', label: 'Payment Initiated', timestamp: 'Feb 18, 10:32 AM' },
      { id: '2', label: 'Funds Received', timestamp: 'Feb 19, 2:15 PM' },
      { id: '3', label: 'Processing', timestamp: 'Feb 20, 9:00 AM' },
      { id: '4', label: 'Delivered to Institution', timestamp: 'Feb 20, 3:45 PM' },
    ],
  },
  {
    id: makePaymentId(1002),
    studentName: 'Wang Fang',
    amountTo: 28600,
    amountToCurrency: 'EUR',
    institution: 'University of Auckland',
    institutionAddress: 'Auckland, New Zealand',
    date: 'Feb 24, 2026',
    status: 'Guaranteed',
    payerName: 'Wang Fang',
    addedDate: 'Feb 22, 2026',
    linkedVia: 'Auto',
    amountFromValue: Math.round(28600 * CNY_PER_AUD),
    amountFromCurrency: 'CNY',
    agentName: 'Flywire Agent',
    agentEmail: 'agent.example@flywire.com',
    trackingLink: DEMO_TRACKING_LINK,
    timeline: [
      { id: '1', label: 'Payment Initiated', timestamp: 'Feb 22, 10:00 AM' },
      { id: '2', label: 'Funds Received', timestamp: 'Feb 24, 2:15 PM' },
      { id: '3', label: 'Processing', timestamp: 'Feb 24, 11:10 AM' },
    ],
  },
  {
    id: makePaymentId(1003),
    studentName: 'Zhang Wei',
    amountTo: 41320,
    amountToCurrency: 'USD',
    institution: 'UNSW Sydney',
    institutionAddress: 'Sydney, NSW, Australia',
    date: 'Feb 25, 2026',
    status: 'Initiated',
    payerName: 'Zhang Wei',
    addedDate: 'Feb 25, 2026',
    linkedVia: 'Auto',
    amountFromValue: Math.round(41320 * CNY_PER_AUD),
    amountFromCurrency: 'CNY',
    agentName: 'Flywire Agent',
    agentEmail: 'agent.example@flywire.com',
    trackingLink: DEMO_TRACKING_LINK,
    bestPriceGuaranteeApplied: true,
    timeline: [{ id: '1', label: 'Payment Initiated', timestamp: 'Feb 25, 7:40 PM' }],
  },
  {
    id: makePaymentId(1004),
    studentName: 'Liu Yang',
    amountTo: 24780,
    amountToCurrency: 'GBP',
    institution: 'University of Otago',
    institutionAddress: 'Dunedin, New Zealand',
    date: 'Feb 23, 2026',
    status: 'On hold',
    payerName: 'Liu Yang',
    addedDate: 'Feb 21, 2026',
    linkedVia: 'Manually',
    amountFromValue: Math.round(24780 * CNY_PER_AUD),
    amountFromCurrency: 'CNY',
    agentName: 'Flywire Agent',
    agentEmail: 'agent.example@flywire.com',
    trackingLink: DEMO_TRACKING_LINK,
    timeline: [
      { id: '1', label: 'Payment Initiated', timestamp: 'Feb 21, 10:00 AM' },
      { id: '2', label: 'Funds Received', timestamp: 'Feb 22, 1:30 PM' },
      { id: '3', label: 'Processing', timestamp: 'Feb 23, 6:05 PM' },
    ],
  },
  {
    id: makePaymentId(1005),
    studentName: 'Chen Jing',
    amountTo: 36750,
    amountToCurrency: 'AUD',
    institution: 'Monash University',
    institutionAddress: 'Melbourne, VIC, Australia',
    date: 'Feb 22, 2026',
    status: 'Cancelled',
    payerName: 'Chen Jing',
    addedDate: 'Feb 21, 2026',
    linkedVia: 'Auto',
    amountFromValue: Math.round(36750 * CNY_PER_AUD),
    amountFromCurrency: 'CNY',
    agentName: 'Flywire Agent',
    agentEmail: 'agent.example@flywire.com',
    trackingLink: DEMO_TRACKING_LINK,
    timeline: [
      { id: '1', label: 'Payment Initiated', timestamp: 'Feb 21, 9:00 AM' },
      { id: '2', label: 'Payment Cancelled', timestamp: 'Feb 22, 10:20 AM' },
    ],
  },
  {
    id: makePaymentId(1006),
    studentName: 'Yang Min',
    amountTo: 19840,
    amountToCurrency: 'EUR',
    institution: 'Victoria University of Wellington',
    institutionAddress: 'Wellington, New Zealand',
    date: 'Feb 21, 2026',
    status: 'Delivered',
    payerName: 'Yang Min',
    addedDate: 'Feb 19, 2026',
    linkedVia: 'Auto',
    amountFromValue: Math.round(19840 * CNY_PER_AUD),
    amountFromCurrency: 'CNY',
    agentName: 'Flywire Agent',
    agentEmail: 'agent.example@flywire.com',
    trackingLink: DEMO_TRACKING_LINK,
    timeline: [
      { id: '1', label: 'Payment Initiated', timestamp: 'Feb 19, 9:41 AM' },
      { id: '2', label: 'Funds Received', timestamp: 'Feb 20, 2:15 PM' },
      { id: '3', label: 'Processing', timestamp: 'Feb 21, 9:00 AM' },
      { id: '4', label: 'Delivered to Institution', timestamp: 'Feb 21, 4:10 PM' },
    ],
  },
]

const extraPayments: Payment[] = Array.from({ length: 50 }, (_, i) => {
  const day = 18 + (i % 10)
  const status = statuses[i % statuses.length]
  const amountTo = [22100, 31000, 27500, 38900, 25600, 33400, 19800, 41200, 28900, 36700][i % 10] + (i % 5) * 200
  const instIdx = i % institutions.length
  const student = chineseNames[i + 6]
  const currency = amountToCurrencies[i % amountToCurrencies.length]
  return {
    id: makePaymentId(2000 + i),
    studentName: student,
    amountTo,
    amountToCurrency: currency,
    institution: institutions[instIdx],
    institutionAddress: institutionAddresses[instIdx],
    date: `Feb ${day}, 2026`,
    status,
    payerName: student,
    addedDate: `Feb ${Math.max(15, day - 2)}, 2026`,
    linkedVia: i % 3 === 0 ? 'Manually' : 'Auto',
    amountFromValue: Math.round(amountTo * CNY_PER_AUD),
    amountFromCurrency: 'CNY',
    agentName: 'Flywire Agent',
    agentEmail: 'agent.example@flywire.com',
    trackingLink: DEMO_TRACKING_LINK,
    bestPriceGuaranteeApplied: i % 5 === 0,
    timeline: makeTimeline(status, day),
  }
})

export const payments: Payment[] = [...firstSix, ...extraPayments]
