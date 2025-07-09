import { ChangeEvent, FC, useState, KeyboardEvent } from 'react'
import { Button, Input, Space } from 'antd'
import styled from 'styled-components'
import { SearchIcon } from '@/assets/icons'
import { primaryMainBlue } from '@/theme'

interface ISearchWithPrefix {
  placeholder?: string
  buttonText?: string
  onSearch: (search: string) => void
  allowClear?: boolean
}

const StyledInput = styled(Input)({
  '&.ant-input-outlined': {
    borderColor: primaryMainBlue,
  },
})

export const SearchWithPrefix: FC<ISearchWithPrefix> = ({
  placeholder,
  buttonText = '',
  allowClear = true,
  onSearch,
}) => {
  const [search, setSearch] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClear = () => {
    setSearch('')
    onSearch('')
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') onSearch(search)
  }

  return (
    <Space.Compact block>
      <StyledInput
        placeholder={placeholder}
        allowClear={allowClear}
        onClear={handleClear}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <Button style={{ width: 50 }} type='primary' icon={<SearchIcon />} onClick={() => onSearch(search)}>
        {buttonText}
      </Button>
    </Space.Compact>
  )
}
