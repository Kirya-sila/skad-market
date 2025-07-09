import { Flex } from 'antd'
import { RusFlag } from '@/assets/icons'

export const RusPhonePrefix = () => {
  return (
    <Flex gap='3px'>
      <RusFlag />
      <span>+7</span>
    </Flex>
  )
}
