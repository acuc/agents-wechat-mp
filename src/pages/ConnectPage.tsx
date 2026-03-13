import { useNavigate } from 'react-router-dom'
import '../styles/pages/ConnectPage.css'
import { useState, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from '../i18n/useTranslation'
import { LanguageSwitch } from '../components/common/LanguageSwitch'
import logoFull from '../assets/logo-full.svg'

export function ConnectPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { connectMethod, setConnectMethod, setAgentAccountName } = useAppStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [credentialsError, setCredentialsError] = useState('')
  const [show2FA, setShow2FA] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [twoFactorError, setTwoFactorError] = useState('')
  const twoFAInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const continueFlow = () => {
    navigate('/connect/signing-in')
  }

  const onSubmitCredentials = () => {
    setCredentialsError('')
    const nextUsernameError = username.trim().length === 0 ? t('connect.usernameRequired') : ''
    const nextPasswordError = password.trim().length === 0 ? t('connect.passwordRequired') : ''
    setUsernameError(nextUsernameError)
    setPasswordError(nextPasswordError)
    const hasErrors = !!nextUsernameError || !!nextPasswordError
    if (hasErrors) return
    if (password.trim().toLowerCase() === 'invalid') {
      setCredentialsError(t('connect.invalidCredentials'))
      return
    }
    if (password.trim().toLowerCase() === 'enforced2fa') {
      setCredentialsError(t('connect.enforced2faMessage'))
      return
    }
    if (password.trim().toLowerCase() === '2fa') {
      setShow2FA(true)
      setTwoFactorCode('')
      setTwoFactorError('')
      return
    }
    setAgentAccountName(username.trim())
    continueFlow()
  }

  const onSubmit2FA = () => {
    setTwoFactorError('')
    if (twoFactorCode.trim() === '111111') {
      setTwoFactorError(t('connect.twoFactorInvalidCode'))
      return
    }
    if (twoFactorCode.trim().length === 0) return
    setAgentAccountName(username.trim())
    continueFlow()
  }

  const twoFADigits = twoFactorCode.replace(/\D/g, '').slice(0, 6).split('')
  while (twoFADigits.length < 6) twoFADigits.push('')

  const setTwoFADigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = twoFADigits.slice()
    next[index] = digit
    setTwoFactorCode(next.join(''))
    setTwoFactorError('')
    if (digit && index < 5) twoFAInputRefs.current[index + 1]?.focus()
  }

  const handleTwoFAKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !twoFADigits[index] && index > 0) {
      twoFAInputRefs.current[index - 1]?.focus()
      const next = twoFADigits.slice()
      next[index - 1] = ''
      setTwoFactorCode(next.join(''))
    }
  }

  const handleTwoFAPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    setTwoFactorCode(pasted)
    setTwoFactorError('')
    const focusIndex = Math.min(pasted.length, 5)
    twoFAInputRefs.current[focusIndex]?.focus()
  }

  return (
    <main
      className="page app-scroll connect-page login-flow-page"
    >
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
          <div className="qr-instructions">
            <h3 className="qr-title">{t('connect.qrTitle')}</h3>
            <ol className="qr-steps">
              <li>
                {t('connect.step1Prefix')}
                <span>{t('connect.agentsDashboard')}</span>
              </li>
              <li>{t('connect.step2')}</li>
              <li>{t('connect.step3')}</li>
            </ol>
          </div>
          <button type="button" className="primary-btn connect-submit" onClick={continueFlow}>
            {t('connect.scan')}
          </button>
        </section>
      ) : show2FA ? (
        <section className="credentials-panel-v2">
          <p className="credentials-title">{t('connect.twoFactorInstruction')}</p>
          <div className="twofa-digits-wrap" onPaste={handleTwoFAPaste}>
            <div className="twofa-digits">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={(el) => { twoFAInputRefs.current[i] = el }}
                  className={`twofa-digit ${twoFactorError ? 'input-error' : ''}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={twoFADigits[i]}
                  onChange={(e) => setTwoFADigit(i, e.target.value)}
                  onKeyDown={(e) => handleTwoFAKeyDown(i, e)}
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>
            {twoFactorError ? <p className="field-error">{twoFactorError}</p> : null}
          </div>
          <div style={{ paddingTop: '1.2rem' }}>
            <button className="primary-btn connect-submit" onClick={onSubmit2FA} type="button">
              {t('connect.signIn')}
            </button>
            <button
              type="button"
              className="connect-back-link"
              onClick={() => { setShow2FA(false); setTwoFactorCode(''); setTwoFactorError('') }}
            >
              {t('connect.back')}
            </button>
          </div>
        </section>
      ) : (
        <section className="credentials-panel-v2">
          <p className="credentials-title">{t('connect.signInTitle')}</p>
          <div>
            <input
              className={usernameError ? 'input-error' : ''}
              onChange={(e) => { setUsername(e.target.value); setCredentialsError('') }}
              placeholder={t('connect.username')}
              type="text"
              value={username}
            />
            {usernameError ? <p className="field-error">{usernameError}</p> : null}
          </div>
          <div style={{ paddingBottom: '1.6rem' }}>
            <input
              className={passwordError ? 'input-error' : ''}
              onChange={(e) => { setPassword(e.target.value); setCredentialsError('') }}
              placeholder={t('connect.password')}
              type="password"
              value={password}
            />
            {passwordError ? <p className="field-error">{passwordError}</p> : null}
            {credentialsError ? <p className="field-error">{credentialsError}</p> : null}
          </div>
          <button className="primary-btn connect-submit" onClick={onSubmitCredentials} type="button">
            {t('connect.signIn')}
          </button>
        </section>
      )}
    </main>
  )
}
