import { Flex, Typography } from 'antd'
import { InfoText, InfoTitle } from '@/shared/ui'
import { managersOrderStore } from '@/features/manager'
import { observer } from 'mobx-react-lite'

export const BuyerCard = observer(() => {
  const { buyerCardData } = managersOrderStore
  return (
    <Flex vertical gap={10}>
      {!!buyerCardData.buyerType && (
        <Flex vertical>
          <InfoTitle>Тип плательщика</InfoTitle>
          <InfoText>{buyerCardData.buyerType}</InfoText>
        </Flex>
      )}
      {!!buyerCardData.buyerFullName && (
        <Flex vertical>
          <InfoTitle>Покупатель</InfoTitle>
          <InfoText>{`${buyerCardData.buyerFullName}, ${buyerCardData.buyerPhonenumber}`}</InfoText>
        </Flex>
      )}
      {!!buyerCardData.otherRecieverFullName?.trim() && (
        <Flex vertical>
          <InfoTitle>Получатель</InfoTitle>
          <InfoText>{`${buyerCardData.otherRecieverFullName}, ${buyerCardData.otherRecieverPhonenumber}`}</InfoText>
        </Flex>
      )}
      {!!buyerCardData.buyerEmail && (
        <Flex vertical>
          <InfoTitle>E-mail</InfoTitle>
          <InfoText>{buyerCardData.buyerEmail}</InfoText>
        </Flex>
      )}
      {/* <Flex vertical>
        <InfoTitle>Выбранный автомобиль</InfoTitle>
        <InfoText>???</InfoText>
      </Flex> */}
    </Flex>
  )
})
