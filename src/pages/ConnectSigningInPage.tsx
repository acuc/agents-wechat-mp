import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/ConnectPage.css'
import { useTranslation } from '../i18n/useTranslation'
import { LanguageSwitch } from '../components/common/LanguageSwitch'
import logoFull from '../assets/logo-full.svg'

const spinnerAsset = '/spinner.svg'

export function ConnectSigningInPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const id = window.setTimeout(() => navigate('/connect/connected'), 1200)
    return () => window.clearTimeout(id)
  }, [navigate])

  return (
    <main className="page connect-page center login-flow-page">
      <div className="login-lang-wrap">
        <LanguageSwitch />
      </div>
      <img alt="Flywire logo" className="connect-logo" src={logoFull} />
      <p className="muted center login-subtitle">{t('connect.subtitle')}</p>
      <section className="status-stage">
        <img alt="Connecting spinner" className="status-graphic status-spinner" src={spinnerAsset} />
        <p className="status-copy">{t('connect.verifying')}</p>
      </section>
    </main>
  )
}
