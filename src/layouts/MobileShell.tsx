import { Outlet, useLocation } from 'react-router-dom'
import { MobileTopBar } from '../components/shell/MobileTopBar'
import { BottomTabBar } from '../components/navigation/BottomTabBar'
import { ShareCardSheet } from '../components/share/ShareCardSheet'
import { useAppStore } from '../store/useAppStore'

export function MobileShell() {
  const { pathname } = useLocation()
  const showTabs =
    !pathname.startsWith('/payments/') && !pathname.startsWith('/share-link/chat')
  const { shareSheetProduct, closeShareSheet } = useAppStore()

  return (
    <div className="mobile-app">
      <MobileTopBar />
      <div className="mobile-app-content">
        <Outlet />
      </div>
      {showTabs ? <BottomTabBar /> : null}
      {shareSheetProduct ? (
        <ShareCardSheet onClose={closeShareSheet} product={shareSheetProduct} />
      ) : null}
    </div>
  )
}
