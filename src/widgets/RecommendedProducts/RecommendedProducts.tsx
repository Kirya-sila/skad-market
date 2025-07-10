'use client'

import { useEffect } from 'react'
import { handleToggleProductActions } from '@shared/libs'
import { ProductCard } from '@shared/ui/ProductCard'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import css from './RecommendedProducts.module.scss'
import { appRoutes } from '@/app-settings'
import { comparisonStore } from '@/features/comparison/model'
import { favoritesStore } from '@/features/favorites/model'
import { recommendRimsItemsStore } from '@/features/recommendItems/model'
import { getCatalogItemImages } from '@/helpers'
import { ImageLoader } from '@/shared/ui/ImageLoader'

interface RecommendedProductsProps {
  className?: string
  count?: number
  title?: string
}

// interface RecommendedProduct {
//   labels?: ProductCardProps['labels']
//   images: ReactNode[]
//   offerName: string
//   retailPrice: number
//   id: string
// }

export const RecommendedProducts = observer(({ className, count, title }: RecommendedProductsProps) => {
  const router = useRouter()
  const { recommendRimsItems, getRecommendRimsItems } = recommendRimsItemsStore

  useEffect(() => {
    getRecommendRimsItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddFavorite = handleToggleProductActions(favoritesStore, 'favorite', recommendRimsItems)
  const handleAddComparison = handleToggleProductActions(comparisonStore, 'comparison', recommendRimsItems)

  const handleProductClick = (wheelCode: string | number) => {
    router.push(appRoutes.rimsItem.replace(':wheelCode', wheelCode.toString()))
  }

  return (
    <div className={cn(css.recommendedProducts, className)}>
      <div className={css.title}>{title || 'Рекомендуемые товары'}</div>
      <div className={css.body}>
        {recommendRimsItems.slice(0, count ?? recommendRimsItems.length).map((card) => (
          <ProductCard
            key={card.id}
            wheelCode={card.wheelCode}
            onClick={() => handleProductClick(card.wheelCode)}
            className={css.productCard}
            title={card.offerName}
            images={getCatalogItemImages(card.images).map((imageUrl) => (
              <ImageLoader src={imageUrl} key={imageUrl} />
            ))}
            // labels={card.labels}
            onFavorite={handleAddFavorite(card.id)}
            onComparison={handleAddComparison(card.id)}
            isFavorite={favoritesStore.isInFavorites(card.id)}
            isComparison={comparisonStore.isInComparison(card.id)}
            renderTitleHeader={
              <ProductCard.Price
                // supTitle={card.price.supTitle}
                currentPrice={card.retailPrice}
                // oldPrice={card.retailPrice * 2.5}
              />
            }
          />
        ))}
      </div>
    </div>
  )
})

RecommendedProducts.displayName = 'RecommendedProducts'
