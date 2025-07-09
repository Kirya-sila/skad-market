import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { appRoutes } from '@/app-settings'
import { primaryBlack, primaryDarkGray, primaryDarkestGray, primaryLightBlue } from '@/theme'
import { useWindowSize, useWindowState } from '@/shared/libs'
import { useMemo } from 'react'

const { Text } = Typography

const StyledButton = styled(Button)({
  '& span:hover': {
    color: primaryLightBlue,
  },
})

const linkButton = (label: string, onClick: () => void) => (
  <StyledButton
    type='link'
    size='small'
    style={{ color: primaryDarkestGray, paddingLeft: 0, paddingRight: 0 }}
    onClick={onClick}
  >
    {label}
  </StyledButton>
)

const smallText = (text: string, color = primaryBlack) => (
  <Text style={{ fontSize: 12, fontWeight: 600, color }}>{text}</Text>
)

export const FaqSection = () => {
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isMobile = width < 768
  const isTablet = width < 1024
  const isBigSize = width >= 1024

  const handleClick = (to: string) => () => {
    navigate(to)
  }

  const askQuestion = (
    <Flex vertical gap={12}>
      {smallText('Не нашли ответа? Напишите нам')}
      <Button style={{ marginBottom: 16 }}>Задать вопрос</Button>
    </Flex>
  )

  const callBack = (
    <Flex vertical align={isBigSize ? 'flex-end' : 'flex-start'}>
      {smallText('Возникли вопросы? Позвоните')}
      <Text style={{ fontSize: 16, fontWeight: 500 }}>+7 (800) 250 87 68</Text>
      {smallText('пн-пт 09:00-21:00', primaryDarkGray)}
    </Flex>
  )

  return (
    <Flex
      vertical
      style={
        isBigSize || isMobile
          ? { flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end' }
          : { justifyContent: 'space-between' }
      }
    >
      {/* <Flex
        gap={6}
        style={
          isBigSize || isMobile
            ? { flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: 24 }
            : { justifyContent: 'space-between', marginBottom: 24 }
        }
      >
        <Flex vertical gap={18}>
          {linkButton('Как отследить доставку заказа?', handleClick(appRoutes.buyer.orders.root))}
          {isTablet && !isMobile && askQuestion}
        </Flex>

        <Flex vertical gap={18}>
          {linkButton('Как изменить дату или место заказа?', handleClick(appRoutes.buyer.orders.root))}
          {isTablet && !isMobile && callBack}
        </Flex>
        {linkButton('Как оформить заказ?', handleClick(appRoutes.buyer.orders.root))}
      </Flex> */}

      {/* {(isBigSize || isMobile) && askQuestion} */}
      {(isBigSize || isMobile) && callBack}
    </Flex>
  )
}
