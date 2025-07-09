import { FC, ReactNode } from 'react'
import { Typography } from 'antd'
import { EllipsisConfig } from 'antd/es/typography/Base'
import { EditIconPrimary } from '@/assets/icons'

interface IEditableTextField {
  children: ReactNode
  onChange: (value: string) => void
  ellipsis?: boolean | EllipsisConfig | undefined
}

export const EditableTextField: FC<IEditableTextField> = ({ children, onChange, ellipsis }) => {
  return (
    <Typography.Paragraph
      ellipsis={ellipsis}
      editable={{ onChange, enterIcon: null, icon: <EditIconPrimary /> }}
      style={{ marginBottom: 0 }}
    >
      {children}
    </Typography.Paragraph>
  )
}
