import type { Payment } from '../../types/domain'

const STEP_LABELS = {
  initiated: 'Payment Initiated',
  received: 'Funds Received',
  processing: 'Processing',
  delivered: 'Delivered to Institution',
  cancelled: 'Cancelled',
} as const

export type StepState = 'green' | 'gray' | 'red' | 'darkGray'

export interface TimelineStep {
  key: keyof typeof STEP_LABELS
  label: string
  labelKey: string
  state: StepState
  timestamp: string | null
}

function getTimestampForLabel(timeline: Payment['timeline'], label: string): string | null {
  const event = timeline.find((e) => e.label === label)
  return event?.timestamp ?? null
}

export function getTimelineSteps(payment: Payment): TimelineStep[] {
  const { status, timeline } = payment
  const ts = (key: keyof typeof STEP_LABELS) =>
    getTimestampForLabel(timeline, STEP_LABELS[key])

  const LABEL_KEYS: Record<keyof typeof STEP_LABELS, string> = {
    initiated: 'timeline.initiated',
    received: 'timeline.fundsReceived',
    processing: 'timeline.processing',
    delivered: 'timeline.delivered',
    cancelled: 'timeline.cancelled',
  }
  const step = (k: keyof typeof STEP_LABELS, state: StepState, timestamp: string | null) => ({
    key: k,
    label: STEP_LABELS[k],
    labelKey: k === 'processing' && status === 'On hold' ? 'timeline.onHold' : LABEL_KEYS[k],
    state,
    timestamp,
  })
  switch (status) {
    case 'Initiated':
      return [
        step('initiated', 'green', ts('initiated')),
        step('received', 'gray', null),
        step('processing', 'gray', null),
        step('delivered', 'gray', null),
      ]
    case 'Guaranteed':
      return [
        step('initiated', 'green', ts('initiated')),
        step('received', 'green', ts('received')),
        step('processing', 'green', ts('processing')),
        step('delivered', 'gray', null),
      ]
    case 'Delivered':
      return [
        step('initiated', 'green', ts('initiated')),
        step('received', 'green', ts('received')),
        step('processing', 'green', ts('processing')),
        step('delivered', 'green', ts('delivered')),
      ]
    case 'On hold':
      return [
        step('initiated', 'green', ts('initiated')),
        step('received', 'green', ts('received')),
        step('processing', 'darkGray', ts('processing')),
        step('delivered', 'gray', null),
      ]
    case 'Cancelled': {
      const cancelledTs = getTimestampForLabel(timeline, 'Payment Cancelled') ?? ts('initiated')
      return [
        step('initiated', 'red', ts('initiated')),
        step('received', 'gray', null),
        step('cancelled', 'red', cancelledTs),
      ]
    }
    default:
      return []
  }
}
