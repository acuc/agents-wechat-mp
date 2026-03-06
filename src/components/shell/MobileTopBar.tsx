import { ArrowLeft, BatteryMedium, Signal } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import logoMark from '../../assets/F.svg'
import { LanguageSwitch } from '../common/LanguageSwitch'
import { useTranslation } from '../../i18n/useTranslation'
import '../../styles/components/MobileTopBar.css'

function StatusBar() {
  return (
    <div className="mobile-status-bar" role="presentation">
      <span className="mobile-status-time">9:41</span>
      <div className="mobile-status-notch-spacer" aria-hidden />
      <div className="mobile-status-right">
        <Signal size={14} strokeWidth={2.5} className="mobile-status-icon" aria-hidden />
        <span className="mobile-status-5g">5G</span>
        <BatteryMedium size={18} strokeWidth={2} className="mobile-status-battery" aria-hidden />
      </div>
    </div>
  )
}

function getAppBarConfig(
  pathname: string,
  t: (key: string) => string,
  opts?: { paymentId?: string; contactName?: string }
) {
  const paymentId = opts?.paymentId
  const contactName = opts?.contactName
  if (pathname === '/home') {
    return { showLogo: true, titleKey: null, showBack: false, backTo: '/' }
  }
  if (pathname === '/share-link') {
    return { showLogo: false, titleKey: 'topBar.referralLinks', showBack: false, backTo: '/' }
  }
  if (pathname === '/share-link/select-contact') {
    return { showLogo: false, titleKey: 'topBar.selectContact', showBack: true, backTo: '/share-link' }
  }
  if (pathname === '/share-link/chat') {
    return {
      showLogo: false,
      titleKey: null,
      titleRaw: contactName || t('topBar.chat'),
      showBack: true,
      backTo: '/share-link/select-contact',
    }
  }
  if (pathname === '/payments') {
    return { showLogo: false, titleKey: 'topBar.payments', showBack: false, backTo: '/' }
  }
  if (pathname === '/payments/link') {
    return { showLogo: false, titleKey: 'topBar.linkPayment', showBack: true, backTo: '/payments' }
  }
  if (pathname.startsWith('/payments/') && paymentId) {
    return { showLogo: false, titleKey: 'topBar.paymentDetails', showBack: true, backTo: '/payments' }
  }
  if (pathname === '/profile') {
    return { showLogo: false, titleKey: 'topBar.profile', showBack: false, backTo: '/' }
  }
  return { showLogo: true, titleKey: null, showBack: false, backTo: '/' }
}

export function MobileTopBar() {
  const { pathname, state } = useLocation()
  const { paymentId } = useParams()
  const { t } = useTranslation()
  const contactName = (state as { contact?: { name: string } } | null)?.contact?.name
  const config = getAppBarConfig(pathname, t, { paymentId, contactName })
  const { showLogo, titleKey, titleRaw, showBack, backTo } = config
  const title = titleRaw ?? (titleKey ? t(titleKey) : null)

  return (
    <header className="mobile-top-bar">
      <StatusBar />
      <div className="mobile-app-bar">
        <div className="mobile-app-bar-left">
          {showBack ? (
            <Link className="mobile-back-link" to={backTo}>
              <ArrowLeft size={20} aria-hidden />
              <img alt="" className="mobile-brand-mark" src={logoMark} />
              <span>{title}</span>
            </Link>
          ) : showLogo ? (
            <div className="mobile-brand-wrap">
              <img alt="" className="mobile-brand-mark" src={logoMark} />
              <span className="mobile-brand-label">{t('topBar.brand')}</span>
            </div>
          ) : (
            <div className="mobile-brand-wrap">
              <img alt="" className="mobile-brand-mark" src={logoMark} />
              <span className="mobile-app-bar-title">{title}</span>
            </div>
          )}
        </div>
        {pathname === '/home' && <LanguageSwitch className="mobile-lang-switch" />}
      </div>
    </header>
  )
}
