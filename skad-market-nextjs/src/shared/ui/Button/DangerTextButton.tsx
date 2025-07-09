import { FC, ReactNode } from 'react'
import { Button, ButtonProps } from 'antd'

interface IDangerTextButton extends ButtonProps {
  onClick: VoidFunction
  children: ReactNode
}

export const DangerTextButton: FC<IDangerTextButton> = ({ onClick, children, ...buttonProps }) => {
  return (
    <Button
      {...buttonProps}
      style={{ padding: 0 }}
      size='small'
      variant='link'
      color='danger'
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {children}
    </Button>
  )
}
