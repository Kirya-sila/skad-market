import { ReactNode, useMemo, useState } from 'react'
// import /* Select, */ { Option, SelectProps } from 'rc-select'
import { ICItemSelected } from '@assets/icons'
import { Select, SelectProps } from 'antd'
import cn from 'classnames'
import 'rc-select/assets/index.css'
import { DefaultOptionType } from 'rc-select/es/Select'
import css from './SelectionInput.module.scss'

export interface SelectionInputProps extends SelectProps {
  className?: string
  items: { item: ReactNode; value: string }[]
  error?: boolean
  width?: number
  inputValuePlaceholder?: string
}

export const SelectionInput = ({
  className,
  items,
  error,
  value,
  loading,
  placeholder = '',
  inputValuePlaceholder = '',
  ...otherProps
}: SelectionInputProps) => {
  const [selectedItems, setSelectedItems] = useState<DefaultOptionType[]>([])
  const [isFocus, setFocus] = useState(false)
  // const [isDropdownOpen, setDropdownOpen] = useState(false)
  // if (!items?.length) return null

  // const rcSelectWidth = otherProps.width ? `${otherProps.width}px` : '100%'

  // const style = otherProps?.placeholder
  //   ? {
  //       '--rc-select-label': `"${otherProps?.placeholder || 'Label'}"`,
  //       '--rc-select-width': rcSelectWidth,
  //     }
  //   : {
  //       '--rc-select-width': rcSelectWidth,
  //     }

  const handleSelect = (selectedItem: DefaultOptionType) => {
    setSelectedItems([...selectedItems, selectedItem])
  }

  const handleDeselect = (deselectedItem: DefaultOptionType) => {
    setSelectedItems(selectedItems.filter((item) => item !== deselectedItem))
  }

  const isLabel = isFocus || !!selectedItems.length || !!value

  const options = useMemo(() => items.map(({ value, item }) => ({ label: item, value })), [items])

  return (
    <div
      className={cn(css.selectionInput, className, {
        [css.selected]: selectedItems.length || !!value,
        [css.error]: error,
      })}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      // style={style as any}
    >
      <Select
        {...otherProps}
        aria-multiselectable
        // suffixIcon={<ArrowDownIcon />}
        onDeselect={handleDeselect}
        onSelect={handleSelect}
        // onDropdownVisibleChange={onDropdownVisibleChange}
        menuItemSelectedIcon={<ICItemSelected />}
        showSearch
        style={{ width: otherProps.width ?? '100%', borderRadius: 16 }}
        value={loading ? inputValuePlaceholder : value}
        loading={loading}
        options={options}
        disabled={loading}
        optionFilterProp='label'
      />
      {/* {items?.map(({ item, value }) => (
          <Select.Option key={value} value={value}>
            {item}
          </Select.Option>
        ))}
      </Select> */}
      <label className={cn(css.label, { [css.asLabel]: isLabel, [css.asPlaceholder]: !isLabel })}>{placeholder}</label>
    </div>
  )
}

SelectionInput.displayName = 'SelectionInput'
