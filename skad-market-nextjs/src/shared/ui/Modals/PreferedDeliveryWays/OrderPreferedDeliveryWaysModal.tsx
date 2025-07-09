import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { FlexColumn, FlexRow } from '../../Flex'
import { RegularButton } from '../../RegularButton'
import ModalBase from '../ModalBase/ModalBase'
import { DeliveryItemsList } from './DeliveryItemsList'
import css from './PreferedDeliveryWaysModal.module.scss'
import { ICCloseLine, ICPlus } from '@/assets/icons'
import { deliveryItemsStore } from '@/features'
import { orderStore } from '@/features/order/model/orderStore'
import useIsMobile from '@/shared/libs/hooks/useIsMobile'

export const OrderPreferedDeliveryWaysModal = observer(() => {
  const isMobile = useIsMobile()

  const {
    willGetFromHere,
    openMapModal,
    closePreferedDeliveryItemsModal,
    setDeliveryLocationLoading,
  } = orderStore

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
          loading={setDeliveryLocationLoading}
          onClick={willGetFromHere}
          disabled={!checkedDeliveryOptionId || setDeliveryLocationLoading}
        >
          Заберу здесь
        </Button>
        <RegularButton
          variant='text'
          leftIcon={<ICPlus />}
          text='Добавить адрес или пункт выдачи'
          onClick={() => {
            openMapModal()
            closePreferedDeliveryItemsModal()
          }}
        />
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
