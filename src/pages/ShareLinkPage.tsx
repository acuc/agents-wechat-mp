import { useEffect, useState } from 'react'
import '../styles/pages/ShareLinkPage.css'
import { ChevronRight } from 'lucide-react'
import { getReferralProducts } from '../lib/data/referralProductsAdapter'
import { productIconMap } from '../lib/productIcons'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from '../i18n/useTranslation'
import type { ReferralProduct } from '../types/domain'

export function ShareLinkPage() {
  const { t } = useTranslation()
  const [products, setProducts] = useState<ReferralProduct[]>([])
  const { openShareSheet } = useAppStore()

  useEffect(() => {
    getReferralProducts().then(setProducts)
  }, [])

  return (
    <div className="page with-tabs">
      <section className="info-box">
        {t('shareLink.tapProduct')}
      </section>
      <section className="card referral-products">
       
        {products.map((product) => (
          <button
            className="product-row"
            key={product.id}
            onClick={() => openShareSheet(product)}
            type="button"
          >
            <div className="product-icon">
              <img
                src={productIconMap[product.id] ?? ''}
                alt=""
                className="product-icon-image"
              />
            </div>
            <div className="product-copy">
              <p className="product-name">{product.name}</p>
              <p className="muted">{product.description}</p>
            </div>
            <ChevronRight size={18} />
          </button>
        ))}
      </section>
    </div>
  )
}
