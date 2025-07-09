import { FC } from 'react'
import { Button, Flex } from 'antd'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import css from './CancelOrderModal.module.scss'
import { appRoutes } from '@/app-settings'
import { managersOrderStore } from '@/features/manager'
import { BaseModalContainer, CardTitle } from '@/shared/ui'

export const OrderCanceledInfoModal: FC<{ orderNumber: number | undefined }> = observer(({ orderNumber }) => {
  const navigate = useNavigate()
  const { handleOpenOrderCanceledInfoModal } = managersOrderStore

  const handleClick = () => {
    navigate(appRoutes.manager.orders.root)
    handleOpenOrderCanceledInfoModal(false)
  }

  return (
    <BaseModalContainer
      bodyClassName={cn(css.body, css.confirm)}
      onClose={() => {
        handleOpenOrderCanceledInfoModal(false)
      }}
    >
      <Flex vertical gap={24} style={{ padding: '0 40px 40px' }}>
        <CardTitle>Заказ {orderNumber || ''} отменен</CardTitle>

        <Button type='primary' size='large' onClick={handleClick}>
          Ко всем заказам
        </Button>
      </Flex>
    </BaseModalContainer>
  )
})
