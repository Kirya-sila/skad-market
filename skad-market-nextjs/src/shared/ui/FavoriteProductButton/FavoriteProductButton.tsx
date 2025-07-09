import { ICHeartFilled } from '@assets/icons/ICHeartFilled'
import { ICHeartLine } from '@assets/icons/ICHeartLine'
import cn from 'classnames'
import css from './FavoriteProductButton.module.scss'

interface FavoriteProductButtonProps {
  className?: string
  active?: boolean
  onClick?: VoidFunction
}

export const FavoriteProductButton = ({ className, onClick, active = false }: FavoriteProductButtonProps) => {
  const icon = active ? <ICHeartFilled /> : <ICHeartLine />
  return (
    <div
      className={cn(css.favoriteProductButton, className, { [css.active]: active })}
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) {
          onClick()
        }
      }}
    >
      {icon}
    </div>
  )
}

FavoriteProductButton.displayName = 'FavoriteProductButton'
