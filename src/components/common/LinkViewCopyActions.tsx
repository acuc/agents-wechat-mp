import { ExternalLink, Link2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../../i18n/useTranslation'
import { copyTextToClipboard } from '../../lib/copyToClipboard'

interface Props {
  url: string
}

export function LinkViewCopyActions({ url }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  function handleView() {
    navigate('/share-link/webview', {
      state: { url, returnTo: location.pathname },
    })
  }

  function handleCopy() {
    void copyTextToClipboard(url)
  }

  return (
    <span className="payment-link-actions">
      <button type="button" className="payment-tracking-link" onClick={handleView}>
        <ExternalLink size={14} aria-hidden />
        {t('paymentDetails.viewLink')}
      </button>
      <button type="button" className="payment-tracking-link" onClick={handleCopy}>
        <Link2 size={14} aria-hidden />
        {t('paymentDetails.copyLink')}
      </button>
    </span>
  )
}
