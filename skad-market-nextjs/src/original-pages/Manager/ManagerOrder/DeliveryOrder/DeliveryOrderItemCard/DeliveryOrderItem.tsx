import { Button, Divider, Flex } from 'antd'
import { DeliveryTypes } from './DeliveryTypes'
import { FileIcon } from '@/assets/icons'
import { InfoText, InfoTitle } from '@/shared/ui'
import { ImageLoader } from '@/shared/ui/ImageLoader'
import { IItemDeliveries } from '@/interfaces'
import { FC } from 'react'

export const DeliveryOrderItem: FC<{ data: IItemDeliveries }> = ({ data }) => {
  return (
    <Flex vertical>
      <Flex gap={12} align='center' style={{ marginBottom: 12 }}>
        <ImageLoader style={{ width: 50, height: 50 }} src={data.imageUrl} />
        <Flex vertical style={{ width: '100%' }}>
          <Flex justify='space-between' align='center'>
            <InfoTitle>{data.offerName}</InfoTitle>
            <Button variant='link' color='primary' iconPosition='start' icon={<FileIcon />}>
              Работа с местами
            </Button>
          </Flex>
          <InfoText style={{ fontSize: 12 }}>шт. {data.itemsAmount}</InfoText>
        </Flex>
      </Flex>
      <DeliveryTypes />
      <Flex style={{ marginTop: 12 }} gap={8} align='center'>
        <InfoTitle>Адрес отправки:</InfoTitle>
        <InfoText>{data.shipmentAddress}</InfoText>
      </Flex>
      <Flex gap={8} align='center'>
        <InfoTitle>Адрес доставки:</InfoTitle>
        <InfoText>{data.deliveryAddress}</InfoText>
      </Flex>
      <Divider style={{ marginTop: 12 }} />
      <Button variant='outlined' style={{ minWidth: '50%', height: 44 }} disabled>
        Сформировать заявку на отгрузку для склада
      </Button>
    </Flex>
  )
}
