import { ReactNode } from 'react'
import { Flex, Typography } from 'antd'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import useIsMobile from '@/shared/libs/hooks/useIsMobile'

const { Title } = Typography

export const ErrorBoundary = () => {
  const isMobile = useIsMobile()
  const error = useRouteError()
  let errorMessage: ReactNode

  if (isRouteErrorResponse(error)) {
    errorMessage = (
      <Flex vertical align='center' gap={32}>
        <Flex justify='center'>Запрашиваемая страница не существует</Flex>
        <Flex style={{ fontSize: isMobile ? '30px' : '48px' }}>{`${error.status} ${error.statusText}`}</Flex>
      </Flex>
    )
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <Flex style={{ height: '100vh' }} justify='center' align='center'>
      <Title level={1} style={{ textAlign: 'center', fontSize: isMobile ? '24px' : '36px' }}>
        {errorMessage}
      </Title>
    </Flex>
  )
}
