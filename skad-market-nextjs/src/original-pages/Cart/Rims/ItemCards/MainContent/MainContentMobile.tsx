import { FC } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { NavLink, generatePath } from 'react-router-dom'
import css from '../ItemCards.module.scss'
import { AvailableOnStockText } from './AvailableOnStockText'
import { CountButtons } from './CountButtons'
import { MinimumUnitsToBuy } from './MinimumUnitsToBuy'
// import { OldPrice } from './OldPrice'
// import { PromoByttons } from './PromoByttons'
// import { TomorrowCost } from './TomorrowCost'
import { TotalItemPrice } from './TotalItemPrice'
import { appRoutes } from '@/app-settings'
import { cartStore } from '@/features/cart'
import { ICartItems } from '@/interfaces'
import { AntCheckbox, Flex, FlexColumn, FlexRow, RecycleBinButton, RegularButton } from '@/shared/ui'
// import { FavoriteProductButton } from '@/shared/ui/FavoriteProductButton'

interface IMainContentMobile {
  cardData: ICartItems
  handleShowHelpModal: (id: string) => void
}

export const MainContentMobile: FC<IMainContentMobile> = observer(({ cardData, handleShowHelpModal }) => {
  const { checkedItems, onItemCheck } = cartStore
  const availableOnStockAmount = cardData.stockAmount
  const available = cardData?.isItemInStock

  return (
    <FlexColumn classname={css.mainMobileContent}>
      <FlexRow classname={css.rowWithCheckbox}>
        <NavLink
          className={css.link}
          to={generatePath(appRoutes.rimsItem, { wheelCode: cardData.productWheelCode })}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FlexRow classname={cn(css.titleContainer, { [css.notAvailable]: !availableOnStockAmount })}>
            {cardData?.offerName}
          </FlexRow>
        </NavLink>
        <Flex classname={css.checkboxContainer}>
          <AntCheckbox
            disabled={!available}
            checked={checkedItems.includes(cardData.id)}
            onChange={(e) => onItemCheck(e, cardData.id)}
          />
        </Flex>
      </FlexRow>

      {/* {!!availableOnStockAmount && <PromoByttons />} */}

      <FlexRow classname={css.mobileRowContainer}>
        <FlexColumn classname={css.mobileColumnContainer}>
          <AvailableOnStockText availableOnStock={availableOnStockAmount} />
          {/* <TomorrowCost availableOnStock={availableOnStock} /> */}
        </FlexColumn>
        <FlexColumn classname={css.mobileColumnContainer}>
          {!!availableOnStockAmount && (
            <>
              <MinimumUnitsToBuy minimumToBuy={cardData.minimumToBuy} />
              <CountButtons cardData={cardData} />
            </>
          )}
          {!availableOnStockAmount && <TotalItemPrice cardData={cardData} />}
        </FlexColumn>
      </FlexRow>

      <FlexRow classname={css.availableRow}>
        <FlexRow classname={cn({ [css.notAvailable]: !availableOnStockAmount })}>
          {/* <FavoriteProductButton className={css.favoriteIcon} /> */}
          <RecycleBinButton onClick={() => handleShowHelpModal(cardData?.id)} />
        </FlexRow>
        {!availableOnStockAmount && <RegularButton text='Подписаться' size='middle' appearance='secondary' />}
        {!!availableOnStockAmount && (
          <FlexRow classname={css.prices}>
            {/* <OldPrice /> */}
            <TotalItemPrice cardData={cardData} />
          </FlexRow>
        )}
      </FlexRow>
    </FlexColumn>
  )
})
