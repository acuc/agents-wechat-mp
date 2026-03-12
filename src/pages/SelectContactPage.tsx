import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'
import type { ReferralProduct } from '../types/domain'
import { getProductIconUrl } from '../lib/productIcons'
import { contacts } from '../mocks/contacts'
import '../styles/pages/SelectContactPage.css'

export function SelectContactPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const product = (location.state as { product?: ReferralProduct } | null)?.product ?? null
  const [search, setSearch] = useState('')
  const [modalContact, setModalContact] = useState<{ id: string; name: string } | null>(null)

  const filteredContacts = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return contacts
    return contacts.filter((c) => c.name.toLowerCase().includes(q))
  }, [search])

  const openConfirm = (contact: { id: string; name: string }) => {
    setModalContact(contact)
  }

  const closeModal = () => {
    setModalContact(null)
  }

  const handleShareReferralLink = () => {
    if (!modalContact || !product) return
    closeModal()
    navigate('/share-link/chat', { state: { product, contact: modalContact } })
  }

  useEffect(() => {
    if (!product) navigate('/share-link', { replace: true })
  }, [product, navigate])

  if (!product) return null

  const productIconUrl = getProductIconUrl(product.id)

  return (
    <div className="page select-contact-page">
      <div className="select-contact-search-wrap">
        <Search size={18} className="select-contact-search-icon" aria-hidden />
        <input
          type="search"
          className="select-contact-search"
          placeholder={t('selectContact.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search contacts"
        />
      </div>
      <p className="select-contact-label">{t('selectContact.sendTo')}</p>
      <div className="select-contact-list">
        {filteredContacts.map((contact) => (
          <button
            key={contact.id}
            type="button"
            className="select-contact-row"
            onClick={() => openConfirm(contact)}
          >
            <span className="select-contact-avatar" aria-hidden />
            <span className="select-contact-name">{contact.name}</span>
          </button>
        ))}
      </div>

      {modalContact && (
        <div
          className="select-contact-modal-overlay"
          onClick={closeModal}
          onKeyDown={(e) => e.key === 'Escape' && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="select-contact-modal-title"
        >
          <div
            className="select-contact-modal"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === 'Escape' && closeModal()}
          >
            <h3 id="select-contact-modal-title" className="select-contact-modal-title">
                  {t('selectContact.shareConfirm')} {modalContact.name}?
                </h3>
                <div className="sheet-card">
                  <div className="sheet-card-icon">
                    {productIconUrl ? <img src={productIconUrl} alt="" /> : null}
                  </div>
                  <div className="sheet-card-copy">
                    <p className="sheet-card-name">{t(`shareLink.product.${product.id}.name`) || product.name}</p>
                    <p className="sheet-card-desc">{t(`shareLink.product.${product.id}.description`) || product.description}</p>
                  </div>
                </div>
                <div className="select-contact-modal-actions">
                  <button
                    type="button"
                    className="select-contact-modal-btn cancel"
                    onClick={closeModal}
                  >
                    {t('selectContact.cancel')}
                  </button>
                  <button
                    type="button"
                    className="select-contact-modal-btn primary"
                    onClick={handleShareReferralLink}
                  >
                    {t('selectContact.shareReferralLink')}
                  </button>
                </div>
          </div>
        </div>
      )}
    </div>
  )
}
