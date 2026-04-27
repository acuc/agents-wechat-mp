import type { ReactNode } from 'react'
import { Download } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { LinkViewCopyActions } from '../components/common/LinkViewCopyActions'
import { generatePolicyPdf, generatePolicyReceiptPdf } from '../lib/policyPdf'
import { insurancePolicies } from '../mocks/policies'
import { useTranslation } from '../i18n/useTranslation'
import { currencyBeforeAmount } from '../lib/currencySymbol'
import type { PolicyStatus } from '../types/domain'
import logoFull from '../assets/logo-full.svg'
import '../styles/pages/PaymentDetailsPage.css'

const statusToKey: Record<PolicyStatus, string> = {
  Active: 'policies.statusActive',
  Processing: 'policies.statusProcessing',
  Unpaid: 'policies.statusUnpaid',
  Cancelled: 'policies.statusCancelled',
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

export function PolicyDetailsPage() {
  const { policyId } = useParams()
  const { t } = useTranslation()
  const policy =
    insurancePolicies.find((entry) => entry.id === policyId) ?? insurancePolicies[0]

  async function openPdfBlob(blob: Blob) {
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener,noreferrer')
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  async function handleDownloadPolicy() {
    openPdfBlob(await generatePolicyPdf(policy, logoFull))
  }

  async function handleDownloadReceipt() {
    openPdfBlob(await generatePolicyReceiptPdf(policy, logoFull))
  }

  const statusClass = policy.status.toLowerCase()
  const showPolicyLinks = policy.status === 'Active' && policy.extensionLink && policy.cancellationLink

  return (
    <div className="page">
      <section className="center summary">
        <span
          className={`status-pill status-${statusClass}`}
          style={{ fontSize: '1.4rem', fontWeight: '500' }}
        >
          {t(statusToKey[policy.status])}
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: '500' }}>
          {currencyBeforeAmount(policy.currency)}
          {formatAmountWithDecimals(policy.amount)}
        </h2>
        <p style={{ fontSize: '1.8rem' }} className="muted">
          {policy.provider}
        </p>
      </section>

      <section className="card">
        <p className="section-title">{t('policyDetails.sectionTitle')}</p>
        <div className="kv-row">
          <span className="muted">{t('policyDetails.reference')}</span>
          <span>{policy.reference}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('policyDetails.studentName')}</span>
          <span>{policy.studentName}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.studentEmail')}</span>
          <span>{policy.studentEmail}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('policyDetails.provider')}</span>
          <span>{policy.provider}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('policyDetails.amount')}</span>
          <span>
            {currencyBeforeAmount(policy.currency)}
            {formatAmountWithDecimals(policy.amount)}
          </span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('policyDetails.startDate')}</span>
          <span>{policy.startDate}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('policyDetails.endDate')}</span>
          <span>{policy.endDate}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('policyDetails.requestedOn')}</span>
          <span>{policy.requestedOn}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.agentName')}</span>
          <span>{policy.agentName}</span>
        </div>
        <div className="kv-row">
          <span className="muted">{t('paymentDetails.agentEmail')}</span>
          <span>{policy.agentEmail}</span>
        </div>
        {showPolicyLinks && (
          <>
            <div className="kv-row">
              <span className="muted">{t('policyDetails.extensionLink')}</span>
              <span>
                <LinkViewCopyActions url={policy.extensionLink as string} />
              </span>
            </div>
            <div className="kv-row">
              <span className="muted">{t('policyDetails.cancellationLink')}</span>
              <span>
                <LinkViewCopyActions url={policy.cancellationLink as string} />
              </span>
            </div>
          </>
        )}
      </section>

      {policy.status === 'Active' && (
        <div className="policy-details-downloads">
          <button className="primary-btn" type="button" onClick={handleDownloadPolicy}>
            <Download size={16} /> {t('policyDetails.downloadPolicy')}
          </button>
          <button
            className="primary-btn payment-details-btn-white"
            type="button"
            onClick={handleDownloadReceipt}
          >
            <Download size={16} /> {t('paymentDetails.downloadReceipt')}
          </button>
        </div>
      )}
    </div>
  )
}
