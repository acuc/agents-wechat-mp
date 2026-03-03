import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { PaymentListItem } from '../components/payments/PaymentListItem'
import { payments } from '../mocks/payments'
import { IconGlyph } from '../components/common/IconGlyph'
import { useTranslation } from '../i18n/useTranslation'
import '../styles/pages/HomePage.css'

const placeholderCompanies = ['Horizon Global HQ', 'Pacific Education Partners', 'Asia Student Services']

const homeAvatar = 'http://localhost:3845/assets/b79c327e8d88f20089c8832909afc540bd071505.png'
const fallbackBanner = 'http://localhost:3845/assets/0050d6b9f7f8a6377a41d412d75da4ba30e3012b.png'
const bannerModules = import.meta.glob('../assets/banner*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export function HomePage() {
  const { t } = useTranslation()
  const localBanners = useMemo(() => Object.keys(bannerModules).sort().map((key) => bannerModules[key]), [])
  const banners = localBanners.length > 0 ? localBanners : [fallbackBanner]
  const [activeBannerIdx, setActiveBannerIdx] = useState(0)
  const [companySelectorOpen, setCompanySelectorOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(placeholderCompanies[0])
  const companySelectorRef = useRef<HTMLDivElement>(null)
  const welcomeChevronRef = useRef<HTMLButtonElement>(null)

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company)
    setCompanySelectorOpen(false)
  }

  useEffect(() => {
    if (banners.length < 2) return
    const timer = window.setInterval(() => {
      setActiveBannerIdx((idx) => (idx + 1) % banners.length)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [banners.length])

  useEffect(() => {
    if (!companySelectorOpen) return
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (
        companySelectorRef.current?.contains(target) ||
        welcomeChevronRef.current?.contains(target)
      ) return
      setCompanySelectorOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [companySelectorOpen])

  return (
    <div className="page with-tabs">
      <div className="welcome-row-wrap">
        <section className="welcome-row">
          <img alt="avatar" className="avatar" src={homeAvatar} />
          <div className="welcome-copy">
            <p className="welcome-title">
              <span className="welcome-light">{t('home.welcome')}</span>
              <span className="welcome-strong">Zhang Wei</span>
            </p>
            <p className="muted">{selectedCompany}</p>
          </div>
          <button
            ref={welcomeChevronRef}
            type="button"
            className="welcome-chevron-btn"
            onClick={() => setCompanySelectorOpen((open) => !open)}
            aria-expanded={companySelectorOpen}
            aria-haspopup="listbox"
            aria-label={t('home.selectCompany')}
          >
            <ChevronDown size={22} />
          </button>
        </section>
        {companySelectorOpen ? (
          <div
            ref={companySelectorRef}
            className="company-selector-popover"
            role="listbox"
            aria-label="Companies"
          >
            {placeholderCompanies.map((company) => (
              <button
                key={company}
                type="button"
                role="option"
                aria-selected={selectedCompany === company}
                className={`company-selector-option ${selectedCompany === company ? 'active' : ''}`}
                onClick={() => handleSelectCompany(company)}
              >
                {company}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <section className="home-banner" aria-roledescription="carousel" aria-label="Promotional banners">
        <div
          className="home-banner-track"
          style={{
            width: `${banners.length * 100}%`,
            transform: `translateX(${-(activeBannerIdx / banners.length) * 100}%)`,
          }}
        >
          {banners.map((src, i) => (
            <div
              className="home-banner-slide"
              key={i}
              style={{ flexBasis: `${100 / banners.length}%` }}
              aria-hidden={i !== activeBannerIdx}
            >
              <img alt="" className="home-banner-image" src={src} />
            </div>
          ))}
        </div>
      </section>
      <div className="home-banner-dots" role="tablist" aria-label="Banner position">
        {banners.map((_, idx) => (
          <span
            className={idx === activeBannerIdx ? 'active' : ''}
            key={`banner-dot-${idx}`}
            role="tab"
            aria-selected={idx === activeBannerIdx}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
      <section className="quick-links">
        <p className="section-title quick-links-title" style={{margin:0, padding:0}}>{t('home.quickLinks')}</p>
        <Link className="quick-link blue" to="/share-link">
          <div className="quick-link-left">
            <div className="quick-link-icon blue">
              <IconGlyph name="Share2" size={28} strokeWidth={2} />
            </div>
            <div className="quick-link-content">
              <p className="quick-link-title">{t('home.shareReferralLink')}</p>
              <p className="quick-link-description">{t('home.shareReferralDesc')}</p>
            </div>
          </div>
          <ChevronRight size={24} style={{ color: 'var(--text-dark)' }} />
        </Link>
        <Link className="quick-link green" to="/payments">
          <div className="quick-link-left">
            <div className="quick-link-icon green">
              <IconGlyph name="ListCheck" size={28} strokeWidth={2} />
            </div>
            <div className="quick-link-content">
              <p className="quick-link-title">{t('home.viewPayments')}</p>
              <p className="quick-link-description">{t('home.viewPaymentsDesc')}</p>
            </div>
          </div>
          <ChevronRight size={24} style={{ color: 'var(--text-dark)' }} />
        </Link>
        <Link className="quick-link orange" to="/payments">
          <div className="quick-link-left">
            <div className="quick-link-icon orange">
              <IconGlyph name="Link" size={28} strokeWidth={2} />
            </div>
            <div className="quick-link-content">
              <p className="quick-link-title">{t('home.linkPayment')}</p>
              <p className="quick-link-description">{t('home.linkPaymentDesc')}</p>
            </div>
          </div>
          <ChevronRight size={24} style={{ color: 'var(--text-dark)' }} />
        </Link>
      </section>

      <section className="card recent-payments">
        <div className="row-between section-header recent-header">
          <p className="section-title" style={{margin:0, padding:0}}>{t('home.recentPayments')}</p>
          <Link className="recent-link" to="/payments">
            {t('home.viewAll')} <IconGlyph name="ArrowRight" size={16} />
          </Link>
        </div>
        {payments.slice(0, 3).map((payment) => (
          <PaymentListItem key={payment.id} payment={payment} />
        ))}
      </section>
    </div>
  )
}
