import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { primaryRed } from '@/theme'

interface IErrorMessage {
  errorMessage: string
}

export const ErrorMessage: FC<IErrorMessage> = ({ errorMessage }) => {
  return (
    <Flex>
      <Typography.Text style={{ color: primaryRed, fontSize: 14, lineHeight: '24px' }}>{errorMessage}</Typography.Text>
    </Flex>
  )
}
