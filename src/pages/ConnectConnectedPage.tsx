import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/ConnectPage.css'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from '../i18n/useTranslation'
import { LanguageSwitch } from '../components/common/LanguageSwitch'
import logoFull from '../assets/logo-full.svg'

const successAsset = '/success-check.svg'

export function ConnectConnectedPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const setConnected = useAppStore((s) => s.setConnected)

  useEffect(() => {
    setConnected(true)
    const id = window.setTimeout(() => navigate('/home'), 1200)
    return () => window.clearTimeout(id)
  }, [navigate, setConnected])

  return (
    <main className="page connect-page center login-flow-page">
      <div className="login-lang-wrap">
        <LanguageSwitch />
      </div>
      <img alt="Flywire logo" className="connect-logo" src={logoFull} />
      <p className="muted center login-subtitle">{t('connect.subtitle')}</p>
      <section className="status-stage">
        <img alt="Connected success" className="status-graphic" src={successAsset} />
        <p className="status-copy success">{t('connect.connected')}</p>
      </section>
    </main>
  )
}
