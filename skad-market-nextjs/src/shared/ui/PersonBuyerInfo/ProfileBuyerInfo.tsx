import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { BuyerRow } from './BuyerRow'
import { AdditionalBuyerIcon, BuyerIcon } from '@/assets/icons'
import { IBuyerCabinetOrder } from '@/interfaces'
import { primaryBlack } from '@/theme'

interface IProfileBuyerInfo {
  personalInfo: IBuyerCabinetOrder | Record<string, never>
  isOtherPerson: boolean
}

const { Text } = Typography

export const ProfileBuyerInfo: FC<IProfileBuyerInfo> = observer(({ personalInfo, isOtherPerson = false }) => {
  return (
    <Flex vertical align='flex-start' gap={16}>
      <BuyerRow icon={<BuyerIcon />} text={`${personalInfo.buyerFullName}, ${personalInfo.buyerPhonenumber}`} />
      {isOtherPerson && personalInfo.otherRecieverFullName && (
        <Flex vertical gap={8}>
          <Text style={{ fontSize: 16, lineHeight: '20px', fontWeight: 600, color: primaryBlack }}>
            Получатель другой человек
          </Text>
          <BuyerRow
            icon={<AdditionalBuyerIcon />}
            text={`${personalInfo.otherRecieverFullName}, ${personalInfo.otherRecieverPhonenumber}`}
          />
        </Flex>
      )}
    </Flex>
  )
})
