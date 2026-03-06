import type { Payment } from '../../types/domain'
import { useTranslation } from '../../i18n/useTranslation'
import { getTimelineSteps } from './paymentTimelineSteps'

interface Props {
  payment: Payment
}

export function PaymentTimeline({ payment }: Props) {
  const { t } = useTranslation()
  const steps = getTimelineSteps(payment)

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
    </section>
  )
}
