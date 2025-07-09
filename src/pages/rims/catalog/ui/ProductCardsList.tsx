import { FC } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './Catalog.module.scss'
import { getRandomLabels } from '@/entities/Rims/model/mocks'
import { RimDTO } from '@/entities/Rims/model/types'
import { cartStore } from '@/features/cart'
import { getCatalogItemImages, getDeliveryDate } from '@/helpers'
import { ImageLoader } from '@/shared/ui/ImageLoader'
import { ProductCard } from '@/shared/ui/ProductCard'
import { NotFound } from '@/widgets/filters'

interface IProductCardsList {
  filteredRims: RimDTO[]
  handleAddFavorite: (id: string) => () => void
  handleAddComparison: (id: string) => () => void
  isInFavorites: (itemId: string) => boolean
  isInComparison: (itemId: string) => boolean
  resetFilters: () => Promise<void>
}

export const ProductCardsList: FC<IProductCardsList> = observer(
  ({ filteredRims, handleAddFavorite, handleAddComparison, isInFavorites, isInComparison, resetFilters }) => {
    const { addItemToCart: addItem } = cartStore

    // const diffCountForCardViev = (width: number): number => {
    //   if ((width < 1380 && width > 1024) || (width < 920 && width >= 740)) {
    //     return 0
    //   } else {
    //     return 1
    //   }
    // }

    if (!filteredRims.length) {
      return <NotFound onResetFilters={resetFilters} className={css.notFound} />
    }

    const addItemToCart = (productId: string, productCategoryId: string) => (quantity: number) => {
      return addItem({ productId, productCategoryId, quantity })
    }

    const onItemClick = () => {
      window.scroll(0, 0)
    }

    return (
      <div className={cn(css.cards, { [css.cardsFixWidth]: filteredRims.length < 3 })}>
        {filteredRims.map((rim, idx) => {
          // const Banner = <SaleBanner className={css.banner} key={`sale-banner-${idx}-${rim.id}`} />
          // const result = [
          return (
            <ProductCard
              key={`${rim.id}-${idx}`}
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
                  reviews={Math.floor(idx * Math.random())}
                />
              }
            />
          )

          // if (idx === Math.floor((filteredRims.length - diffCountForCardViev(width)) / 2) && filteredRims.length > 2) {
          //   result.push(Banner)
          // }

          // if (filteredRims.length <= 2 && idx === filteredRims.length - 1) {
          //   result.push(Banner)
          // }

          // return result
        })}
      </div>
    )
  },
)
