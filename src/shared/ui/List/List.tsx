import { RegularButton } from '@shared/ui/RegularButton'
import cn from 'classnames'
import css from './List.module.scss'

export interface ListProps {
  className?: string
  letter?: string
  list: string[]
  onItemClick?: (item: string) => void
}

export const List = ({ className, letter, list, onItemClick }: ListProps) => {
  return (
    <div className={cn(css.list, className)}>
      <div className={css.letter}>{letter}</div>
      <div className={css.list}>
        {list.map((listItem) => (
          <RegularButton
            size='middle'
            variant='text'
            key={listItem}
            text={listItem}
            appearance='secondary'
            onClick={() => onItemClick?.(listItem)}
          />
        ))}
      </div>
    </div>
  )
}

List.displayName = 'List'
