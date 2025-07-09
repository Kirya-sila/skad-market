import { PropsWithChildren, ReactNode } from 'react'
import { CloseIcon, ICQuestionMarkBubble } from '@assets/icons'
import { useToggle } from '@shared/libs'
import { useInput } from '@shared/libs/hooks/useInput'
import { CheckboxListItem, Divider, MetaTag, TextInput } from '@shared/ui'
import cn from 'classnames'
import css from './FilterItem.module.scss'
import { FilterItemMobile, FilterItemMobileProps } from '@/entities/Rims/ui/FilterItem/FilterItemMobile'
import { FiltersRow } from '@/shared/ui/Modals/QuickSearchRimsModal/components/FiltersRow'

interface FiltersRow<T> {
  row: T
  checked?: boolean
  disabled?: boolean
}

interface FilterItemProps<T> extends PropsWithChildren {
  className?: string
  title: ReactNode
  onHelp?: VoidFunction
  renderAction?: (rowItem: FiltersRow<T>) => ReactNode
  items: FiltersRow<T>[]
  onRowClick?: (rowItem: T) => void
  isMobile?: boolean
  totalItems?: number
  onShowItems?: VoidFunction
}

export const FilterItem = <T,>(props: FilterItemProps<T>) => {
  const { className, title, onHelp, items, renderAction, onRowClick, isMobile } = props
  const [isTrimmed, , , trim, untrim] = useToggle(true)
  const [searchText, setSearchText, , clearSearchText] = useInput()
  // const [sortedItems, setSortedItems] = useState<FiltersRow<T>[]>([])

  if (isMobile) return <FilterItemMobile {...(props as unknown as FilterItemMobileProps)} />

  // useEffect(() => {
  //   if (items.length && +items[0].row) {
  //     const newArr = [...items].sort((a, b) => (+a.row > +b.row ? 1 : -1))
  //     setSortedItems(newArr)
  //   } else {
  //     setSortedItems(items)
  //   }
  // }, [items])

  const shouldTrim = items.length > 5

  const filteredItems = items.filter(({ row }) => String(row).toLowerCase().includes(searchText.toLowerCase()))

  const resolvedItems = isTrimmed ? filteredItems.slice(0, 5) : filteredItems

  const handleCheck = (rowItem: T) => () => onRowClick?.(rowItem)

  const resetIcon = searchText?.length > 0 && (
    <div className={css.resetIcon} onClick={clearSearchText}>
      <CloseIcon />
    </div>
  )
  const shouldSearch = !isTrimmed && items.length > 15

  if (!items.length) return null

  return (
    <div className={cn(css.filterItem, className)}>
      <div className={css.title}>
        {title}
        {onHelp && (
          <span onClick={onHelp}>
            <ICQuestionMarkBubble />
          </span>
        )}
      </div>
      {shouldSearch && (
        <div className={css.search}>
          <TextInput
            type='text'
            onChange={setSearchText}
            value={searchText}
            size='small'
            placeholder='Поиск'
            renderRightIcon={resetIcon}
          />
          <Divider className={css.divider} />
        </div>
      )}
      <div className={cn(css.body, { [css.expanded]: !isTrimmed })}>
        {resolvedItems.map(({ row, checked, disabled }) => {
          if (renderAction) return renderAction({ row, checked, disabled })

          return (
            <>
              {checked && <MetaTag label={String(row)} title={String(title)} />}
              <CheckboxListItem
                key={String(row)}
                label={String(row)}
                onCheck={handleCheck(row)}
                checked={checked}
                disabled={disabled}
              />
            </>
          )
        })}
      </div>
      {shouldSearch && <Divider className={css.bottomDivider} />}
      {shouldTrim && (
        <div onClick={isTrimmed ? untrim : trim} className={css.expand}>
          {isTrimmed ? 'Смотреть все' : 'Свернуть'}
        </div>
      )}
    </div>
  )
}

FilterItem.displayName = 'FilterItem'
