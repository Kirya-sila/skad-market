import { FC, ComponentType } from 'react'
import { DatePicker as AntDatePicker, DatePickerProps, Flex, Typography } from 'antd'
import styled, { StyledComponent } from 'styled-components'
import { primaryBlack, primaryLightestGray } from '@/theme'

interface IDatePicker extends DatePickerProps {
  label?: string
}

const Picker = styled(AntDatePicker)({
  '&.ant-picker-outlined': {
    borderColor: primaryLightestGray,
  },
})

export const DatePicker: FC<IDatePicker> = ({ label, onChange, ...rest }) => {
  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (onChange) {
      onChange(date, dateString)
    }
  }

  return (
    <Flex vertical style={{ width: '100%' }} gap={4}>
      {!!label && (
        <Typography.Text style={{ color: primaryBlack, fontSize: 12, lineHeight: '16px', fontWeight: 600 }}>
          {label}
        </Typography.Text>
      )}
      <Picker<StyledComponent<ComponentType, IDatePicker>>
        {...rest}
        onChange={onDateChange}
        format='DD-MM-YYYY'
        // locale='en'
      />
    </Flex>
  )
}
