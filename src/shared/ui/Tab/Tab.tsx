import cn from 'classnames'
import css from './Tabs.module.scss'

interface ITab<T> {
  id: T
  text: string
  checked: boolean
  disabled?: boolean
  handleClick: (id: T) => void
}

export const Tab = <T extends string>({ id, text, checked, handleClick, disabled = false }: ITab<T>) => {
  return (
    <div
      id={id}
      className={cn(css.tab, { [css.checked]: checked, [css.disabled]: disabled })}
      onClick={(e: React.MouseEvent<HTMLInputElement>) => {
        handleClick((e.target as HTMLInputElement).id as T)
      }}
    >
      {text}
    </div>
  )
}
