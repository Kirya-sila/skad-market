import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import css from './SmsCodeSection.module.scss'
import { SmsNumberForm } from './SmsNumberForm'
import { ResendSmsIcon } from '@/assets/icons'
import { authorizationStore } from '@/features/authorization'
import { orderStore } from '@/features/order/model/orderStore'
import { Flex, RegularButton, SmsAttemptsLimitContent } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

const sendSmsInterval = 60

export const SmsCodeSection = observer(() => {
  const {
    phoneNumber,
    captchaToken,
    resetSmsCodeSendStatus,
    remainingAttemptsCount,
    sendUserPhone,
    resetSmsCodeSentAgainStatus,
    isSmsCodeSentAgain,
    isSmsVerificationLoading,
    isLoginBuyerLoading,
  } = authorizationStore
  const { isLoading } = orderStore

  const [counter, setCounter] = useState(sendSmsInterval)

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCounter((prev) => {
          if (prev > 0) {
            return prev - 1
          }
          return prev
        }),
      1000,
    )

    return () => clearInterval(intervalId)
  }, [])

  const resendUserPhone = () => {
    sendUserPhone({ phoneNumber, captchaToken })
    resetSmsCodeSentAgainStatus()
  }

  useEffect(() => {
    if (isSmsCodeSentAgain) {
      setCounter(sendSmsInterval)
    }
  }, [isSmsCodeSentAgain])

  if (isLoading || isSmsVerificationLoading) {
    return <Spinner />
  }

  return (
    <>
      {remainingAttemptsCount > 0 || counter > 0 ? (
        <>
          <span className={css.h2}>Введите код из СМС</span>
          <Flex classname={css.numberConatiner}>
            <span className={css.phoneNumber}>{`+7${phoneNumber}`}</span>
            <RegularButton variant='text' text='Изменить' onClick={resetSmsCodeSendStatus} />
          </Flex>
          {counter > 0 && <SmsNumberForm />}
          {counter > 0 ? (
            <Flex classname={css.counter}>
              <span>Новый код через {counter} секунд</span>
            </Flex>
          ) : (
            <RegularButton
              disabled={!remainingAttemptsCount}
              variant='text'
              text={`Отправить СМС еще раз. Осталось ${remainingAttemptsCount}`}
              leftIcon={<ResendSmsIcon />}
              onClick={resendUserPhone}
            />
          )}
        </>
      ) : (
        <SmsAttemptsLimitContent />
      )}
    </>
  )
})
