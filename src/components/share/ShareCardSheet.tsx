import { useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getProductIconUrl } from '../../lib/productIcons'
import { useTranslation } from '../../i18n/useTranslation'
import { useAppStore } from '../../store/useAppStore'
import type { ReferralProduct } from '../../types/domain'
import logoMark from '../../assets/F.svg'

interface Props {
  product: ReferralProduct
  onClose: () => void
}

export function ShareCardSheet({ product, onClose }: Props) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const agentAccountName = useAppStore((s) => s.agentAccountName)
  const iconUrl = getProductIconUrl(product.id)
  const agentLabel = agentAccountName || t('shareLink.flywireAgents')
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true))
    })
    return () => cancelAnimationFrame(rafId)
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
            <p className="sheet-card-name">{product.name}</p>
            <p className="sheet-card-desc">{product.description}</p>
            <p className="sheet-card-agent">
              <img src={logoMark} alt="" className="sheet-card-agent-mark" />
              {agentLabel}
            </p>
          </div>
        </div>
        <button className="primary-btn share-sheet-share-btn" type="button" onClick={handleShareToWeChat}>
          {t('shareLink.shareToWeChat')} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
