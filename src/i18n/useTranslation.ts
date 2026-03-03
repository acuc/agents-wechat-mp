import { useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { getTranslation, type Locale } from './translations'

export function useTranslation() {
  const locale = useAppStore((s) => s.locale)
  const setLocale = useAppStore((s) => s.setLocale)
  const t = useCallback((key: string) => getTranslation(locale, key), [locale])
  return { t, locale, setLocale }
}
