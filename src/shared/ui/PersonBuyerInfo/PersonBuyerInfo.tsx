import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { BuyerRow } from './BuyerRow'
import { AdditionalBuyerIcon, BuyerIcon } from '@/assets/icons'
import { IBuyerContactInfo } from '@/interfaces'
import { primaryBlack } from '@/theme'

interface IPersonBuyerInfo {
  personalInfo: IBuyerContactInfo
  isOtherPerson: boolean
}

const { Text } = Typography

export const PersonBuyerInfo: FC<IPersonBuyerInfo> = observer(({ personalInfo, isOtherPerson = false }) => {
  return (
    <Flex vertical align='flex-start' gap={16}>
      <BuyerRow
        icon={<BuyerIcon />}
        text={`${personalInfo.firstName} ${personalInfo.lastName}, +7${personalInfo.phoneNumber}`}
      />
      {isOtherPerson && personalInfo.otherPersonFirstName && (
        <Flex vertical gap={8}>
          <Text style={{ fontSize: 16, lineHeight: '20px', fontWeight: 600, color: primaryBlack }}>
            Получатель другой человек
          </Text>
          <BuyerRow
            icon={<AdditionalBuyerIcon />}
            text={`${personalInfo.otherPersonFirstName} ${personalInfo.otherPersonLastName}, +7${personalInfo.otherPersonPhoneNumber}`}
          />
        </Flex>
      )}
    </Flex>
  )
})
