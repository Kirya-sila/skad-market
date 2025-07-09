import { FC, ReactNode } from 'react'
import { Button } from 'antd'

interface IPrimaryTextButton {
  onClick: VoidFunction
  children: ReactNode
}

export const PrimaryTextButton: FC<IPrimaryTextButton> = ({ onClick, children }) => {
  return (
    <Button
      style={{ padding: 0 }}
      variant='link'
      color='primary'
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {children}
    </Button>
  )
}
