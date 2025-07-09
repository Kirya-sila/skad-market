import { useState } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { SectionWrapper } from '../SectionWrapper'
import { BuyerInfoModal } from './Buyer/BuyerModal'
import { BuyerInfo } from './BuyerInfo'
import { orderStore } from '@/features/order/model/orderStore'
import { ErrorMessage, RegularButton } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

export const BuyerContainer = observer(() => {
  const { hasPersonBuyerInfo, hasBuyerInfoTouched, isBuyerInfoLoading } = orderStore
  const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   getBuyerInfo(id ?? '')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id])

  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  const Component = hasPersonBuyerInfo ? (
    <BuyerInfo onClick={handleOpen} />
  ) : (
    <RegularButton onClick={handleOpen} appearance='secondary' size='small' text='Указать данные получателя >' />
  )

  return (
    <>
      <Flex vertical gap={4}>
        {isBuyerInfoLoading ? (
          <Spinner />
        ) : (
          <SectionWrapper title={!hasPersonBuyerInfo ? 'Покупатель' : ''}>{Component}</SectionWrapper>
        )}
        {!hasPersonBuyerInfo && hasBuyerInfoTouched && (
          <Flex style={{ marginLeft: 40 }}>
            <ErrorMessage errorMessage='Заполните данные получателя' />
          </Flex>
        )}
      </Flex>
      {open && <BuyerInfoModal onClose={handleOpen} />}
    </>
  )
})
