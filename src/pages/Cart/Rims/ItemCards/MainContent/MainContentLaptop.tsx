import { FC } from 'react'
import { Flex } from 'antd'
import cn from 'classnames'
import { NavLink, generatePath } from 'react-router-dom'
import css from '../ItemCards.module.scss'
import { AvailableOnStockText } from './AvailableOnStockText'
import { CountButtons } from './CountButtons'
import { MinimumUnitsToBuy } from './MinimumUnitsToBuy'
// import { OldPrice } from './OldPrice'
import { OneUnitPrice } from './OneUnitPrice'
// import { PromoByttons } from './PromoByttons'
// import { TomorrowCost } from './TomorrowCost'
import { TotalItemPrice } from './TotalItemPrice'
import { appRoutes } from '@/app-settings'
import { ICartItems } from '@/interfaces'
import { FlexColumn, FlexRow, RecycleBinButton, RegularButton } from '@/shared/ui'
// import { FavoriteProductButton } from '@/shared/ui/FavoriteProductButton'

interface IMainContentLaptop {
  cardData: ICartItems
  handleShowHelpModal: (id: string) => void
}

export const MainContentLaptop: FC<IMainContentLaptop> = ({ cardData, handleShowHelpModal }) => {
  const availableOnStockAmount = cardData.stockAmount

  return (
    <FlexColumn classname={css.mainContent}>
      {!!availableOnStockAmount && (
        <Flex justify='flex-end' /* 'space-between' */ style={{ width: '100%' }}>
          {/* <PromoByttons /> */}
          <OneUnitPrice cardData={cardData} />
        </Flex>
      )}
      <FlexRow classname={css.row}>
        <NavLink
          className={css.link}
          to={generatePath(appRoutes.rimsItem, { wheelCode: cardData.productWheelCode })}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FlexRow classname={cn(css.titleContainer, { [css.notAvailable]: !availableOnStockAmount })}>
            {cardData?.offerName}
          </FlexRow>
        </NavLink>
        {!!availableOnStockAmount && (
          <FlexColumn classname={css.availableOnStockLaptop}>
            <MinimumUnitsToBuy minimumToBuy={cardData.minimumToBuy} />
            <CountButtons cardData={cardData} />
          </FlexColumn>
        )}
        {!availableOnStockAmount && <TotalItemPrice cardData={cardData} />}
      </FlexRow>
      <FlexRow classname={css.availableRow}>
        <FlexRow classname={cn({ [css.notAvailable]: !availableOnStockAmount })}>
          <AvailableOnStockText availableOnStock={availableOnStockAmount} />
          {/* <FavoriteProductButton className={css.favoriteIcon} /> */}
          <RecycleBinButton onClick={() => handleShowHelpModal(cardData?.id)} />
          {/* <TomorrowCost availableOnStock={availableOnStock} /> */}
        </FlexRow>
        {!availableOnStockAmount && <RegularButton text='Подписаться' size='middle' appearance='secondary' />}

        {!!availableOnStockAmount && (
          <FlexColumn>
            {/* <OldPrice /> */}
            <TotalItemPrice cardData={cardData} />
          </FlexColumn>
        )}
      </FlexRow>
    </FlexColumn>
  )
}
