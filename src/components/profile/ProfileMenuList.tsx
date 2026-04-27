import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IconGlyph } from '../common/IconGlyph'
import { useTranslation } from '../../i18n/useTranslation'

const linkItems = [
  {
    icon: 'CircleHelp' as const,
    labelKey: 'profile.helpCenter' as const,
    href: 'https://flywireagents.zendesk.com/',
  },
  {
    icon: 'ShieldCheck' as const,
    labelKey: 'profile.privacyPolicy' as const,
    href: 'https://www.flywire.com/legal/privacy-policy',
  },
  {
    icon: 'FileText' as const,
    labelKey: 'profile.agentsTermsOfUse' as const,
    href: 'https://www.flywire.com/legal/agents-terms-of-use',
  },
]

export function ProfileMenuList() {
  const { t } = useTranslation()
  return (
    <section className="card profile-menu">
      {linkItems.map((item) => (
        <a
          className="menu-item"
          href={item.href}
          key={item.labelKey}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="menu-left">
            <IconGlyph name={item.icon} size={18} />
            <span>{t(item.labelKey)}</span>
          </div>
          <div className="menu-right">
            <ChevronRight size={16} />
          </div>
        </a>
      ))}
      <Link className="menu-item" to="/profile/about">
        <div className="menu-left">
          <IconGlyph name="Info" size={18} />
          <span>{t('profile.about')}</span>
        </div>
        <div className="menu-right">
          <ChevronRight size={16} />
        </div>
      </Link>
    </section>
  )
}
