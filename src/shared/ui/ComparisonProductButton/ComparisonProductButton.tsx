import { ICComparisonFilled } from '@assets/icons/ICComparisonFilled'
import { ICComparisonLine } from '@assets/icons/ICComparisonLine'
import cn from 'classnames'
import css from './ComparisonProductButton.module.scss'

interface ComparisonProductButtonProps {
  className?: string
  active?: boolean
  onClick?: VoidFunction
}

export const ComparisonProductButton = ({ className, onClick, active = false }: ComparisonProductButtonProps) => {
  const icon = active ? <ICComparisonFilled /> : <ICComparisonLine />
  return (
    <div
      className={cn(css.comparisonProductButton, className, { [css.active]: active })}
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

ComparisonProductButton.displayName = 'ComparisonProductButton'
