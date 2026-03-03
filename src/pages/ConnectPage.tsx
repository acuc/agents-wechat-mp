import { useNavigate } from 'react-router-dom'
import '../styles/pages/ConnectPage.css'
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from '../i18n/useTranslation'
import { LanguageSwitch } from '../components/common/LanguageSwitch'
import logoFull from '../assets/logo-full.svg'

const qrCodeAsset = 'http://localhost:3845/assets/655066b3823f501f5e325a1a6eec88df3b8b8993.svg'

export function ConnectPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { connectMethod, setConnectMethod } = useAppStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const continueFlow = () => {
    navigate('/connect/signing-in')
  }

  const onSubmitCredentials = () => {
    const nextUsernameError = username.trim().length === 0 ? t('connect.usernameRequired') : ''
    const nextPasswordError = password.trim().length === 0 ? t('connect.passwordRequired') : ''
    setUsernameError(nextUsernameError)
    setPasswordError(nextPasswordError)
    const hasErrors = !!nextUsernameError || !!nextPasswordError
    if (!hasErrors) continueFlow()
  }

  return (
    <main className="page app-scroll connect-page login-flow-page">
      <div className="login-lang-wrap">
        <LanguageSwitch />
      </div>
      <img alt="Flywire logo" className="connect-logo" src={logoFull} />
      <p className="muted center login-subtitle">{t('connect.subtitle')}</p>

      <div className="connect-methods">
        <span
          aria-hidden
          className={`connect-tab-indicator ${connectMethod === 'credentials' ? 'is-credentials' : ''}`}
        />
        <button
          aria-selected={connectMethod === 'qr'}
          className={`connect-tab ${connectMethod === 'qr' ? 'active' : ''}`}
          onClick={() => setConnectMethod('qr')}
          role="tab"
          type="button"
        >
          {t('connect.scanQR')}
        </button>
        <button
          aria-selected={connectMethod === 'credentials'}
          className={`connect-tab ${connectMethod === 'credentials' ? 'active' : ''}`}
          onClick={() => setConnectMethod('credentials')}
          role="tab"
          type="button"
        >
          {t('connect.usernamePassword')}
        </button>
      </div>

      {connectMethod === 'qr' ? (
        <section className="qr-panel-v2">
          <button className="qr-code-hitbox" onClick={continueFlow} type="button">
            <img alt="Scan QR code" className="qr-code-image" src={qrCodeAsset} />
          </button>
          <div className="qr-instructions">
            <h3 className="qr-title">{t('connect.qrTitle')}</h3>
            <ol className="qr-steps">
              <li>{t('connect.step1')}</li>
              <li>{t('connect.step2')}</li>
              <li>{t('connect.step3')}</li>
            </ol>
          </div>
        </section>
      ) : (
        <section className="credentials-panel-v2">
          <p className="credentials-title">{t('connect.signInTitle')}</p>
          <div>
            <input
              className={usernameError ? 'input-error' : ''}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('connect.username')}
              type="text"
              value={username}
            />
            {usernameError ? <p className="field-error">{usernameError}</p> : null}
          </div>
          <div style={{ paddingBottom: '1.6rem' }}>
            <input
              className={passwordError ? 'input-error' : ''}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('connect.password')}
              type="password"
              value={password}
            />
            {passwordError ? <p className="field-error">{passwordError}</p> : null}
          </div>
          <button className="primary-btn connect-submit" onClick={onSubmitCredentials} type="button">
            {t('connect.signIn')}
          </button>
        </section>
      )}
    </main>
  )
}
