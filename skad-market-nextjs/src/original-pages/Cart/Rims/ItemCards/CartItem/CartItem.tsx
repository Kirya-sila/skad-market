import { FC } from 'react'
import productCardImageSrc3 from '@assets/images/product_card_image_3.png'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { MainContent } from '../MainContent/MainContent'
import css from './CartItem.module.scss'
import { cartStore } from '@/features/cart'
import { ICartItems } from '@/interfaces'
import { useWindowState } from '@/shared/libs'
import { AntCheckbox, FlexColumn, FlexRow, RegularButton } from '@/shared/ui'
import { ImageLoader } from '@/shared/ui/ImageLoader'

interface ICard {
  cardData: ICartItems
}

export const CartItem: FC<ICard> = observer(({ cardData }) => {
  const { isMobile } = useWindowState()
  const { checkedItems, onItemCheck, deletedItems, restoreItem } = cartStore

  const available = cardData?.isItemInStock

  if (deletedItems.includes(cardData.id)) {
    return (
      <FlexColumn classname={css.deletedItemCard}>
        <FlexRow>Товар {cardData?.offerName} был удален из корзины</FlexRow>
        <RegularButton
          className={css.restoreButton}
          text='Восстановить'
          size='middle'
          appearance='primary'
          variant='text'
          onClick={() => restoreItem(cardData?.id)}
        />
      </FlexColumn>
    )
  }

  return (
    <FlexColumn classname={css.card}>
      <FlexRow>
        <FlexRow classname={css.checkboxImageConatiner}>
          {!isMobile && (
            <AntCheckbox
              disabled={!available}
              checked={checkedItems.includes(cardData.id)}
              onChange={(e) => onItemCheck(e, cardData.id)}
            />
          )}
          <ImageLoader
            className={cn(css.image, { [css.cardNotAvailable]: !available })}
            src={cardData?.images[0]?.url ?? productCardImageSrc3}
          />
        </FlexRow>
        <MainContent cardData={cardData} />
      </FlexRow>
    </FlexColumn>
  )
})
