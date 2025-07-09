import { FC, ReactNode } from 'react'
import { Flex, Typography } from 'antd'
import { useWindowSize } from '@/shared/libs'

interface ICard {
  title: ReactNode
  titleRightContent?: ReactNode
  children?: ReactNode
}

const { Title } = Typography

export const Card: FC<ICard> = ({ title, titleRightContent, children }) => {
  const { width } = useWindowSize()
  const isTablet = width < 1024
  const isLaptop = width < 1440

  return (
    <Flex
      vertical
      gap={24}
      style={{
        boxShadow: '0px 8px 40px 0px #1C283317, 0px 2px 10px 0px #1C28330A',
        padding: isTablet ? 16 : `32px ${isLaptop ? 32 : 40}px`,
        borderRadius: isTablet ? 12 : 20,
        width: '100%',
      }}
    >
      <Flex justify='space-between' align='center'>
        <Title level={4} style={{ marginTop: 0 }}>
          {title}
        </Title>
        {titleRightContent}
      </Flex>
      {children}
    </Flex>
  )
}
