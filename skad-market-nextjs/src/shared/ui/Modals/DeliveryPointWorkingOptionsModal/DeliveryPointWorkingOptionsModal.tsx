import { FC } from 'react'
import css from './DeliveryPointWorkingOptionsModal.module.scss'
import { ICCloseLine } from '@/assets/icons'
import { getOrderDateString, toLocaleString } from '@/helpers'
import { IDeliveryPointWorkingOptionsModal } from '@/interfaces'
import useIsMobile from '@/shared/libs/hooks/useIsMobile'
import { FlexColumn, FlexRow } from '@/shared/ui'
import ModalBase from '@/shared/ui/Modals/ModalBase/ModalBase'

export const DeliveryPointWorkingOptionsModal: FC<IDeliveryPointWorkingOptionsModal> = ({
  onClose,
  title = 'Пункт выдачи DPD',
  deliveryOptions,
}) => {
  const isMobile = useIsMobile()

  const getBody = () => (
    <>
      <div className={css.close} onClick={onClose}>
        <ICCloseLine />
      </div>
      <FlexColumn classname={css.root}>
        <div className={css.title}>{title}</div>
        <FlexColumn classname={css.modalBody}>
          <div className={css.info}>
            <div>Адрес</div>
            <div>{deliveryOptions.completeAddressTitle}</div>
          </div>
          <div className={css.info}>
            <div>График работы</div>
            <FlexRow classname={css.workingTime}>
              <FlexRow>
                <span>{deliveryOptions.workingTime}</span>
              </FlexRow>
            </FlexRow>
          </div>
          <div className={css.info}>
            <FlexRow classname={css.deliveryCost}>
              Доставка{' '}
              {!deliveryOptions.totalDeliveryCost ? (
                <span className={css.free}>бесплатно</span>
              ) : (
                <span className={css.paid}>{toLocaleString(deliveryOptions.totalDeliveryCost ?? 0)}</span>
              )}
            </FlexRow>
            <div>с {getOrderDateString(deliveryOptions.estimatedDeliveryDate)}</div>
          </div>
          <div className={css.info}>
            <div>Как добраться</div>
            <div>После оформления заявки, наш менеджер свяжется с вами по номеру телефона для подтверждения заказа</div>
          </div>
        </FlexColumn>
      </FlexColumn>
    </>
  )

  const getTitle = () => {
    return isMobile ? (
      <FlexRow classname={css.closeContainer}>
        <span>Информация о пункте доставки</span>
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
      onClose={onClose}
    />
  )
}

export default DeliveryPointWorkingOptionsModal

DeliveryPointWorkingOptionsModal.displayName = 'DeliveryPointWorkingOptionsModal'
