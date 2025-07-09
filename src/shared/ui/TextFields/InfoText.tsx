import { CSSProperties, FC, ReactNode } from 'react'
import { Typography } from 'antd'
import { primaryDarkestGray } from '@/theme'

interface IInfoText {
  children: ReactNode
  style?: CSSProperties
}

export const InfoText: FC<IInfoText> = ({ children, style = {} }) => {
  return (
    <Typography.Text style={{ fontSize: 14, lineHeight: '24px', color: primaryDarkestGray, ...style }}>
      {children}
    </Typography.Text>
  )
}
