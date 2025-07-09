import React from 'react'
import { Switch } from '@shared/ui'
import { observer } from 'mobx-react-lite'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import css from './FilterBar.module.scss'
import { FilterProps } from '@/entities/Rims/ui/FilterBar/types'
import { localizeFilterName } from '@/entities/Rims/ui/FilterBar/utils'
import cn from 'classnames'

interface SwitchFilter extends FilterProps {
  isMobile?: boolean
}

export const SetFromFilterItem = observer(({ filter, isMobile }: SwitchFilter) => {
  const { toggleFilter } = rimsStore
  const [value] = filter.values

  const handleSwitch = async () => {
    await toggleFilter(filter.name, value.value)
  }

  console.log(filter)

  return (
    <label className={cn(css.switchLine, { [css.mobile]: isMobile })}>
      {localizeFilterName(filter.name)}
      <Switch checked={value.isActive} toggle={handleSwitch} />
    </label>
  )
})

SetFromFilterItem.displayName = 'SetFromFilterItem'
