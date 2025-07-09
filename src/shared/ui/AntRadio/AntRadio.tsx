import { FC, ReactNode } from 'react'
import { Radio } from 'antd'
import { RadioButtonProps } from 'antd/es/radio/radioButton'
import styled from 'styled-components'

interface IAntRadio extends RadioButtonProps {
  children: ReactNode
  checked: boolean
}

const StyledRadio = styled(Radio)<{ checked: boolean }>(({ checked }) => ({
  '&.ant-radio-wrapper span.ant-radio+*': {
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: checked ? 600 : 400,
  },
}))

export const AntRadio: FC<IAntRadio> = ({ children, checked, ...rest }) => {
  return <StyledRadio {...rest} checked={checked}>{children}</StyledRadio>
}
