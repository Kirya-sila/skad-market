import { CSSProperties, FC, ReactNode } from 'react'
import { Typography } from 'antd'
import { primaryBlack } from '@/theme'

interface IInfoTitle {
  children: ReactNode
  style?: CSSProperties
}

export const InfoTitle: FC<IInfoTitle> = ({ children, style = {} }) => {
  return (
    <Typography.Text style={{ fontSize: 14, lineHeight: '20px', fontWeight: 600, color: primaryBlack, ...style }}>
      {children}
    </Typography.Text>
  )
}
