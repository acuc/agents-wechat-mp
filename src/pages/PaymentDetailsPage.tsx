import type { ReactNode } from 'react'
import { Download } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { LinkViewCopyActions } from '../components/common/LinkViewCopyActions'
import { PaymentTimeline } from '../components/payments/PaymentTimeline'
import { generatePaymentReceiptPdf } from '../lib/receiptPdf'
import { payments } from '../mocks/payments'
import { useTranslation } from '../i18n/useTranslation'
import { currencyBeforeAmount } from '../lib/currencySymbol'
import { paymentStudentEmail } from '../lib/studentEmail'
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

  function handleDownloadA2Form() {
    // TODO: implement A2 form download
  }

  return (
    <div className="page">
      <section className="center summary">
        <span className={`status-pill status-${payment.status.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '1.4rem', fontWeight:'500'}}>
          {t(statusToKey[payment.status])}
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: '500' }}>
          {currencyBeforeAmount(payment.amountToCurrency)}
          {formatAmountWithDecimals(payment.amountTo)}
        </h2>
        <p style={{fontSize:'1.8rem'}} className="muted">{payment.institution}</p>
        {payment.institutionAddress && (
          <p style={{fontSize:'1.4rem'}} className="muted">{payment.institutionAddress}</p>
        )}
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
          <span className="muted">{t('paymentDetails.studentEmail')}</span>
          <span>{paymentStudentEmail(payment)}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.institution')}</span>
          <span>{payment.institution}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.amountFrom')}</span>
          <span>
            {currencyBeforeAmount(payment.amountFromCurrency)}
            {payment.amountFromValue.toLocaleString('en-AU', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.amountTo')}</span>
          <span>
            {currencyBeforeAmount(payment.amountToCurrency)}
            {formatAmountWithDecimals(payment.amountTo)}
          </span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.payerName')}</span>
          <span>{payment.payerName}</span>
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
            <LinkViewCopyActions url={payment.trackingLink} />
          </span>
        </div>
        {payment.bestPriceGuaranteeApplied && (
          <div className="kv-row">
            <span className="muted">{t('paymentDetails.bestPriceGuaranteeApplied')}</span>
            <span>{t('paymentDetails.yes')}</span>
          </div>
        )}
      </section>

      {payment.status === 'Delivered' && (
        <button className="primary-btn" type="button" onClick={handleDownloadReceipt}>
          <Download size={16} /> {t('paymentDetails.downloadReceipt')}
        </button>
      )}
      {payment.status === 'Initiated' && (
        <button className="primary-btn payment-details-btn-white" type="button" onClick={handleDownloadA2Form}>
          <Download size={16} /> {t('paymentDetails.downloadA2Form')}
        </button>
      )}
      <PaymentTimeline payment={payment} />
    </div>
  )
}
