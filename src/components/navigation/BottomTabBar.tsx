import { NavLink } from 'react-router-dom'
import { IconGlyph } from '../common/IconGlyph'
import { useTranslation } from '../../i18n/useTranslation'

const tabKeys = [
  { to: '/home', labelKey: 'tabs.home', icon: 'Home' as const },
  { to: '/share-link', labelKey: 'tabs.shareLink', icon: 'Share2' as const },
  { to: '/payments', labelKey: 'tabs.payments', icon: 'ListCheck' as const },
  { to: '/profile', labelKey: 'tabs.profile', icon: 'UserRound' as const },
]

export function BottomTabBar() {
  const { t } = useTranslation()
  return (
    <nav className="bottom-tabs">
      {tabKeys.map((tab) => (
        <NavLink
          key={tab.to}
          className={({ isActive }) => `bottom-tab ${isActive ? 'active' : ''}`}
          to={tab.to}
        >
          <IconGlyph name={tab.icon} size={24} strokeWidth={2} />
          <span>{t(tab.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
