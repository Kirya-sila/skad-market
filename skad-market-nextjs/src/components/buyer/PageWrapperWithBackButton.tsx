import React from 'react'
import { ButtonBack } from '@/shared/ui/Button/ButtonBack'
import { Flex } from 'antd'

interface PageWrapperWithBackButtonProps {
  children: React.ReactNode
}

export const PageWrapperWithBackButton = ({ children }: PageWrapperWithBackButtonProps) => (
  <Flex vertical gap={24} style={{ width: '100%' }}>
    <ButtonBack to='/buyer'>Назад</ButtonBack>
    {children}
  </Flex>
)