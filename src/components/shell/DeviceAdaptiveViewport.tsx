import { useMemo } from 'react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function DeviceAdaptiveViewport({ children }: Props) {
  const isDesktop = useMemo(() => {
    if (typeof window === 'undefined') return false
    const desktopWidth = window.matchMedia('(min-width: 900px)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    return desktopWidth && finePointer
  }, [])

  if (!isDesktop) {
    return <div className="mobile-shell">{children}</div>
  }

  return (
    <div className="desktop-stage">
      <div className="iphone-mock">
        <div className="iphone-notch" />
        <div className="iphone-screen">{children}</div>
      </div>
    </div>
  )
}
