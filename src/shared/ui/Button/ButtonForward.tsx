import { FC, ReactNode } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { ICArrowRightLine } from '@/assets/icons'
import { useNavigateWithScrollUp } from '@/shared/libs'
import { primaryMainBlue } from '@/theme'

interface IButtonForward {
  children: ReactNode
  to: string
}

const StyledButton = styled(Button)({
  padding: 0,
  '& svg path': {
    fill: primaryMainBlue,
  },
})

export const ButtonForward: FC<IButtonForward> = ({ to, children }) => {
  const navigate = useNavigateWithScrollUp()

  return (
    <StyledButton type='link' iconPosition='end' icon={<ICArrowRightLine />} onClick={() => navigate(to)}>
      {children}
    </StyledButton>
  )
}
