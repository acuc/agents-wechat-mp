import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { Payment, PaymentStatus } from '../../types/domain'
import { useTranslation } from '../../i18n/useTranslation'

const statusToKey: Record<PaymentStatus, string> = {
  Delivered: 'payments.delivered',
  Cancelled: 'payments.cancelled',
  'On hold': 'payments.onHold',
  Initiated: 'payments.initiated',
  Guaranteed: 'payments.guaranteed',
}

function formatAmountWithDecimals(amount: number): ReactNode {
  const str = amount.toLocaleString('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const [whole, decimals] = str.split('.')
  return (
    <>
      {whole}.<span className="payment-amount-decimals">{decimals}</span>
    </>
  )
}

interface Props {
  payment: Payment
}

export function PaymentListItem({ payment }: Props) {
  const { t } = useTranslation()
  return (
    <Link className="payment-item" to={`/payments/${payment.id}`}>
      <div className="payment-item-grid">
        <div className="payment-item-main">
          <div className="payment-top">
            <span className="muted date-xs">{payment.date}</span>
            <span className={`status-pill status-${payment.status.toLowerCase().replace(' ', '-')}`}>
              {t(statusToKey[payment.status])}
            </span>
          </div>
          <div className="payment-main">
            <div className="payment-main-content">
              <p className="payment-student">{payment.studentName}</p>
              <p className="payment-amount">
                {payment.amountToCurrency} {formatAmountWithDecimals(payment.amountTo)}
              </p>
              
            </div>
            <div className="payment-secondary-content">
              <p className="muted payment-inst">{payment.institution}</p>
              <p className="muted payment-id">{payment.id}</p>
            </div>
            
          </div>
        </div>
        <div className="payment-chevron-wrap">
          <ChevronRight size={24} />
        </div>
      </div>
    </Link>
  )
}
