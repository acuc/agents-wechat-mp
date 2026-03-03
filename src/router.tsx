import { Navigate, Route, Routes } from 'react-router-dom'
import type { ReactElement } from 'react'
import { DeviceAdaptiveViewport } from './components/shell/DeviceAdaptiveViewport'
import { MobileShell } from './layouts/MobileShell'
import { ConnectConnectedPage } from './pages/ConnectConnectedPage'
import { ConnectPage } from './pages/ConnectPage'
import { ConnectSigningInPage } from './pages/ConnectSigningInPage'
import { HomePage } from './pages/HomePage'
import { LinkPaymentPage } from './pages/LinkPaymentPage'
import { PaymentDetailsPage } from './pages/PaymentDetailsPage'
import { PaymentsPage } from './pages/PaymentsPage'
import { ProfilePage } from './pages/ProfilePage'
import { SelectContactPage } from './pages/SelectContactPage'
import { ShareLinkChatPage } from './pages/ShareLinkChatPage'
import { ShareLinkPage } from './pages/ShareLinkPage'
import { useAppStore } from './store/useAppStore'

function AppGuard({ children }: { children: ReactElement }) {
  const isConnected = useAppStore((s) => s.isConnected)
  if (!isConnected) return <Navigate replace to="/connect" />
  return children
}

export function AppRouter() {
  return (
    <DeviceAdaptiveViewport>
      <Routes>
        <Route element={<ConnectPage />} path="/connect" />
        <Route element={<ConnectSigningInPage />} path="/connect/signing-in" />
        <Route element={<ConnectConnectedPage />} path="/connect/connected" />
        <Route
          element={
            <AppGuard>
              <MobileShell />
            </AppGuard>
          }
        >
          <Route element={<Navigate replace to="/home" />} path="/" />
          <Route element={<HomePage />} path="/home" />
          <Route element={<ShareLinkPage />} path="/share-link" />
          <Route element={<SelectContactPage />} path="/share-link/select-contact" />
          <Route element={<ShareLinkChatPage />} path="/share-link/chat" />
          <Route element={<PaymentsPage />} path="/payments" />
          <Route element={<LinkPaymentPage />} path="/payments/link" />
          <Route element={<PaymentDetailsPage />} path="/payments/:paymentId" />
          <Route element={<ProfilePage />} path="/profile" />
        </Route>
        <Route element={<Navigate replace to="/connect" />} path="*" />
      </Routes>
    </DeviceAdaptiveViewport>
  )
}
