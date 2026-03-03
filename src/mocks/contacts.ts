export interface Contact {
  id: string
  name: string
  isGroup?: boolean
}

const fromScreenshot: Contact[] = [
  { id: '1', name: 'Li Ming' },
  { id: '2', name: 'Wang Xiaohua' },
  { id: '3', name: 'Chen Wei' },
  { id: '4', name: 'Zhang Jie' },
  { id: '5', name: 'Liu Yang' },
  { id: '6', name: 'Student Support', isGroup: true },
  { id: '7', name: 'Study Abroad Group', isGroup: true },
]

const extraNames = [
  'Zhou Min', 'Wu Jie', 'Xu Lin', 'Sun Hao', 'Ma Li', 'Zhu Ting', 'Hu Qiang',
  'Guo Na', 'Lin Tao', 'He Xin', 'Gao Lei', 'Luo Min', 'Liang Jing', 'Song Wei',
  'Tang Fang', 'Han Bing', 'Deng Chao', 'Peng Li', 'Cao Yang', 'Yuan Min',
  'Dong Lei', 'Xiao Hong', 'Cheng Lin', 'Tian Hao', 'Ren Jie', 'Du Ting',
  'Fan Wei', 'Shi Fang', 'Yao Ming', 'Zou Jing', 'Lu Tao', 'Jiang Na',
  'Fu Qiang', 'Bai Li', 'Cui Hao', 'Kang Min', 'Mao Lei', 'Qian Fang',
  'Chang Jing', 'Li Ting', 'Wan Wei', 'Duan Lin', 'Qin Hao', 'Shi Min',
  'Gu Lei', 'Hou Na', 'Shao Yang', 'Long Jing', 'Ye Ting', 'Yan Wei',
]

const extraContacts: Contact[] = extraNames.map((name, i) => ({
  id: `c-${i + 10}`,
  name,
}))

export const contacts: Contact[] = [...fromScreenshot, ...extraContacts]
