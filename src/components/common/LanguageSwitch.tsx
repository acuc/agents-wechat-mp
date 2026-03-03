import { useAppStore } from '../../store/useAppStore'
import type { Locale } from '../../i18n/translations'

interface LanguageSwitchProps {
  className?: string
}

export function LanguageSwitch({ className = 'lang-switch' }: LanguageSwitchProps) {
  const locale = useAppStore((s) => s.locale)
  const setLocale = useAppStore((s) => s.setLocale)

  return (
    <div className={className} role="group" aria-label="Language">
      <button
        type="button"
        className={locale === 'en' ? 'active' : ''}
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        className={locale === 'zh' ? 'active' : ''}
        onClick={() => setLocale('zh')}
        aria-pressed={locale === 'zh'}
      >
        中文
      </button>
    </div>
  )
}
