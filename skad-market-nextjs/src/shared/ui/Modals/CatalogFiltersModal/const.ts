import { ActiveFilterName } from '@/entities/Rims/model/types'

export const localizedFilter = {
  setFrom: 'от 4-х',
  isHit: 'Хиты',
  isNew: 'Новинки',
  inStock: 'В наличии',
  withReviews: 'С отзывами',
} as Partial<Record<ActiveFilterName, string>>
