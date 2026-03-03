import logoMark from '../../assets/F.svg'

interface Props {
  title?: string
  showLogo?: boolean
}

export function Header({ title, showLogo = true }: Props) {
  return (
    <header className="app-header">
      <div className="brand-row">
        {showLogo ? (
          <div className="brand-wrap">
            <img alt="Flywire" className="brand-mark-image" src={logoMark} />
            <span className="brand-label">Flywire Partners</span>
          </div>
        ) : (
          <div className="page-heading">{title ?? ''}</div>
        )}
        <div className="lang-switch">
          <span className="active">EN</span>
          <span>中文</span>
        </div>
      </div>
    </header>
  )
}
