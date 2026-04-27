import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'
import '../styles/pages/ShareLinkWebviewPage.css'

export function ShareLinkWebviewPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const url = (location.state as { url?: string } | null)?.url
  const returnTo =
    (location.state as { returnTo?: string } | null)?.returnTo ?? '/share-link'

  useEffect(() => {
    if (!url) navigate(returnTo, { replace: true })
  }, [url, navigate, returnTo])

  if (!url) return null

  return (
    <div className="share-link-webview">
      <iframe className="share-link-webview-frame" src={url} title={t('topBar.referralWebview')} />
    </div>
  )
}
