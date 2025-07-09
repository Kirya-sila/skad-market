import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { FlexColumn, FlexRow } from '../../Flex'
import ModalBase from '../ModalBase/ModalBase'
import { DeliveryItemsList } from './DeliveryItemsList'
import css from './PreferedDeliveryWaysModal.module.scss'
import { ICCloseLine } from '@/assets/icons'
import { deliveryItemsStore } from '@/features'
import { buyerCabinetStore } from '@/features/buyer'
import useIsMobile from '@/shared/libs/hooks/useIsMobile'

export const BuyerProfilePreferedDeliveryWaysModal = observer(() => {
  const isMobile = useIsMobile()

  const {
    confirmBuyerDefaultDeliveryItem,
    confirmBuyerDefaultDeliveryItemLoading,
    closePreferedDeliveryItemsModal,
  } = buyerCabinetStore
  const { userDeliveryItems, checkedDeliveryOptionId, onCheckDeliveryItem } = deliveryItemsStore

  const getBody = () => (
    <>
      <div className={css.close} onClick={closePreferedDeliveryItemsModal}>
        <ICCloseLine />
      </div>
      <FlexColumn classname={css.root}>
        {!isMobile && <div className={css.title}>Адреса доставки</div>}
        <DeliveryItemsList
          deliveryItems={userDeliveryItems}
          onCheckDeliveryItem={onCheckDeliveryItem}
          checkedId={checkedDeliveryOptionId}
        />
        <Button
          type='primary'
          size='large'
          loading={confirmBuyerDefaultDeliveryItemLoading}
          onClick={confirmBuyerDefaultDeliveryItem}
          disabled={!checkedDeliveryOptionId || confirmBuyerDefaultDeliveryItemLoading}
        >
          Заберу здесь
        </Button>
      </FlexColumn>
    </>
  )

  const getTitle = () => {
    return isMobile ? (
      <FlexRow classname={css.closeContainer}>
        <span>Адреса доставки</span>
        <div className={css.closeBase}>
          <ICCloseLine />
        </div>
      </FlexRow>
    ) : null
  }

  return (
    <ModalBase
      className={css.modalContainer}
      bodyClassName={css.body}
      renderHeader={getTitle()}
      renderBody={getBody()}
      onClose={closePreferedDeliveryItemsModal}
    />
  )
})
