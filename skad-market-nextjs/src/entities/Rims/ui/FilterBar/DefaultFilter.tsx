import { observer } from 'mobx-react-lite'
import { FilterItem } from '../FilterItem'
import { FilterProps } from './types'
import { hasHelpModalByFilterName, localizeFilterName } from './utils'
import { rimsStore } from '@/entities/Rims/model/rimsStore'

interface DefaultFilterProps extends FilterProps {
  isMobile?: boolean
  onShowAll?: VoidFunction
  onHelp: VoidFunction
}

export const DefaultFilter = observer(({ filter, isMobile, onShowAll, onHelp }: DefaultFilterProps) => {
  const { filteredGroupRims, toggleFilter } = rimsStore

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
      key={filter.name}
      onHelp={hasHelpModalByFilterName[filter.name] ? onHelp : undefined}
      title={localizeFilterName(filter.name) || filter.name}
      onRowClick={handleRowClick}
      items={items}
      isMobile={isMobile}
      onShowItems={onShowAll}
      totalItems={filteredGroupRims.length}
    />
  )
})
