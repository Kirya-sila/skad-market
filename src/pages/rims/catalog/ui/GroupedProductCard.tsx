import { FC, useCallback, useRef, useState } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import Slider from 'react-slick'
import css from './Catalog.module.scss'
import { ColorSelection } from './ColorSelection'
import { getRandomLabels } from '@/entities/Rims/model/mocks'
import { IRimItemsGroup } from '@/entities/Rims/model/types'
import { cartStore } from '@/features/cart'
import { comparisonStore } from '@/features/comparison/model'
import { favoritesStore } from '@/features/favorites/model'
import { getCatalogItemImages, getDeliveryDate } from '@/helpers'
import { handleToggleProductActions } from '@/shared/libs'
import { Colors } from '@/shared/types'
import { Swiper } from '@/shared/ui'
import { ImageLoader } from '@/shared/ui/ImageLoader'
import { ProductCard } from '@/shared/ui/ProductCard'

interface IGroupedProductCard {
  rimGroup: IRimItemsGroup
  onItemClick: VoidFunction
}

export const GroupedProductCard: FC<IGroupedProductCard> = observer(({ rimGroup, onItemClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>()

  const { isInFavorites } = favoritesStore
  const { isInComparison } = comparisonStore
  const { addItemToCart: addItem } = cartStore

  const addItemToCart = (productId: string, productCategoryId: string) => (quantity: number) => {
    return addItem({ productId, productCategoryId, quantity })
  }

  const handleAddFavorite = handleToggleProductActions(favoritesStore, 'favorite', rimGroup.rims)
  const handleAddComparison = handleToggleProductActions(comparisonStore, 'comparison', rimGroup.rims)
  const colors = rimGroup.rims?.map(({ colorName, colorNameUnique }) => ({ colorName, color: colorNameUnique })) ?? []

  const handleCheckColor = (rimIndex: number) => {
    console.log(rimIndex)
    sliderRef.current?.slickGoTo(rimIndex)
  }

  const onSetSlickToGo = (slider: Slider | null) => {
    if (slider && !sliderRef.current) {
      sliderRef.current = slider
    }
  }

  const onSlideChange = (currentSlide: number, nextSlide: number) => {
    setCurrentSlide(nextSlide)
  }

  const uniqueColorsMap = colors
    .reduce((acc, item) => {
      const key = `${item.color}/${item.colorName}`
      if (!acc.has(key)) {
        acc.set(key, item)
      }
      return acc
    }, new Map())
    .values()

  const uniqueColors = Array.from(uniqueColorsMap)

  return (
    <Flex key={`${rimGroup.astPerformance}${rimGroup.drawingNumber}`} style={{ width: '100%', position: 'relative' }}>
      {rimGroup && rimGroup.rims && (
        <Swiper
          key={`${rimGroup.astPerformance}${rimGroup.drawingNumber}`}
          onSetSlickToGo={onSetSlickToGo}
          isInfinite={!!(uniqueColors?.length > 1)}
          onSlideChange={onSlideChange}
          isArrows={false}
          frames={rimGroup.rims.map((rim, i) => (
            <Flex vertical key={rim.id}>
              <ProductCard
                key={`${rim.id}-${i}-${rim.wheelCode}`}
                className={css.productCard}
                onClick={onItemClick}
                fromCatalog
                wheelCode={rim.wheelCode}
                title={rim.offerName}
                labels={getRandomLabels(rim.id)}
                onFavorite={handleAddFavorite(rim.id)}
                onComparison={handleAddComparison(rim.id)}
                isFavorite={isInFavorites(rim.id)}
                isComparison={isInComparison(rim.id)}
                available={rim.count >= 1}
                images={getCatalogItemImages(rim?.images).map((imageUrl) => (
                  <ImageLoader src={imageUrl} key={imageUrl} />
                ))}
                renderTitleHeader={
                  <ProductCard.Price
                    // supTitle={rim.count >= 1 ? 'Рассрочка' : undefined}
                    currentPrice={rim.retailPrice}
                    // oldPrice={rim.retailPrice * 2.3}
                  />
                }
                renderBottomActions={
                  <ProductCard.BottomAction
                    productId={rim.id}
                    totalQuantity={rim.count}
                    text={getDeliveryDate()}
                    addItemToCart={addItemToCart(rim.id, rim.productCategoryId)}
                  />
                }
                renderTitleFooter={
                  <ProductCard.ProductAvailabilityAndReviews
                    count={rim.count}
                    rating='4,5'
                    reviews={Math.floor(i * Math.random())}
                  />
                }
              />
            </Flex>
          ))}
        />
      )}
      <Flex style={{ position: 'absolute', /* top: '50%', transform: 'translateY(-50%)', */ right: 24, top: 24 }}>
        <ColorSelection colors={uniqueColors} onCheckColor={handleCheckColor} currentSlide={currentSlide} />
      </Flex>
    </Flex>
  )

  // if (idx === Math.floor((filteredRims.length - diffCountForCardViev(width)) / 2) && filteredRims.length > 2) {
  //   result.push(Banner)
  // }

  // if (filteredRims.length <= 2 && idx === filteredRims.length - 1) {
  //   result.push(Banner)
  // }

  // return result
})
