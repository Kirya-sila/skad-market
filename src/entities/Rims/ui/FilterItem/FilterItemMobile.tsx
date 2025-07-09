import React, { PropsWithChildren, ReactNode, useEffect } from 'react'
import cn from 'classnames'
import css from './FilterItem.module.scss'
import { ICQuestionMarkBubble } from '@assets/icons'
import { Divider, FilterTabMobile } from '@shared/ui'
import { composeActions, useModal, useToggle } from '@shared/libs'
import { FiltersRow } from '@/shared/ui/Modals/QuickSearchRimsModal/components/FiltersRow'
import { Modals } from '@app/config/modal/modals-confg'
import { ExpandFilterListModalProps } from '@shared/ui/Modals/ExpandFilterListModal/ExpandFilterListModal'

interface FiltersRow<T> {
  row: T
  checked?: boolean
  disabled?: boolean
}

export interface FilterItemMobileProps extends PropsWithChildren {
  className?: string
  title: ReactNode
  onHelp?: VoidFunction
  renderAction?: (rowItem: FiltersRow<string | number>) => ReactNode
  items: FiltersRow<string | number>[]
  onRowClick?: (rowItem: string | number) => void
  totalItems: number
  onShowItems: VoidFunction
}

// TODO Сделать развёртывание списка при клике на "все"
export const FilterItemMobile = <T,>({
  className,
  title,
  onHelp,
  items,
  renderAction,
  onRowClick,
  totalItems,
  onShowItems,
}: FilterItemMobileProps) => {
  const [isTrimmed] = useToggle(true)
  const [isExpandAll, , , expand, collapse] = useToggle(false)

  const expandFilterListModal = useModal<ExpandFilterListModalProps<string | number>>(Modals.ExpandFilterListModal)

  const handleExpandAll = () => {
    expand()
    expandFilterListModal.open({
      onClose: composeActions(expandFilterListModal.close, collapse),
      title: String(title),
      items,
      onCheck: (s) => handleCheck(s),
      totalItems,
      onShowItems,
    })
  }

  useEffect(() => {
    if (isExpandAll) {
      handleExpandAll()
    }
  }, [items, isExpandAll])

  if (!items || items.length < 1) return null

  const shouldTrim = items.length > 10

  const handleCheck = (rowItem: string | number) => () => onRowClick?.(rowItem)

  const shouldSearch = !isTrimmed && items.length > 15

  return (
    <>
      <div className={cn(css.filterItem, className, css.mobile)}>
        <div className={cn(css.header, css.mobile)}>
          <div className={css.title}>
            {title}
            {onHelp && (
              <span onClick={onHelp}>
                <ICQuestionMarkBubble />
              </span>
            )}
          </div>
          {shouldTrim && (
            <div onClick={handleExpandAll} className={css.expand}>
              Все
            </div>
          )}
        </div>
        <div className={cn(css.body, css.mobile)}>
          {items.map(({ row, checked, disabled }) => {
            if (renderAction) return renderAction({ row, checked, disabled })

            return (
              <FilterTabMobile
                key={String(row)}
                label={String(row)}
                onClick={handleCheck(row)}
                enabled
                selected={checked}
                disabled={disabled}
                className={css.filterTab}
              />
            )
          })}
        </div>
        {shouldSearch && <Divider className={css.bottomDivider} />}
      </div>
    </>
  )
}

FilterItemMobile.displayName = 'FilterItemMobile'
