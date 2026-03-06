import type { ReactNode } from 'react'
import { Download } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { PaymentTimeline } from '../components/payments/PaymentTimeline'
import { generatePaymentReceiptPdf } from '../lib/receiptPdf'
import { payments } from '../mocks/payments'
import { useTranslation } from '../i18n/useTranslation'
import type { PaymentStatus } from '../types/domain'
import logoFull from '../assets/logo-full.svg'
import '../styles/pages/PaymentDetailsPage.css'

const statusToKey: Record<PaymentStatus, string> = {
  Delivered: 'payments.delivered',
  Cancelled: 'payments.cancelled',
  'On hold': 'payments.onHold',
  Initiated: 'payments.initiated',
  Guaranteed: 'payments.guaranteed',
}

function formatAmountWithDecimals(amount: number): ReactNode {
  const str = amount.toLocaleString('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const [whole, decimals] = str.split('.')
  return (
    <>
      {whole}.<span>{decimals}</span>
    </>
  )
}

export function PaymentDetailsPage() {
  const { paymentId } = useParams()
  const { t } = useTranslation()
  const payment = payments.find((entry) => entry.id === paymentId) ?? payments[0]

  async function handleDownloadReceipt() {
    const blob = await generatePaymentReceiptPdf(payment, logoFull)
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener,noreferrer')
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="page">
      <section className="center summary">
        <span className={`status-pill status-${payment.status.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '1.4rem', fontWeight:'500'}}>
          {t(statusToKey[payment.status])}
        </span>
        <h2 style={{fontSize:'3.2rem', fontWeight:'500'}}>{formatAmountWithDecimals(payment.amountAud)} AUD</h2>
        <p className="muted">{payment.institution}</p>
      </section>

      <section className="card">
        <p className="section-title">{t('paymentDetails.paymentDetails')}</p>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.paymentId')}</span>
          <span>{payment.id}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.studentName')}</span>
          <span>{payment.studentName}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.recipient')}</span>
          <span>{payment.institution}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.amountFrom')}</span>
          <span>{payment.amountFromValue.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {payment.amountFromCurrency}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.amountTo')}</span>
          <span>{formatAmountWithDecimals(payment.amountAud)} AUD</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.initiatedDate')}</span>
          <span>{payment.date}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.addedDate')}</span>
          <span>{payment.addedDate}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.linkedVia')}</span>
          <span>{payment.linkedVia}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.agentName')}</span>
          <span>{payment.agentName}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.agentEmail')}</span>
          <span>{payment.agentEmail}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.paymentTrackingLink')}</span>
          <span>
            <a
              href={payment.trackingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="payment-tracking-link"
            >
              {t('paymentDetails.openTracking')}
            </a>
          </span>
        </div>
      </section>

      {payment.status === 'Delivered' && (
        <button className="primary-btn" type="button" onClick={handleDownloadReceipt}>
          <Download size={16} /> {t('paymentDetails.downloadReceipt')}
        </button>
      )}
      <PaymentTimeline payment={payment} />
    </div>
  )
}
