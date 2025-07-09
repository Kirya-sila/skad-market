import { Flex, Typography } from 'antd'
import { SadSmile } from '@/assets/icons'

const { Title } = Typography

export const Tyres = () => {
  return (
    <Flex vertical gap={32} style={{ height: '100%' }} align='center' justify='center'>
      <Title level={3}>Здесь пока нет товаров, но совсем скоро они появятся!</Title>
      <Flex style={{ width: 350 }}>
        <SadSmile />
      </Flex>
    </Flex>
  )
}
