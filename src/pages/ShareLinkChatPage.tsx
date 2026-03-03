import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { ReferralProduct } from '../types/domain'
import { getProductIconUrl } from '../lib/productIcons'
import { useTranslation } from '../i18n/useTranslation'
import logoMark from '../assets/F.svg'
import '../styles/pages/ShareLinkChatPage.css'

interface ChatLocationState {
  product: ReferralProduct
  contact: { id: string; name: string }
}

export function ShareLinkChatPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const state = location.state as ChatLocationState | null
  const product = state?.product ?? null
  const contact = state?.contact ?? null

  useEffect(() => {
    if (!product || !contact) navigate('/share-link', { replace: true })
  }, [product, contact, navigate])

  if (!product || !contact) return null

  const productIconUrl = getProductIconUrl(product.id)

  return (
    <div className="page share-link-chat-page">
      <div className="wechat-chat-messages">
        <div className="wechat-message wechat-message--sent">
          <div className="wechat-bubble wechat-bubble--sent">
            <div className="wechat-card-message">
              <div className="wechat-card-message-icon">
                {productIconUrl ? <img src={productIconUrl} alt="" /> : null}
              </div>
              <div className="wechat-card-message-copy">
                <p className="wechat-card-message-name">{product.name}</p>
                <p className="wechat-card-message-desc">{product.description}</p>
                <p className="wechat-card-message-agent">
                  <img src={logoMark} alt="" className="wechat-card-message-agent-mark" />
                  {t('shareLink.flywireAgents')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wechat-chat-input-wrap">
        <div className="wechat-chat-input-placeholder">{t('shareLink.simulatedChat')}</div>
      </div>
    </div>
  )
}
