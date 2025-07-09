import { Button, Flex, Typography } from 'antd'
import { EditIconGrey } from '@/assets/icons'
import { Tooltip } from '@/shared/ui/Tooltip'
import { primaryBlack, primaryDarkGray, primaryDarkestGray } from '@/theme'

// interface IChangeNumberTooltip {}

const { Text } = Typography

const smallText = (text: string, color = primaryBlack) => (
  <Text style={{ fontSize: 12, fontWeight: 600, color }}>{text}</Text>
)

export const ChangeNumberTooltip = () => {
  const tooltipContent = (
    <Flex vertical gap={12} style={{ padding: 24, width: 280 }}>
      <Flex vertical align='flex-start' gap={4}>
        {smallText('Для изменения номера телефона свяжитесь с поддержкой SkadMarket', primaryDarkestGray)}
        <Text style={{ fontSize: 16, fontWeight: 500, color: primaryBlack }}>+7 (800) 250 87 68</Text>
        {smallText('пн-пт 09:00-21:00', primaryDarkGray)}
      </Flex>
      {/* <Flex justify='flex-start'>
        <Button type='link' variant='text' style={{ padding: 0 }}>
          Напишите нам
        </Button>
      </Flex> */}
    </Flex>
  )

  return (
    <Tooltip id='change-phone' content={tooltipContent} clickable place='bottom'>
      <div style={{ height: '20px' }}>
        <EditIconGrey />
      </div>
    </Tooltip>
  )
}
