import { FC, ReactNode, useState } from 'react'
import { ICItemSelected } from '@assets/icons'
import { Flex, Select, Typography } from 'antd'
import { DefaultOptionType, SelectProps } from 'antd/es/select'
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon'
import { primaryBlack } from '@/theme'

interface ISelectWithLabel extends SelectProps {
  items: { item: ReactNode; value: string }[]
  label?: string
}

export const SelectWithLabel: FC<ISelectWithLabel> = ({ items, label, ...rest }) => {
  const [selectedItems, setSelectedItems] = useState<DefaultOptionType[]>([])
  const handleSelect = (selectedItem: DefaultOptionType) => {
    setSelectedItems([...selectedItems, selectedItem])
  }

  const handleDeselect = (deselectedItem: DefaultOptionType) => {
    setSelectedItems(selectedItems.filter((item) => item !== deselectedItem))
  }
  return (
    <Flex vertical style={{ width: '100%' }} gap={4}>
      {!!label && (
        <Typography.Text style={{ color: primaryBlack, fontSize: 12, lineHeight: '16px', fontWeight: 600 }}>
          {label}
        </Typography.Text>
      )}
      <Select
        style={{ borderRadius: 8 }}
        {...rest}
        aria-multiselectable
        suffixIcon={<ArrowDownIcon />}
        onDeselect={handleDeselect}
        onSelect={handleSelect}
        //   onDropdownVisibleChange={(open: boolean) => setDropdownOpen(open)}
        menuItemSelectedIcon={<ICItemSelected />}
        showSearch
        //   style={{ width: otherProps.width ?? '100%', borderRadius: 16 }}
        //   {...otherProps}
        placeholder=''
      >
        {items?.map(({ item, value }) => (
          <Select.Option key={value} value={value}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </Flex>
  )
}
