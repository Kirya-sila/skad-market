import { Button, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { managersOrderStore } from '@/features/manager'
import { OrderStatus } from '@/interfaces'
import { InfoText, InfoTitle, SectionTitle } from '@/shared/ui'
import { primaryDarkestGray, primaryOrange } from '@/theme'

const InfoWrapper = styled(Flex)({
  alignItems: 'center',
  gap: 8,
})

export const OrderInfo = observer(() => {
  const { orderId = '' } = useParams()

  const {
    handleOpenHistoryModal,
    handleOpenCancelOrderModal,
    getOrderHistory,
    assignedManager,
    getOrderFormFile,
    orderStatusInfo: { status, paymentStatus, createdAt, updatedAt },
  } = managersOrderStore

  const handleOrderHistory = () => {
    handleOpenHistoryModal(true)
    getOrderHistory(orderId)
  }

  return (
    <Flex vertical gap={36}>
      <Flex justify='space-between' align='center'>
        <Flex gap={24}>
          <InfoWrapper gap={8}>
            <InfoTitle>Статус заказа:</InfoTitle>
            <InfoText style={{ color: status === OrderStatus.new ? primaryOrange : primaryDarkestGray }}>
              {status ?? ''}
            </InfoText>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Статус оплаты:</InfoTitle>
            <InfoText>{paymentStatus}</InfoText>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Создан:</InfoTitle>
            <InfoText>{moment(createdAt).format('DD.MM.YYYY, HH:mm')}</InfoText>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Изменен:</InfoTitle>
            <InfoText>{moment(updatedAt).format('DD.MM.YYYY, HH:mm')}</InfoText>
          </InfoWrapper>
        </Flex>
        <Flex gap={8}>
          <Button variant='link' color='primary' onClick={handleOrderHistory}>
            История изменений
          </Button>
          <Button variant='link' color='primary' onClick={() => getOrderFormFile(orderId)}>
            Печать накладной
          </Button>
          {status !== OrderStatus.canceled && (
            <Button
              variant='text'
              color='danger'
              disabled={!assignedManager}
              onClick={() => handleOpenCancelOrderModal(true)}
            >
              Отменить заказ
            </Button>
          )}
        </Flex>
      </Flex>
      {status === OrderStatus.canceled && (
        <Flex vertical gap={8}>
          <SectionTitle>Причина отмены</SectionTitle>
          <InfoText>
            Текст комментария не особо длинный, но присутствует. Текст комментария не особо длинный, но присутствует
          </InfoText>
        </Flex>
      )}
    </Flex>
  )
})
