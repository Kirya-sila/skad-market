import { FilterTabMobile } from '@shared/ui'
import { ColorFilter } from '@shared/ui/ColorFilter'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { FilterProps } from './types'
import { localizeFilterName } from './utils'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import { FilterItem } from '@/entities/Rims/ui/FilterItem'
import css from '@/entities/Rims/ui/FilterItem/FilterItem.module.scss'
import { Colors } from '@/shared/types'

interface ColorFilterItemProps extends FilterProps {
  isMobile?: boolean
}

export const ColorFilterItem = observer(({ filter, isMobile }: ColorFilterItemProps) => {
  const { toggleFilter } = rimsStore

  const handleRowClick = (value: string | number) => {
    toggleFilter(filter.name, value)
  }

  const items = filter.values.map(({ value, isActive, isAvailable }) => {
    return {
      row: value,
      checked: isActive,
      disabled: !isAvailable,
    }
  })

  return (
    <FilterItem
      className={cn({ [css.mobileColorFilterItem]: isMobile })}
      isMobile={isMobile}
      key={filter.name}
      title={localizeFilterName(filter.name)}
      renderAction={({ row, checked, disabled }) => {
        if (isMobile) {
          return (
            <FilterTabMobile
              key={row}
              onClick={() => handleRowClick(row)}
              enabled
              selected={checked}
              disabled={disabled}
              className={css.filterTab}
            >
              <ColorFilter color={row as Colors} label={String(row)} className={css.colorFilter} />
            </FilterTabMobile>
          )
        }

        return (
          <ColorFilter key={row} active={checked} onChange={handleRowClick} color={row as Colors} label={String(row)} />
        )
      }}
      items={items}
    />
  )
})
