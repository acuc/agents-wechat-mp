import { referralProducts } from '../../mocks/products'
import type { ReferralProduct } from '../../types/domain'

export async function getReferralProducts(): Promise<ReferralProduct[]> {
  // Swap this adapter with live endpoint retrieval when source API is available.
  return referralProducts
}
