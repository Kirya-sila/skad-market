import { RimDTO, RimDTOImage } from '@/entities/Rims/model/types'
import { notificationStore } from '@/features/notification/model'
import { ProductCardProps } from '@shared/ui/ProductCard'
import { ReactNode } from 'react'

interface IToggleableStore {
  toggle: (id: string) => void
  isInFavorites?: (id: string) => boolean
  isInComparison?: (id: string) => boolean
}

interface IProduct {
  labels?: ProductCardProps['labels']
  images: RimDTO['images'] | ReactNode[]
  offerName: string
  retailPrice: number
  id: string
}

export const handleToggleProductActions =
  (store: IToggleableStore, notificationType: 'favorite' | 'comparison', products: IProduct[]) =>
  (id: string) =>
  () => {
    store.toggle(id)

    const product = products.find((product) => product.id === id)
    if (!product) return

    const isItemActive = store.isInFavorites
      ? store.isInFavorites(id)
      : store.isInComparison
        ? store.isInComparison(id)
        : false

    if (isItemActive) {
      notificationStore.addNotification({
        id,
        label: product.offerName,
        subLabel: `товар добавлен в ${notificationType === 'favorite' ? 'избранное' : 'сравнение'}`,
        type: notificationType,
      })
    } else {
      notificationStore.removeNotification(id, notificationType)
    }
  }
