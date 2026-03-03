import { useEffect, useRef, useState } from 'react'
import { Loader2, Search, SearchAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'
import type { Payment } from '../types/domain'
import { payments } from '../mocks/payments'
import '../styles/pages/LinkPaymentPage.css'

const successAsset = '/success-check.svg'

function formatAmount(amount: number): string {
  return amount.toLocaleString('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function getStudentEmail(payment: Payment): string {
  return (
    payment.studentEmail ??
    `${payment.studentName.toLowerCase().replace(/\s+/g, '.')}@example.com`
  )
}

export function LinkPaymentPage() {
  const { t } = useTranslation()
  const [paymentIdInput, setPaymentIdInput] = useState('')
  const [searchAttempted, setSearchAttempted] = useState(false)
  const [foundPayment, setFoundPayment] = useState<Payment | null>(null)
  const [searching, setSearching] = useState(false)
  const pendingSearchRef = useRef<Payment | null>(null)
  const [searchError, setSearchError] = useState('')
  const [confirmChecked, setConfirmChecked] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [linking, setLinking] = useState(false)
  const [linked, setLinked] = useState(false)

  useEffect(() => {
    if (!searching) return
    const t = window.setTimeout(() => {
      setFoundPayment(pendingSearchRef.current)
      setSearchAttempted(true)
      if (pendingSearchRef.current) {
        setConfirmChecked(false)
        setLinked(false)
      }
      setSearching(false)
    }, 2000)
    return () => window.clearTimeout(t)
  }, [searching])

  const handleSearch = () => {
    const trimmed = paymentIdInput.trim()
    setValidationError('')
    setSearchError('')
    if (!trimmed) {
      setSearchError(t('linkPayment.searchErrorRequired'))
      return
    }
    const payment = payments.find((p) => p.id.toUpperCase() === trimmed.toUpperCase()) ?? null
    pendingSearchRef.current = payment
    setSearching(true)
  }

  const handleLinkPayment = () => {
    setValidationError('')
    if (!foundPayment) return
    if (!confirmChecked) {
      setValidationError(t('linkPayment.confirmError'))
      return
    }
    setLinking(true)
    window.setTimeout(() => {
      setLinking(false)
      setLinked(true)
    }, 2000)
  }

  const handleCancel = () => {
    setFoundPayment(null)
    setConfirmChecked(false)
    setValidationError('')
  }

  const handleLinkAnother = () => {
    setPaymentIdInput('')
    setSearchAttempted(false)
    setFoundPayment(null)
    setSearchError('')
    setConfirmChecked(false)
    setValidationError('')
    setLinked(false)
  }

  const showNotFound = searchAttempted && !foundPayment && !searching && !linking && !linked
  const showSearching = searching
  const showVerify = foundPayment && !searching && !linking && !linked
  const showLinking = foundPayment && linking
  const showLinked = foundPayment && linked

  return (
    <div className="page link-payment-page" style={{paddingTop:'1.6rem'}}>
      <section className="link-payment-card" style={{background:'var(--bg-light)'}}>
        <h2 className="link-payment-card-title">{t('linkPayment.enterId')}</h2>
        <p className="link-payment-card-instruction">{t('linkPayment.instruction')}</p>
        <div
          className={`link-payment-search-wrap${searchError ? ' link-payment-search-wrap--error' : ''}`}
          style={{ backgroundColor: '#fff' }}
        >
          <Search size={18} className="link-payment-search-icon" aria-hidden />
          <input
            type="text"
            className="link-payment-search-input"
            style={{ backgroundColor: '#fff' }}
            placeholder={t('linkPayment.searchPlaceholder')}
            value={paymentIdInput}
            onChange={(e) => {
              setPaymentIdInput(e.target.value)
              setSearchError('')
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            aria-label="Payment ID"
          />
        </div>
        {searchError && <p className="link-payment-search-error">{searchError}</p>}
        <button type="button" className="link-payment-search-btn" onClick={handleSearch}>
          {t('linkPayment.searchPayment')}
        </button>
      </section>

      {showNotFound && (
        <section className="link-payment-card link-payment-linking-card link-payment-not-found-card">
          <SearchAlert size={32} className="link-payment-not-found-icon" aria-hidden />
          <p className="link-payment-linking-text">{t('linkPayment.noPaymentFound')}</p>
        </section>
      )}

      {showSearching && (
        <section className="link-payment-card link-payment-linking-card">
          <Loader2 size={32} className="link-payment-spinner" aria-hidden />
          <p className="link-payment-linking-text">{t('linkPayment.searching')}</p>
        </section>
      )}

      {showVerify && foundPayment && (
        <section className="link-payment-card link-payment-verify-card">
          <h2 className="link-payment-card-title">{t('linkPayment.verifyStudent')}</h2>
          <div className="link-payment-kv-list">
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.paymentId')}</span>
              <span>{foundPayment.id}</span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.institution')}</span>
              <span>{foundPayment.institution}</span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.amount')}</span>
              <span>AUD {formatAmount(foundPayment.amountAud)}</span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.amountFrom')}</span>
              <span>
                {foundPayment.amountFromValue.toLocaleString('en-AU', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                {foundPayment.amountFromCurrency}
              </span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.studentName')}</span>
              <span>{foundPayment.studentName}</span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.studentEmail')}</span>
              <span>{getStudentEmail(foundPayment)}</span>
            </div>
          </div>
          <label
            className={`link-payment-confirm-label ${validationError ? 'link-payment-confirm-label--error' : ''}`}
          >
            <input
              type="checkbox"
              checked={confirmChecked}
              onChange={(e) => {
                setConfirmChecked(e.target.checked)
                setValidationError('')
              }}
              className="link-payment-confirm-checkbox"
            />
            <span>{t('linkPayment.confirmLabel')}</span>
          </label>
          {validationError && <p className="link-payment-validation-error">{validationError}</p>}
          <div className="link-payment-verify-actions">
            <button type="button" className="link-payment-btn-cancel" onClick={handleCancel}>
              {t('linkPayment.cancel')}
            </button>
            <button
              type="button"
              className="link-payment-btn-primary"
              onClick={handleLinkPayment}
            >
              {t('linkPayment.linkPayment')}
            </button>
          </div>
        </section>
      )}

      {showLinking && (
        <section className="link-payment-card link-payment-linking-card">
          <Loader2 size={32} className="link-payment-spinner" aria-hidden />
          <p className="link-payment-linking-text">{t('linkPayment.linking')}</p>
        </section>
      )}

      {showLinked && foundPayment && (
        <section className="link-payment-card link-payment-success-card">
          <h2 className="link-payment-card-title">{t('linkPayment.paymentLinked')}</h2>
          <img alt="" src={successAsset} className="link-payment-success-icon" />
          <div className="link-payment-kv-list">
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.paymentId')}</span>
              <span>{foundPayment.id}</span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.institution')}</span>
              <span>{foundPayment.institution}</span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.amount')}</span>
              <span>AUD {formatAmount(foundPayment.amountAud)}</span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.amountFrom')}</span>
              <span>
                {foundPayment.amountFromValue.toLocaleString('en-AU', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                {foundPayment.amountFromCurrency}
              </span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.studentName')}</span>
              <span>{foundPayment.studentName}</span>
            </div>
            <div className="link-payment-kv-row">
              <span className="muted">{t('linkPayment.studentEmail')}</span>
              <span>{getStudentEmail(foundPayment)}</span>
            </div>
          </div>
          <div className="link-payment-success-actions">
            <Link to={`/payments/${foundPayment.id}`} className="link-payment-btn-primary">
              {t('linkPayment.viewInPayments')}
            </Link>
            <button type="button" className="link-payment-btn-secondary" onClick={handleLinkAnother}>
              {t('linkPayment.linkAnother')}
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
