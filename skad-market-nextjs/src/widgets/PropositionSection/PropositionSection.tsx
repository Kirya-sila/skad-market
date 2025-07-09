import { FC, useEffect } from 'react'
import { handleToggleProductActions } from '@shared/libs'
import { ProductCard } from '@shared/ui/ProductCard'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './PropositionSection.module.scss'
import { RimDTO } from '@/entities/Rims/model/types'
import { comparisonStore } from '@/features/comparison/model'
import { favoritesStore } from '@/features/favorites/model'
import { getCatalogItemImages } from '@/helpers'
import { ImageLoader } from '@/shared/ui/ImageLoader'
import { Spinner } from '@/shared/ui/Spinner'

interface IPropositionSection {
  className?: string
  count?: number
  title: string
  items: RimDTO[] | []
  getItems: VoidFunction
  onItemClick?: (id: string) => void
  loading: boolean
}

export const PropositionSection: FC<IPropositionSection> = observer(
  ({ count, title, items, getItems, onItemClick, loading }) => {
    useEffect(() => {
      getItems()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddFavorite = handleToggleProductActions(favoritesStore, 'favorite', items)
    const handleAddComparison = handleToggleProductActions(comparisonStore, 'comparison', items)

    const handleProductClick = (wheelCode: string) => {
      window.scrollTo(0, 0)
      if (onItemClick) {
        onItemClick(wheelCode)
      }
    }

    return (
      <Flex vertical>
        <div className={css.title}>{title}</div>
        {loading ? (
          <Spinner />
        ) : (
          <div className={css.body}>
            {items.slice(0, count ?? items.length).map((card) => (
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
        )}
      </Flex>
    )
  },
)
