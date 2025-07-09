import { CSSProperties, FC, ReactNode } from 'react'
import { Typography } from 'antd'
import { primaryBlack } from '@/theme'

interface ISectionTitle {
  children: ReactNode
  style?: CSSProperties
}

export const SectionTitle: FC<ISectionTitle> = ({ children, style = {} }) => {
  return (
    <Typography.Text style={{ fontSize: 16, lineHeight: '26px', fontWeight: 600, color: primaryBlack, ...style }}>
      {children}
    </Typography.Text>
  )
}
