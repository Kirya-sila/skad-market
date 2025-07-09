import { observer } from 'mobx-react-lite'
import css from './SmsAttemptsLimitContent.module.scss'
import { authorizationStore } from '@/features/authorization'
import { Flex, FlexColumn } from '@/shared/ui'

export const SmsAttemptsLimitContent = observer(() => {
  const { phoneNumberWithPrefix: phoneNumber, remainingHoursUntillNextVerification } = authorizationStore

  return (
    <>
      <span className={css.h2}>СМС код</span>{' '}
      <Flex classname={css.numberConatiner}>
        <span className={css.phoneNumber}>{phoneNumber}</span>{' '}
      </Flex>
      <FlexColumn classname={css.info}>
        <span>Количество попыток отправки кода превышено.</span>
        <span>
          Вы сможете отправить код на указанный номер телефона через{' '}
          <span className={css.hours}>{remainingHoursUntillNextVerification}</span> часа
        </span>
      </FlexColumn>
    </>
  )
})
