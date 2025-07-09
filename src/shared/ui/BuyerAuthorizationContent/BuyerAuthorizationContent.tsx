import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { SkadMarketLogo } from '../SkadMarketLogo'
import css from './BuyerAuthorizationContent.module.scss'
import { PhoneNumber } from './PhoneNumber'
import { SmsCodeSection } from './SmsNumber'
import { authorizationStore } from '@/features/authorization'
import { Copyright } from '@/widgets'

export const BuyerAuthorizationContent = observer(() => {
  const { isSmsCodeSent } = authorizationStore

  return (
    <>
      <Flex vertical className={css.formContainer}>
        <Flex className={css.logo}>
          <SkadMarketLogo size='large' />
        </Flex>
        {!isSmsCodeSent && <PhoneNumber />}
        {isSmsCodeSent && <SmsCodeSection />}
      </Flex>
      <span className={css.copyright}>
        <Copyright />
      </span>
    </>
  )
})
