import { FC, ReactNode } from 'react'
import { Flex } from 'antd'
import { appRoutes } from '@/app-settings'
import { useWindowSize } from '@/shared/libs'
import { ButtonBack } from '@/shared/ui'

interface IPageWrapperWithBackButton {
  children: ReactNode
}

export const PageWrapperWithBackButton: FC<IPageWrapperWithBackButton> = ({ children }) => {
  const { width } = useWindowSize()
  const isTablet = width < 1024

  return (
    <Flex vertical gap={16} style={{ marginTop: 18 }}>
      {isTablet && <ButtonBack to={appRoutes.buyer.root}>Назад</ButtonBack>}
      {children}
    </Flex>
  )
}
