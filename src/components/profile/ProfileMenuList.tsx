import { ChevronRight } from 'lucide-react'
import { IconGlyph } from '../common/IconGlyph'
import { useTranslation } from '../../i18n/useTranslation'

const items = [
  { icon: 'CircleHelp' as const, labelKey: 'profile.helpCenter' as const },
  { icon: 'Settings' as const, labelKey: 'profile.privacySecurity' as const },
  { icon: 'Info' as const, labelKey: 'profile.about' as const, suffix: 'v1.0.0' },
]

export function ProfileMenuList() {
  const { t } = useTranslation()
  return (
    <section className="card profile-menu">
      {items.map((item) => (
        <button className="menu-item" key={item.labelKey} type="button">
          <div className="menu-left">
            <IconGlyph name={item.icon} size={18} />
            <span>{t(item.labelKey)}</span>
          </div>
          <div className="menu-right">
            {item.suffix ? <span className="muted">{item.suffix}</span> : null}
            <ChevronRight size={16} />
          </div>
        </button>
      ))}
    </section>
  )
}
