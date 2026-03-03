import QRCode from 'qrcode'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'public', 'qr-code.svg')

const url = 'https://partners.flywire.com/connect'
const svg = await QRCode.toString(url, { type: 'svg', margin: 2, width: 300 })
writeFileSync(outPath, svg, 'utf8')
console.log('Generated public/qr-code.svg')
