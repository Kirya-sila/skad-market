import { observer } from 'mobx-react-lite'
import css from './PhoneNumber.module.scss'
import { PhoneNumberFormWithCaptcha } from './PhoneNumberForm'
import { authorizationStore } from '@/features/authorization'
import { Spinner } from '@/shared/ui/Spinner'

export const PhoneNumber = observer(() => {
  const { isSendBuyerPhoneLoading } = authorizationStore

  return (
    <>
      <span className={css.h2}>Добро пожаловать</span>
      <span className={css.info}>Введите номер телефона, чтобы войти или зарегистрироваться</span>
      {!isSendBuyerPhoneLoading ? <PhoneNumberFormWithCaptcha /> : <Spinner />}
      <span className={css.comment}>
        Совершая авторизацию Вы соглашаетесь с условиями обработки персональных данных
      </span>
    </>
  )
})
