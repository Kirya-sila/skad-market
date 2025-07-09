import { Modals } from '@app/config/modal/modals-confg'
import { useModal, usePhoneInput, useToggle } from '@shared/libs'
import { useInput } from '@shared/libs/hooks/useInput'
import {
  CheckboxListItemSmall,
  ModalBaseHeader,
  OrderCallBackSuccessModalProps,
  RegularButton,
  TextInput,
} from '@shared/ui'
import ModalBase from '@shared/ui/Modals/ModalBase/ModalBase'
import css from './OrderCallBackModal.module.scss'

export interface OrderCallBackModalProps {
  className?: string
  onClose: VoidFunction
}

const AGREEMENT_LABEL =
  'Я даю согласие на обработку персональных данных и принимаю условия пользовательского соглашения и договора оферты'

const OrderCallBackModal = ({ className, onClose }: OrderCallBackModalProps) => {
  const validateName = (value: string): string => {
    const validValue = value.replace(/[^a-zA-Zа-яА-Я\s]/gi, '')
    return validValue.replace(/\s+/g, ' ')
  }

  const [name, changeName] = useInput({ formatValue: validateName })
  const [number, changeNumber] = usePhoneInput()
  const [isAgree, toggleAgree] = useToggle()
  const disabledOrderButton = name.length <= 2 || number.length !== 18 || !isAgree

  const orderCallBackSuccessModal = useModal<OrderCallBackSuccessModalProps>(Modals.OrderCallbackSuccess)

  const displayOrderCallBackSuccessModal = () => {
    orderCallBackSuccessModal.open({
      onClose: orderCallBackSuccessModal.close,
    })
  }

  const getBody = () => {
    return (
      <div className={css.body}>
        <div className={css.mobileTitle}>Заказать обратный звонок</div>
        <TextInput label='Ваше имя' type='text' onChange={changeName} value={name} required />
        <TextInput
          className={css.phoneInput}
          label='Номер телефона'
          type='text'
          onChange={changeNumber}
          value={number}
          required
        />
        <CheckboxListItemSmall
          className={css.checkbox}
          label={AGREEMENT_LABEL}
          checked={isAgree}
          toggleCheck={toggleAgree}
        />
        <RegularButton
          className={css.orderButton}
          text='Заказать звонок'
          disabled={disabledOrderButton}
          onClick={displayOrderCallBackSuccessModal}
        />
      </div>
    )
  }

  return (
    <div>
      <ModalBase
        renderHeader={
          <ModalBaseHeader
            topBar='Заказать обратный звонок'
            title='Заказать обратный звонок'
            displayAction
            displayMobileTitle={false}
            onClickAction={onClose}
            className={css.modalHeader}
          />
        }
        renderBody={getBody()}
        onClose={onClose}
        className={css.orderCallBackModal}
      />
    </div>
  )
}

export default OrderCallBackModal

OrderCallBackModal.displayName = 'OrderCallBackModal'
