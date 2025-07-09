import { Flex, Popover } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './BuyerOrderPage.module.scss'
import { CopyToClipboardIcon } from '@/assets/icons'
import { buyerCabinetStore } from '@/features/buyer'
import { useCopyToClipboard } from '@/shared/libs'

export const CopyOrder = observer(() => {
  const { currentOrder } = buyerCabinetStore
  const { copyToClipboard, open } = useCopyToClipboard()

  return (
    <Popover placement='top' content='Заказ скопирован' open={open}>
      <Flex className={css.copyButton} onClick={() => copyToClipboard(String(currentOrder.internalNumber))}>
        <CopyToClipboardIcon />
      </Flex>
    </Popover>
  )
})
