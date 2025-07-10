'use client'

import React, { ReactNode } from 'react'
import cn from 'classnames'
import css from './PopularItems.module.scss'
import ProductCardImage4 from '@assets/images/product_card_image_4.png'
import ProductCardImage5 from '@assets/images/product_card_image_5.png'
import ProductCardImage7 from '@assets/images/product_card_image_7.png'
import ProductCardImage8 from '@assets/images/product_card_image_8.png'
import ProductCardImage9 from '@assets/images/product_card_image_9.png'
import ProductCardImage10 from '@assets/images/product_card_image_10.png'
import ProductCardImage11 from '@assets/images/product_card_image_11.png'
import ProductCardImage13 from '@assets/images/product_card_image_13.png'
import { ProductCard, ProductCardProps } from '@shared/ui/ProductCard'
import { createImageList, handleToggleProductActions } from '@shared/libs'
import { favoritesStore } from '@/features/favorites/model'
import { comparisonStore } from '@/features/comparison/model'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/app-settings'

interface NewProductsProps {
  className?: string
}

interface NewProduct {
  labels?: ProductCardProps['labels']
  images: ReactNode[]
  offerName: string
  retailPrice: number
  id: string
}

const NEW_PRODUCTS: NewProduct[] = [
  {
    id: '10ef588a-2eae-427f-b605-2881245ba911',
    labels: [
      {
        variant: 'secondary',
        label: 'Черная пятница',
      },
      {
        variant: 'primary',
        label: 'Новинка',
      },
    ],
    images: createImageList(ProductCardImage10, ProductCardImage9),
    offerName: 'Шина Michelin Pilot Alpin 5 245/40 R20 99W',
    retailPrice: 182739,
  },
  {
    id: '10ef588a-2e3e-427f-b605-2881245ba911',
    images: createImageList(ProductCardImage4),
    offerName: 'Литые диски Арнар (КС904) 7.000xR16 5x114.3 DIA67.1 ET45',
    retailPrice: 182739,
  },
  {
    id: '10ef588a-2eae-427f-b605-bg81245ba911',
    labels: [
      {
        variant: 'primary',
        label: 'Новинка',
      },
    ],
    images: createImageList(ProductCardImage5, ProductCardImage7),
    offerName: 'Литые диски Галего (КС1039) 7.500xR19 5x112 DIA66.6 ET34',
    retailPrice: 182739,
  },
  {
    id: '10ef588a-2eae-427f-b605-283z45ba911',
    images: createImageList(ProductCardImage8, ProductCardImage8),
    offerName: 'Шина Nokian Tyres Hakkapeliitta 10p 225/55 R17 101T',
    retailPrice: 182739,
  },
  {
    id: '10ef588a-2eae-427f-b605-2883245ba911',
    images: createImageList(ProductCardImage11),
    offerName: 'Датчик давления в шинах Autel Metal (433/315 МГц) AU11031 для BMW X3 2018',
    retailPrice: 182739,
  },
  {
    id: '10ef588a-2eae-427f-b605-288g5aza911',
    labels: [
      {
        variant: 'primary',
        label: 'Новинка',
      },
    ],
    images: createImageList(ProductCardImage13, ProductCardImage13),
    offerName: 'Гайка 12х1,5 Набор 44 блистер 20шт. спец конус/открытая 19мм Gold AL-116 20+1 LS',
    retailPrice: 182739,
  },
]

export const PopularItems = observer(({ className }: NewProductsProps) => {
  const router = useRouter()
  const handleAddFavorite = handleToggleProductActions(favoritesStore, 'favorite', NEW_PRODUCTS)
  const handleAddComparison = handleToggleProductActions(comparisonStore, 'comparison', NEW_PRODUCTS)
  const handleProductClick = (wheelCode: string | number) => {
    router.push(appRoutes.rimsItem.replace(':wheelCode', wheelCode.toString()))
  }

  return (
    <div className={cn(css.newProducts, className)}>
      <div className={css.title}>Популярные товары</div>
      <div className={css.body}>
        {NEW_PRODUCTS.map((card) => (
          <ProductCard
            key={card.id}
            wheelCode={card.id}
            onClick={() => handleProductClick(card.id)}
            className={css.productCard}
            title={card.offerName}
            images={card.images}
            labels={card.labels}
            onFavorite={handleAddFavorite(card.id)}
            onComparison={handleAddComparison(card.id)}
            isFavorite={favoritesStore.isInFavorites(card.id)}
            isComparison={comparisonStore.isInComparison(card.id)}
            renderTitleHeader={
              <ProductCard.Price
                // supTitle={card.price.supTitle}
                currentPrice={card.retailPrice}
                oldPrice={card.retailPrice * 2.5}
              />
            }
          />
        ))}
      </div>
    </div>
  )
})

PopularItems.displayName = 'PopularItems'
