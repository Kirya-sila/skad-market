import { Divider, Flex, Typography } from 'antd'
import { InfoText, InfoTitle } from '@/shared/ui'
import { managersOrderStore } from '@/features/manager'

// interface ISummaryInfoCard {}

export const SummaryInfoCard = () => {
  const { summaryInfoCardData, paymentsCardData } = managersOrderStore

  return (
    <Flex vertical gap={10}>
      <Flex vertical>
        <InfoTitle>Общая стоимость товаров</InfoTitle>
        <InfoText>{(summaryInfoCardData.totalOrderCost ?? 0).toLocaleString()} ₽</InfoText>
      </Flex>
      <Flex vertical>
        <InfoTitle>Стоимость товаров с учетом скидок и наценок</InfoTitle>
        <InfoText>{(summaryInfoCardData.totalOrderCost ?? 0).toLocaleString()} ₽</InfoText>
      </Flex>
      <Flex vertical>
        <InfoTitle>Стоимость доставки</InfoTitle>
        <InfoText>
          {paymentsCardData.totalDeliveryCost ? `${paymentsCardData.totalDeliveryCost} ₽` : 'Бесплатно'}
        </InfoText>
      </Flex>
      <Flex vertical>
        <InfoTitle>Стоимость доставки с учетом скидок и наценок</InfoTitle>
        <InfoText>
          {paymentsCardData.totalDeliveryCost ? `${paymentsCardData.totalDeliveryCost} ₽` : 'Бесплатно'}
        </InfoText>
      </Flex>
      {!!summaryInfoCardData.totalItemsWeight && (
        <Flex vertical>
          <InfoTitle>Вес</InfoTitle>
          <InfoText>{summaryInfoCardData.totalItemsWeight.toLocaleString()} кг</InfoText>
        </Flex>
      )}
      <Divider style={{ margin: 0 }} />
      <Flex align='center' justify='space-between'>
        <InfoTitle>Итого</InfoTitle>
        <Flex>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {(summaryInfoCardData.totalOrderCost ?? 0).toLocaleString()} ₽
          </Typography.Title>
        </Flex>
      </Flex>
    </Flex>
  )
}
