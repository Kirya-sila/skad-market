import { FC, ReactNode } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BackArrow } from '@/assets/icons'

interface IButtonBack {
  children: ReactNode
  to?: string
  handleButtonClick?: VoidFunction
}

export const ButtonBack: FC<IButtonBack> = ({ children, to, handleButtonClick }) => {
  const navigate = useNavigate()
  return (
    <Button
      style={{ alignSelf: 'flex-start', paddingLeft: 0 }}
      type='link'
      icon={<BackArrow />}
      iconPosition='start'
      onClick={() => {
        if (handleButtonClick) {
          handleButtonClick()
        }
        if (to) {
          navigate(to)
        }
      }}
    >
      {children}
    </Button>
  )
}
