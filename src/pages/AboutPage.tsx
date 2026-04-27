import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'
import '../styles/pages/AboutPage.css'

export function AboutPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="page about-page">
      <article className="about-page-content card">
        <h1 className="about-page-title">{t('profile.aboutPageTitle')}</h1>
        <p className="about-page-intro">{t('profile.aboutPageIntro')}</p>
        <ul className="about-page-list">
          <li>
            <strong>{t('profile.aboutPageShareHeading')}</strong>
          </li>
          <li>
            <strong>{t('profile.aboutPagePaymentsHeading')}</strong>
          </li>
        </ul>
        <p className="about-page-closing">{t('profile.aboutPageClosing')}</p>
        <button
          className="connect-back-link"
          onClick={() => navigate('/profile')}
          type="button"
        >
          {t('connect.back')}
        </button>
      </article>
    </div>
  )
}
