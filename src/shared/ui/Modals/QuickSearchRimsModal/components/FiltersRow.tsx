import { PropsWithChildren } from 'react'
import { ICQuestionMarkBubble } from '@assets/icons'
import { CheckboxListItem, FilterTabMobile, RegularButton } from '@shared/ui'
import { Tooltip } from '@shared/ui/Tooltip'
import cn from 'classnames'
import css from '../QuickSearchRimsModal.module.scss'
import { AvailableParam } from '@/entities/Rims/model/types'

export const FiltersRow = ({
  title,
  items,
  selectedItems,
  handleToggle,
  onShowAll,
  isShowAll,
  hideTip,
  limit = 20,
}: PropsWithChildren<{
  title: string
  items: AvailableParam
  selectedItems: Array<number | string>
  handleToggle: (item: string) => VoidFunction
  onShowAll?: VoidFunction
  isShowAll?: boolean
  hideTip?: boolean
  limit?: number
}>) => {
  return (
    <div className={cn(css.filtersRow, { [css.showAll]: isShowAll })}>
      {!isShowAll && (
        <div className={css.header}>
          <Tooltip id={title} content={title}>
            <div className={css.title}>
              {title}
              {!hideTip && <ICQuestionMarkBubble />}
            </div>
          </Tooltip>

          {onShowAll && <RegularButton onClick={onShowAll} text='Все' variant='text' />}
        </div>
      )}

      <div className={css.items}>
        {isShowAll
          ? Object.entries(items).map((item, index) => (
              <CheckboxListItem
                key={item[0]}
                label={item[0].toString()}
                disabled={!item[1]}
                onCheck={handleToggle(item[0])}
                checked={selectedItems.includes(Number(item[0]))}
              />
            ))
          : Object.entries(items).map((item, i) => {
              return i < limit ? (
                <FilterTabMobile
                  key={item[0]}
                  label={item[0].toString()}
                  onClick={handleToggle(item[0])}
                  disabled={!item[1]}
                  enabled={!!item[1]}
                  selected={selectedItems.includes(Number(item[0]))}
                />
              ) : null
            })}
      </div>
    </div>
  )
}
