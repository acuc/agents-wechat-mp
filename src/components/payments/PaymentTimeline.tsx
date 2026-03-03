import { MessageSquareWarning } from 'lucide-react'
import type { Payment } from '../../types/domain'
import { useTranslation } from '../../i18n/useTranslation'
import { getTimelineSteps } from './paymentTimelineSteps'

interface Props {
  payment: Payment
  onContactSupport?: () => void
}

export function PaymentTimeline({ payment, onContactSupport }: Props) {
  const { t } = useTranslation()
  const steps = getTimelineSteps(payment)
  const isCancelled = payment.status === 'Cancelled'

  return (
    <section className="card">
      <p className="section-title">{t('paymentDetails.timeline')}</p>
      <div className="timeline">
        {steps.map((step, index) => (
          <div
            className={`timeline-row ${step.timestamp == null ? 'timeline-row--pending' : ''}`}
            key={`${step.key}-${index}`}
          >
            <span className={`timeline-dot timeline-dot--${step.state}`} />
            <div className="timeline-step-content">
              <p className="timeline-step-label">{t(step.labelKey)}</p>
              <p className="timeline-step-time">{step.timestamp ?? '--'}</p>
            </div>
          </div>
        ))}
      </div>
      {isCancelled && (
        <div className="timeline-actions">
          <button
            type="button"
            className="btn-contact-support"
            onClick={onContactSupport}
          >
            <MessageSquareWarning size={18} /> {t('paymentDetails.contactSupport')}
          </button>
        </div>
      )}
    </section>
  )
}
