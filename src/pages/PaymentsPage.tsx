import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/PaymentsPage.css'
import { IconGlyph } from '../components/common/IconGlyph'
import { PaymentListItem } from '../components/payments/PaymentListItem'
import { payments } from '../mocks/payments'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from '../i18n/useTranslation'
import type { PaymentStatus } from '../types/domain'

const secondSlotOptions: PaymentStatus[] = ['Delivered', 'Cancelled', 'On hold']

const statusToKey: Record<PaymentStatus | 'All', string> = {
  All: 'payments.all',
  Delivered: 'payments.delivered',
  Cancelled: 'payments.cancelled',
  'On hold': 'payments.onHold',
  Initiated: 'payments.initiated',
  Guaranteed: 'payments.guaranteed',
}

export function PaymentsPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { paymentFilter, setPaymentFilter, paymentSearch, setPaymentSearch } = useAppStore()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)

  const secondSlot: PaymentStatus =
    paymentFilter === 'Cancelled' || paymentFilter === 'On hold'
      ? paymentFilter
      : 'Delivered'

  const visibleFilters: Array<PaymentStatus | 'All'> = [
    'All',
    secondSlot,
    'Initiated',
    'Guaranteed',
  ]

  const popoverFilters = secondSlotOptions.filter((f) => f !== secondSlot)

  const filtered = payments.filter((payment) => {
    const inFilter = paymentFilter === 'All' ? true : payment.status === paymentFilter
    const term = paymentSearch.toLowerCase()
    const inSearch =
      payment.studentName.toLowerCase().includes(term) ||
      payment.institution.toLowerCase().includes(term) ||
      payment.id.toLowerCase().includes(term)
    return inFilter && inSearch
  })

  const handleMoreClick = () => {
    setPopoverOpen((open) => !open)
  }

  const handlePopoverFilter = (filter: PaymentStatus) => {
    setPaymentFilter(filter)
    setPopoverOpen(false)
  }

  useEffect(() => {
    if (!popoverOpen) return
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (
        popoverRef.current?.contains(target) ||
        moreButtonRef.current?.contains(target)
      ) return
      setPopoverOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [popoverOpen])

  return (
    <div className="page with-tabs">
      <div className="search-row">
        <IconGlyph name="Search" size={16} />
        <input
          onChange={(e) => setPaymentSearch(e.target.value)}
          placeholder={t('payments.searchPlaceholder')}
          value={paymentSearch}
        />
      </div>
      <div className="filter-row-wrap">
        <div className="filter-row">
          <div className="filter-row-scroll">
            {visibleFilters.map((filter) => (
              <button
                className={paymentFilter === filter ? 'active' : ''}
                key={filter}
                onClick={() => setPaymentFilter(filter)}
                type="button"
              >
                {t(statusToKey[filter])}
              </button>
            ))}
          </div>
          <button
            ref={moreButtonRef}
            type="button"
            className="filter-row-more"
            onClick={handleMoreClick}
            aria-expanded={popoverOpen}
            aria-haspopup="true"
            aria-label={t('payments.moreFilters')}
          >
            <IconGlyph name="EllipsisVertical" size={16} />
          </button>
        </div>
        {popoverOpen ? (
          <div
            ref={popoverRef}
            className="filter-popover"
            role="menu"
            aria-label="Additional filters"
          >
            {popoverFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                role="menuitem"
                className={paymentFilter === filter ? 'active' : ''}
                onClick={() => handlePopoverFilter(filter)}
              >
                {t(statusToKey[filter])}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <button
        className="link-payment-btn" style={{border:'none'}}
        type="button"
        onClick={() => navigate('/payments/link')}
      >
        <IconGlyph name="Link" size={16} />
        {t('payments.linkPayment')}
      </button>
      <section className="card">
        {filtered.map((payment) => (
          <PaymentListItem key={payment.id} payment={payment} />
        ))}
      </section>
    </div>
  )
}
