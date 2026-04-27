import { useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProductIconUrl } from '../../lib/productIcons'
import { useTranslation } from '../../i18n/useTranslation'
import type { ReferralProduct } from '../../types/domain'

/** Set to true when the WeChat share-to-contact flow is ready. */
const SHOW_SHARE_TO_WECHAT_BUTTON = false

interface Props {
  product: ReferralProduct
  onClose: () => void
}

export function ShareCardSheet({ product, onClose }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const iconUrl = getProductIconUrl(product.id)
  const productTitle = t(`shareLink.product.${product.id}.name`) || product.name
  const productDescription = t(`shareLink.product.${product.id}.description`) || product.description
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

  const getReferralLink = () =>
    product.referralLink ?? `https://referral.flywire.com/${product.id}`

  const handleShareToWeChat = () => {
    onClose()
    navigate('/share-link/select-contact', { state: { product } })
  }

  const handleVisitPage = () => {
    onClose()
    navigate('/share-link/webview', {
      state: { url: getReferralLink(), returnTo: location.pathname },
    })
  }

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
      <div
        className="share-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="share-sheet-preview-title"
      >
        <div className="sheet-handle" aria-hidden />
        <div className="sheet-header">
          <button className="icon-btn" onClick={handleClose} type="button" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="share-sheet-preview">
          {iconUrl ? (
            <div className="share-sheet-preview-icon" aria-hidden>
              <img src={iconUrl} alt="" />
            </div>
          ) : null}
          <div className="share-sheet-preview-text">
            <h2 className="share-sheet-preview-title" id="share-sheet-preview-title">
              {productTitle}
            </h2>
            <p className="share-sheet-preview-desc">{productDescription}</p>
          </div>
        </div>
        {SHOW_SHARE_TO_WECHAT_BUTTON ? (
          <button className="primary-btn share-sheet-share-btn" type="button" onClick={handleShareToWeChat}>
            {t('shareLink.shareToWeChat')} <ArrowRight size={16} />
          </button>
        ) : null}
        <button className="share-sheet-copy-btn" type="button" onClick={handleVisitPage}>
          {t('shareLink.visitPage')}
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
