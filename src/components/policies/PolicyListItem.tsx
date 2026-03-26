import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { currencyBeforeAmount } from '../../lib/currencySymbol'
import type { InsurancePolicy, PolicyStatus } from '../../types/domain'
import { useTranslation } from '../../i18n/useTranslation'

const statusToKey: Record<PolicyStatus, string> = {
  Active: 'policies.statusActive',
  Processing: 'policies.statusProcessing',
  Unpaid: 'policies.statusUnpaid',
  Cancelled: 'policies.statusCancelled',
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
  policy: InsurancePolicy
}

export function PolicyListItem({ policy }: Props) {
  const { t } = useTranslation()
  const statusClass = policy.status.toLowerCase()
  return (
    <Link className="payment-item" to={`/policies/${policy.id}`}>
      <div className="payment-item-grid">
        <div className="payment-item-main">
          <div className="payment-top">
            <span className="muted date-xs">
              {policy.startDate} – {policy.endDate}
            </span>
            <span className={`status-pill status-${statusClass}`}>{t(statusToKey[policy.status])}</span>
          </div>
          <div className="payment-main">
            <div className="payment-main-content">
              <p className="payment-student">{policy.studentName}</p>
              <p className="payment-amount">
                {currencyBeforeAmount(policy.currency)}
                {formatAmountWithDecimals(policy.amount)}
              </p>
            </div>
            <div className="payment-secondary-content">
              <p className="muted payment-inst">{policy.provider}</p>
              <p className="muted payment-id">{policy.reference}</p>
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
