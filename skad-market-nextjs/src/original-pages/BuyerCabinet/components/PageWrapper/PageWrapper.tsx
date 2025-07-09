import { CSSProperties, FC, ReactNode } from 'react'
import { Flex, Typography } from 'antd'

interface IPageWrapper {
  title: string
  button?: ReactNode
  children: ReactNode
  width?: string
  styles?: CSSProperties
}

const { Title } = Typography

export const PageWrapper: FC<IPageWrapper> = ({ title, button, children, width,  styles = {} }) => {
  return (
    <Flex vertical gap={24} style={{ ...styles, width: '100%' }}>
      <Flex style={{ width, justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ fontSize: 30, marginTop: 0 }}>
          {title}
        </Title>
        <Flex>{button}</Flex>
      </Flex>
      {children}
    </Flex>
  )
}
