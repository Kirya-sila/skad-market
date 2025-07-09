import { Flex } from 'antd'
import { ImageLoader } from '@/shared/ui/ImageLoader'
import { InfoText, InfoTitle } from '@/shared/ui/TextFields'
import { FC } from 'react'
import { IOrderStoreData } from '@/interfaces'

interface IStoreOrderItem {
  data: IOrderStoreData
}

export const StoreOrderItem: FC<IStoreOrderItem> = ({ data }) => {
  return (
    <Flex gap={12} align='center'>
      <ImageLoader style={{ width: 50, height: 50 }} src={/* cardData?.images[0]?.url ?? */ data.imageUrl} />
      <Flex vertical style={{ width: '100%' }} gap={16}>
        <Flex justify='space-between'>
          <Flex>
            <InfoTitle>{data.offerName}</InfoTitle>
          </Flex>
          {/* <Flex style={{ padding: '0 16px' }}>
            <InfoText>???</InfoText>
          </Flex> */}
        </Flex>

        {/* <Flex style={{ padding: '0 16px', alignSelf: 'flex-end' }}>
          <InfoText>???</InfoText>
        </Flex> */}

        <Flex gap={12}>
          <Flex align='center' gap={4}>
            <InfoTitle>Статус выполнения:</InfoTitle>
            <InfoText>В работе</InfoText>
          </Flex>
          <Flex align='center' gap={4}>
            <InfoTitle>Заказанное количество:</InfoTitle>
            <InfoText>{data.itemsAmount}</InfoText>
          </Flex>
          <Flex align='center' gap={4}>
            <InfoTitle>Отправлено:</InfoTitle>
            <InfoText>0</InfoText>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
