import { FC } from 'react'
import { Button, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './DeliveryInfo.module.scss'
import { ICCloseLine } from '@/assets/icons'
import { orderStore } from '@/features/order/model/orderStore'
import { Flex, FlexColumn, FlexRow, RegularButton } from '@/shared/ui'

export interface IDeliveryInfoBody {
  onClose: VoidFunction
}

const { Text } = Typography

export const DeliveryInfoBody: FC<IDeliveryInfoBody> = observer(({ onClose }) => {
  const { deliveryPointInfo, confirmDeliveryPoint, setDeliveryLocationLoading: setDeliveryPointLoading } = orderStore
  return (
    <div className={css.cardContainer}>
      <Flex classname={css.closeIconContainer}>
        <div className={css.close} onClick={onClose}>
          <ICCloseLine />
        </div>
      </Flex>
      <FlexColumn classname={css.root}>
        <div className={css.title}>Пункт выдачи DPD</div>
        <FlexColumn classname={css.modalBody}>
          <div className={css.info}>
            <div>Адрес</div>
            <div>{deliveryPointInfo?.completeAddress}</div>
          </div>
          <div className={css.info}>
            <div>График работы</div>
            <FlexRow classname={css.workingTime}>
              {/* <FlexRow>
                <span>пн-пт: </span>
                <span>{deliveryOptions.workingTime}</span>
              </FlexRow>
              <FlexRow>
                <span>сб-вс: </span>
                <span>выходной</span>
              </FlexRow> */}
              {deliveryPointInfo?.workingDaysSchedule}
            </FlexRow>
          </div>
          {/* <div className={css.info}>
            <FlexRow classname={css.deliveryCost}>
              Доставка{' '}
              {deliveryOptions.deliveryCost === 0 ? (
                <span className={css.free}>бесплатно</span>
              ) : (
                <span className={css.paid}>{toLocaleString(deliveryOptions.deliveryCost)}</span>
              )}
            </FlexRow>
            <div>с {deliveryOptions.deliveryDate}</div>
          </div> */}
          <div className={css.info}>
            <div>Как добраться</div>
            <div>
              <Text>{deliveryPointInfo?.addressDescription}</Text>
            </div>
          </div>
        </FlexColumn>
        <Button
          type='primary'
          size='large'
          onClick={confirmDeliveryPoint}
          loading={setDeliveryPointLoading}
          disabled={setDeliveryPointLoading}
        >
          Заберу отсюда
        </Button>
      </FlexColumn>
    </div>
  )
})
