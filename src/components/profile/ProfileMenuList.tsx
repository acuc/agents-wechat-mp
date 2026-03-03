import { ChevronRight } from 'lucide-react'
import { IconGlyph } from '../common/IconGlyph'

const items = [
  { icon: 'Bell' as const, label: 'Notifications', suffix: '3 unread' },
  { icon: 'CircleHelp' as const, label: 'Help Center' },
  { icon: 'Settings' as const, label: 'Privacy & Security' },
  { icon: 'Info' as const, label: 'About', suffix: 'v1.0.0' },
]

export function ProfileMenuList() {
  return (
    <section className="card profile-menu">
      {items.map((item) => (
        <button className="menu-item" key={item.label} type="button">
          <div className="menu-left">
            <IconGlyph name={item.icon} size={18} />
            <span>{item.label}</span>
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
