import { useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getProductIconUrl } from '../../lib/productIcons'
import { useTranslation } from '../../i18n/useTranslation'
import type { ReferralProduct } from '../../types/domain'

interface Props {
  product: ReferralProduct
  onClose: () => void
}

export function ShareCardSheet({ product, onClose }: Props) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const iconUrl = getProductIconUrl(product.id)
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [copied, setCopied] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const copyFeedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true))
    })
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => () => {
    if (copyFeedbackTimeoutRef.current) clearTimeout(copyFeedbackTimeoutRef.current)
  }, [])

  const handleClose = () => {
    if (isExiting) return
    setIsExiting(true)
  }

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!isExiting || e.target !== overlayRef.current || e.propertyName !== 'opacity') return
    onClose()
  }

  const handleShareToWeChat = () => {
    onClose()
    navigate('/share-link/select-contact', { state: { product } })
  }

  const getReferralLink = () =>
    product.referralLink ?? `https://referral.flywire.com/${product.id}`

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getReferralLink())
    } catch {
      // fallback for older browsers
      const input = document.createElement('input')
      input.value = getReferralLink()
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    setCopied(true)
    if (copyFeedbackTimeoutRef.current) clearTimeout(copyFeedbackTimeoutRef.current)
    copyFeedbackTimeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  const overlayClass = [
    'sheet-overlay',
    isVisible && !isExiting && 'sheet-overlay--visible',
    isExiting && 'sheet-overlay--exiting',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={overlayRef}
      className={overlayClass}
      onClick={handleClose}
      onTransitionEnd={handleTransitionEnd}
      role="presentation"
    >
      <div className="share-sheet" onClick={(e) => e.stopPropagation()} role="dialog">
        <div className="sheet-handle" aria-hidden />
        <div className="sheet-header">
          <h3>{t('shareLink.previewCard')}</h3>
          <button className="icon-btn" onClick={handleClose} type="button" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="sheet-card">
          <div className="sheet-card-icon">
            {iconUrl ? (
              <img src={iconUrl} alt="" />
            ) : null}
          </div>
          <div className="sheet-card-copy">
            <p className="sheet-card-name">{t(`shareLink.product.${product.id}.name`) || product.name}</p>
            <p className="sheet-card-desc">{t(`shareLink.product.${product.id}.description`) || product.description}</p>
          </div>
        </div>
        <button className="primary-btn share-sheet-share-btn" type="button" onClick={handleShareToWeChat}>
          {t('shareLink.shareToWeChat')} <ArrowRight size={16} />
        </button>
        <button
          className="share-sheet-copy-btn"
          type="button"
          onClick={handleCopyToClipboard}
        >
          {copied ? t('shareLink.copiedToClipboard') : t('shareLink.copyToClipboard')}
        </button>
      </div>
    </div>
  )
}
