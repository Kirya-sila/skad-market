import { ChangeEvent, FC } from 'react'
import productCardImageSrc3 from '@assets/images/product_card_image_3.png'
import { Button, Divider, Flex, Input, Radio, RadioChangeEvent, Space, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './CancelOrderModal.module.scss'
import { OrderItemRow } from './OrderItemRow'
import { CancelOrderTypes } from '@/constants'
import { managersOrderStore } from '@/features/manager'
import { AntRadio, BaseModalContainer, InfoText, InfoTitle, SectionTitle } from '@/shared/ui'
import { primaryBlack } from '@/theme'

interface ICancelOrderModal {
  orderNumber: number | undefined
}

const { Title } = Typography
const { TextArea } = Input

const mockData = [
  {
    id: '1',
    title: 'Литые диски Висмут (КС1009) 7.000xR16 5x114.3 DIA67.1 ET45',
    image: productCardImageSrc3,
    count: 2,
  },
]

export const CancelOrderModal: FC<ICancelOrderModal> = observer(({ orderNumber = '' }) => {
  const {
    handleOpenCancelOrderModal,
    handleOpenConfirmCancelOrder,
    cancelOrderReason,
    handleCancelOrderReason,
    handleCancelOrderReasonComment,
    resetCancelOrderForm,
  } = managersOrderStore

  const onChange = (e: RadioChangeEvent) => {
    handleCancelOrderReason(e.target.value)
  }

  const changeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleCancelOrderReasonComment(e.target.value)
  }

  const handleClickCancel = () => {
    handleOpenCancelOrderModal(false)
    handleOpenConfirmCancelOrder(true)
  }

  return (
    <BaseModalContainer
      bodyClassName={css.body}
      onClose={() => {
        resetCancelOrderForm()
        handleOpenCancelOrderModal(false)
      }}
    >
      <Flex vertical style={{ padding: '0 40px 40px' }}>
        <Title level={4} style={{ marginBottom: 24, marginTop: 0 }}>
          Отмена заказа {orderNumber}
        </Title>
        <SectionTitle style={{ marginBottom: 16 }}>Состав заказа</SectionTitle>
        <Flex vertical>
          {mockData.map(({ id, ...rest }) => (
            <OrderItemRow key={id} orderItem={rest} />
          ))}
        </Flex>
        <Divider style={{ margin: '16px 0 8px', borderColor: primaryBlack }} />
        <Flex style={{ marginBottom: 24 }}>
          <InfoTitle>
            Стоимость: <InfoText>{'102290'.toLocaleString()} ₽</InfoText>
          </InfoTitle>
        </Flex>
        <SectionTitle style={{ marginBottom: 16 }}>Выберите причину отмены</SectionTitle>
        <Radio.Group onChange={onChange} value={cancelOrderReason.reason}>
          <Space direction='vertical' style={{ marginBottom: 24 }}>
            <AntRadio
              value={CancelOrderTypes.outOfStock}
              checked={cancelOrderReason.reason === CancelOrderTypes.outOfStock}
            >
              Нет в наличии
            </AntRadio>
            <AntRadio value={CancelOrderTypes.otherReason} checked={cancelOrderReason.reason === CancelOrderTypes.otherReason}>
              Другое
            </AntRadio>
          </Space>
        </Radio.Group>
        <Flex vertical gap={4}>
          <InfoTitle>Комментарий</InfoTitle>
          <TextArea
            rows={3}
            placeholder='Максимум 255 символов'
            maxLength={255}
            style={{ marginBottom: 24 }}
            onChange={changeComment}
          />
        </Flex>
        <Button type='primary' danger size='large' onClick={handleClickCancel}>
          Отменить заказ
        </Button>
      </Flex>
    </BaseModalContainer>
  )
})
