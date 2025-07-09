import { CSSProperties, FC, ReactNode } from 'react'
import { Typography } from 'antd'
import { primaryBlack } from '@/theme'

interface ICardTitle {
  children: ReactNode
  style?: CSSProperties
}

export const CardTitle: FC<ICardTitle> = ({ children, style = {} }) => {
  return (
    <Typography.Text style={{ fontSize: 24, lineHeight: '30px', fontWeight: 600, color: primaryBlack, ...style }}>
      {children}
    </Typography.Text>
  )
}
