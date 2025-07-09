import React from 'react'
import css from './OrderCallBackSuccessModal.module.scss'
import { ModalBaseHeader } from '@shared/ui'
import ModalBase from '@shared/ui/Modals/ModalBase/ModalBase'

export interface OrderCallBackSuccessModalProps {
  className?: string
  onClose: VoidFunction
}

const OrderCallBackSuccessModal = ({ className, onClose }: OrderCallBackSuccessModalProps) => {
  const getBody = () => {
    return (
      <div className={css.body}>
        <div className={css.mobileTitle}>Заявка принята</div>
        Мы позвоним Вам в ближайшее время!
      </div>
    )
  }

  return (
    <ModalBase
      renderHeader={
        <ModalBaseHeader
          topBar="Заявка принята"
          title="Заявка принята"
          displayAction
          onClickAction={onClose}
          displayMobileTitle={false}
          className={css.modalHeader}
        />
      }
      renderBody={getBody()}
      onClose={onClose}
      className={css.orderCallBackModal}
    />
  )
}

export default OrderCallBackSuccessModal

OrderCallBackSuccessModal.displayName = 'OrderCallBackSuccessModal'
