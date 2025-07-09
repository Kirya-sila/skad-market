import React, { useRef } from 'react'
import cn from 'classnames'
import css from './DropdownButton.module.scss'
import { ICArrowDownLine, ICCheckLine } from '@assets/icons'
import { useToggleV2 } from '@shared/libs'
import { useOnClickOutside } from '@shared/libs/hooks/useOnClickOutside'

interface DropdownButtonProps {
  className?: string
  label: string
  list: string[]
  onSelect: (item: string) => void
  disabledItems?: string[]
  selectedItems?: string[]
}

export const DropdownButton = ({
  className,
  label,
  list,
  onSelect,
  disabledItems,
  selectedItems,
}: DropdownButtonProps) => {
  const { value: opened, toggle, off: close } = useToggleV2()
  const ref = useRef(null)

  const handleSelect = (item: string) => () => {
    onSelect(item)
    close()
  }

  useOnClickOutside(ref, close)

  return (
    <div className={cn(css.dropdownButton, className, opened && css.opened)} ref={ref}>
      <div className={css.label} onClick={toggle}>
        {label}
        <div className={css.icon}>
          <ICArrowDownLine />
        </div>
      </div>
      <div className={css.list}>
        <div className={css.scroll}>
          {list.map((item) => (
            <div
              key={item}
              className={cn(css.listItem, {
                [css.disabled]: disabledItems?.includes(item),
                [css.selected]: selectedItems?.includes(item),
              })}
              onClick={handleSelect(item)}
            >
              {item}
              <div className={css.selectIcon}>
                <ICCheckLine />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

DropdownButton.displayName = 'DropdownButton'
