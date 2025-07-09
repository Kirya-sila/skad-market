import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { SectionWrapper } from '../SectionWrapper'
import { MapModal } from './CardModal'
import { OrderItems } from './OrderItems'
import css from './WayToGet.module.scss'
import { WayToGetInfo } from './WayToGetInfo'
import { deliveryItemsStore } from '@/features'
import { orderStore } from '@/features/order/model/orderStore'
import { ErrorMessage, FlexColumn, OrderPreferedDeliveryWaysModal, RegularButton } from '@/shared/ui'

export const WayToGet = observer(() => {
  const {
    orderDeliveryData,
    orderItems,
    showMapModal,
    openMapModal,
    openPreferedDeliveryItemsModal,
    closeMapModal,
    showPreferedDeliveryItemsModal,
    hasDeliveryInfo,
    hasDeliveryInfoTouched,
  } = orderStore
  const { userDeliveryItems } = deliveryItemsStore

  const Component = orderDeliveryData ? (
    <WayToGetInfo orderDeliveryData={orderDeliveryData} />
  ) : (
    <FlexColumn classname={css.orderItems}>
      <RegularButton
        appearance='secondary'
        size='small'
        text='Выбрать способ получения >'
        onClick={() => {
          if (userDeliveryItems.length) {
            openPreferedDeliveryItemsModal()
          } else {
            openMapModal()
          }
        }}
      />
      <OrderItems orderItems={orderItems} />
    </FlexColumn>
  )

  return (
    <>
      <Flex vertical gap={4}>
        <SectionWrapper title='Способ получения'>{Component}</SectionWrapper>
        {!hasDeliveryInfo && hasDeliveryInfoTouched && (
          <Flex style={{ marginLeft: 40 }}>
            <ErrorMessage errorMessage='Выберите способ получения товаров' />
          </Flex>
        )}
      </Flex>
      {showMapModal && <MapModal onClose={closeMapModal} />}
      {showPreferedDeliveryItemsModal && <OrderPreferedDeliveryWaysModal />}
    </>
  )
})
