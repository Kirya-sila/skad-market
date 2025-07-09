import { useState } from 'react'
import { ICItemSelected } from '@assets/icons'
import { ArrowDownIcon } from '@assets/icons/ArrowDownIcon'
import { Select, SelectProps } from 'antd'
import cn from 'classnames'
import { useField } from 'formik'
import 'rc-select/assets/index.css'
import css from './SelectionInput.module.scss'
import { IDropdownOption } from '@/interfaces'

interface IFormikSelectionInput extends SelectProps {
  className?: string
  options: IDropdownOption[]
  error?: boolean
  name: string
  width?: number
  onSelectValue?: (name: string, value: string | number) => void
  handleChange?: (name: string, value: string) => void
}

export const FormikSelectionInput = ({
  className,
  options,
  error,
  name,
  onSelectValue,
  handleChange,
  ...otherProps
}: IFormikSelectionInput) => {
  const [{ value }, , { setValue }] = useField(name)
  const [isFocus, setFocus] = useState(false)


  const handleSelect = (value: string) => {
    setValue(value)
    if (onSelectValue) {
      onSelectValue(name, value)
    }
  }

  const onChange = (value: string) => {
    handleChange?.(name, value)
  }

  const isLabel = isFocus || !!value

  return (
    <div
      className={cn(css.selectionInput, className, {
        [css.selected]: !!value,
        [css.error]: error,
      })}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      // style={style as any}
    >
      <Select
        {...otherProps}
        aria-multiselectable
        suffixIcon={<ArrowDownIcon />}
        // onDeselect={handleDeselect}
        onSelect={handleSelect}
        onChange={onChange}
        menuItemSelectedIcon={<ICItemSelected />}
        showSearch
        style={{ width: otherProps.width ?? '100%', borderRadius: 16 }}
        value={value}
        options={options}
        popupMatchSelectWidth={false}
        placeholder=''
        allowClear
      />
      <label
        className={cn(css.label, {
          [css.asLabel]: isLabel,
          [css.asPlaceholder]: !isLabel,
          [css.disabled]: otherProps.disabled,
        })}
      >
        {otherProps.placeholder}
      </label>
    </div>
  )
}

FormikSelectionInput.displayName = 'FormikSelectionInput'
