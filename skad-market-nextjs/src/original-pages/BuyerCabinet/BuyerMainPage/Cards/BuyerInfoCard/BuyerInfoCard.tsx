import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './BuyerInfoCard.module.scss'
import { UserIcon } from '@/assets/icons'
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon'
import { buyerCabinetStore } from '@/features/buyer'
import { primaryLightestGray } from '@/theme'

// interface IBuyerInfoCard {}

const { Title } = Typography

export const BuyerInfoCard = observer(() => {
  const { userFullName } = buyerCabinetStore
  return (
    <Flex
      vertical
      gap={24}
      style={{
        padding: 16,
        borderRadius: 20,
        width: '100%',
        backgroundColor: primaryLightestGray,
        cursor: 'pointer',
      }}
    >
      <Flex justify='space-between' align='center'>
        <Flex gap={8} align='center'>
          <Flex className={css.icon}>
            <UserIcon />
          </Flex>
          <Title level={4} style={{ marginTop: 0 }}>
            {userFullName}
          </Title>
        </Flex>
        <Flex align='center' style={{ transform: 'rotate(-90deg)' }}>
          <ArrowDownIcon />
        </Flex>
      </Flex>
    </Flex>
  )
})
