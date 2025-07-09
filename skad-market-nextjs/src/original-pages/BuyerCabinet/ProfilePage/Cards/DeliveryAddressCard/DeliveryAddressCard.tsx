import { useEffect } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { EditIconGrey, TrackNumberIcon } from '@/assets/icons'
import { deliveryItemsStore } from '@/features'
import { buyerCabinetStore } from '@/features/buyer'
import { Card } from '@/pages'
import { BuyerProfilePreferedDeliveryWaysModal, InfoTitle, SectionTitle } from '@/shared/ui'
import { primaryBlack, primaryDarkestGray } from '@/theme'

// interface IDeliveryAddressCard {}

export const DeliveryAddressCard = observer(() => {
  const {
    currentProfileDeliveryAddress,
    currentProfileDeliveryType,
    showPreferedDeliveryItemsModal,
    openPreferedDeliveryItemsModal,
  } = buyerCabinetStore
  const { getUserDeliveryItems, hasUserDeliveryItems } = deliveryItemsStore

  useEffect(() => {
    getUserDeliveryItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!hasUserDeliveryItems) {
    return null
  }

  return (
    <>
      <Card title='Адрес доставки'>
        <Flex vertical gap={24}>
          <Flex align='flex-start' gap={6}>
            <Flex style={{ marginTop: 2 }}>
              <TrackNumberIcon color={primaryBlack} />
            </Flex>
            <Flex vertical>
              <InfoTitle>{currentProfileDeliveryType}</InfoTitle>
              <Flex gap={4}>
                <SectionTitle style={{ color: primaryDarkestGray }}>{currentProfileDeliveryAddress}</SectionTitle>
                <Flex onClick={openPreferedDeliveryItemsModal} style={{ cursor: 'pointer' }}>
                  <EditIconGrey />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {showPreferedDeliveryItemsModal && <BuyerProfilePreferedDeliveryWaysModal />}
    </>
  )
})
