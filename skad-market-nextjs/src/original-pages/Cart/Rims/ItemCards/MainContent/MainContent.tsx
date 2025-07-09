import { FC } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { NavLink, generatePath } from 'react-router-dom'
import cartCss from '../../../Cart.module.scss'
import css from '../ItemCards.module.scss'
import { AvailableOnStockText } from './AvailableOnStockText'
import { CountButtons } from './CountButtons'
import { MainContentLaptop } from './MainContentLaptop'
import { MainContentMobile } from './MainContentMobile'
import { MinimumUnitsToBuy } from './MinimumUnitsToBuy'
import { OneUnitPrice } from './OneUnitPrice'
// import { PromoByttons } from './PromoByttons'
import { TotalItemPrice } from './TotalItemPrice'
import { Modals } from '@/app/config/modal/modals-confg'
import { appRoutes } from '@/app-settings'
import { cartStore } from '@/features/cart'
import { ICartItems } from '@/interfaces'
import { useModal, useWindowState } from '@/shared/libs'
import { FlexColumn, FlexRow, IConfirmDeleteModal, RecycleBinButton, RegularButton } from '@/shared/ui'
// import { FavoriteProductButton } from '@/shared/ui/FavoriteProductButton'
import confirmModalCss from '@/styles/ConfirmModal.module.scss'
// import css from './MainContent.module.scss'
// import { TomorrowCost } from './TomorrowCost'

interface IMainContent {
  cardData: ICartItems
}

export const MainContent: FC<IMainContent> = observer(({ cardData }) => {
  const { isLaptop, isMobile } = useWindowState()
  const { deleteOneItem, closeConfirmModal } = cartStore

  const confirmModal = useModal<IConfirmDeleteModal>(Modals.ConfirmDeleteModal)

  const availableOnStockAmount = cardData.stockAmount

  const handleShowHelpModal = (id: string) => {
    closeConfirmModal(confirmModal.close)
    confirmModal.open({
      onClose: confirmModal.close,
      onDelete: () => deleteOneItem(id),
      title: 'Удалить товары из корзины',
      text: 'Вы действительно хотите удалить выбранные товары? Это действие нельзя будет отменить',
      className: cn(confirmModalCss.confirmModal, cartCss.confirmDeleteModal),
    })
  }

  if (isLaptop) {
    return <MainContentLaptop cardData={cardData} handleShowHelpModal={handleShowHelpModal} />
  }

  if (isMobile) {
    return <MainContentMobile cardData={cardData} handleShowHelpModal={handleShowHelpModal} />
  }

  return (
    <FlexColumn classname={css.mainContent}>
      {!!availableOnStockAmount && (
        <FlexRow classname={css.row}>
          {/* <PromoByttons /> */}
          <MinimumUnitsToBuy minimumToBuy={cardData.minimumToBuy} />
          {/* <OldPrice /> */}
        </FlexRow>
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
          <FlexRow classname={css.priceForOneItem}>
            <OneUnitPrice cardData={cardData} />
            <CountButtons cardData={cardData} />
          </FlexRow>
        )}

        <TotalItemPrice cardData={cardData} />
      </FlexRow>
      <FlexRow classname={css.availableRow}>
        <FlexRow classname={cn({ [css.notAvailable]: !availableOnStockAmount })}>
          <AvailableOnStockText availableOnStock={availableOnStockAmount} />
          {/* <FavoriteProductButton className={css.favoriteIcon} /> */}
          <RecycleBinButton onClick={() => handleShowHelpModal(cardData?.id)} />
        </FlexRow>
        {!availableOnStockAmount ? (
          <RegularButton text='Подписаться' size='middle' appearance='secondary' />
        ) : /* (
          <TomorrowCost availableOnStock={availableOnStock} />
        ) */ null}
      </FlexRow>
    </FlexColumn>
  )
})
