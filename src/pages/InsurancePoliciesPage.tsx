import { useEffect, useRef, useState } from 'react'
import '../styles/pages/PaymentsPage.css'
import { IconGlyph } from '../components/common/IconGlyph'
import { PolicyListItem } from '../components/policies/PolicyListItem'
import { insurancePolicies } from '../mocks/policies'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from '../i18n/useTranslation'
import type { PolicyStatus } from '../types/domain'

const secondSlotOptions: PolicyStatus[] = ['Unpaid', 'Cancelled']

const statusToKey: Record<PolicyStatus | 'All', string> = {
  All: 'policies.all',
  Active: 'policies.active',
  Processing: 'policies.processing',
  Unpaid: 'policies.unpaid',
  Cancelled: 'policies.cancelled',
}

export function InsurancePoliciesPage() {
  const { t } = useTranslation()
  const { policyFilter, setPolicyFilter, policySearch, setPolicySearch } = useAppStore()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)

  const secondSlot: PolicyStatus =
    policyFilter === 'Unpaid' || policyFilter === 'Cancelled' ? policyFilter : 'Unpaid'

  const visibleFilters: Array<PolicyStatus | 'All'> = [
    'All',
    'Active',
    'Processing',
    secondSlot,
  ]

  const popoverFilters = secondSlotOptions.filter((f) => f !== secondSlot)

  const filtered = insurancePolicies.filter((policy) => {
    const inFilter = policyFilter === 'All' ? true : policy.status === policyFilter
    const term = policySearch.toLowerCase()
    const inSearch =
      policy.studentName.toLowerCase().includes(term) ||
      policy.studentEmail.toLowerCase().includes(term) ||
      policy.provider.toLowerCase().includes(term) ||
      policy.reference.toLowerCase().includes(term) ||
      policy.id.toLowerCase().includes(term)
    return inFilter && inSearch
  })

  const handleMoreClick = () => {
    setPopoverOpen((open) => !open)
  }

  const handlePopoverFilter = (filter: PolicyStatus) => {
    setPolicyFilter(filter)
    setPopoverOpen(false)
  }

  useEffect(() => {
    if (!popoverOpen) return
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (
        popoverRef.current?.contains(target) ||
        moreButtonRef.current?.contains(target)
      )
        return
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
          onChange={(e) => setPolicySearch(e.target.value)}
          placeholder={t('policies.searchPlaceholder')}
          value={policySearch}
        />
      </div>
      <div className="filter-row-wrap">
        <div className="filter-row">
          <div className="filter-row-scroll">
            {visibleFilters.map((filter) => (
              <button
                className={policyFilter === filter ? 'active' : ''}
                key={filter}
                onClick={() => setPolicyFilter(filter)}
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
            aria-label={t('policies.moreFilters')}
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
                className={policyFilter === filter ? 'active' : ''}
                onClick={() => handlePopoverFilter(filter)}
              >
                {t(statusToKey[filter])}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <section className="card">
        {filtered.map((policy) => (
          <PolicyListItem key={policy.id} policy={policy} />
        ))}
      </section>
      <p className="payments-list-end">{t('policies.noMorePolicies')}</p>
    </div>
  )
}
