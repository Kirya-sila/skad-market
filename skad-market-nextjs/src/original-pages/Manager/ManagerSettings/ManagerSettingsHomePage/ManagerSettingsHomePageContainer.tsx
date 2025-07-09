import { FC, ReactNode } from 'react'
import { Flex, Typography } from 'antd'

interface IManagerSettingsHomePageContainer {
  title?: string
  children: ReactNode
}

const { Text } = Typography

export const ManagerSettingsHomePageContainer: FC<IManagerSettingsHomePageContainer> = ({ title = '', children }) => {
  return (
    <Flex>
      <Text>{title}</Text>
      {children}
    </Flex>
  )
}
