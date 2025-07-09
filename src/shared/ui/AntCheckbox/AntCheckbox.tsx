import { FC } from 'react'
import { Checkbox, CheckboxProps } from 'antd'
import styled from 'styled-components'

const AntDCheckbox = styled(Checkbox)({
  '& .ant-checkbox-inner': {
    width: 20,
    height: 20,
    '&::after': {
      insetInlineStart: '30%',
    },
  },
 
  '&.ant-checkbox-wrapper': {
    lineHeight: '20px',
    '& .ant-checkbox': {
        marginRight: 8,
      },
  },
})

export const AntCheckbox: FC<CheckboxProps> = ({ children, ...rest }) => {
  return <AntDCheckbox {...rest}>{children}</AntDCheckbox>
}
