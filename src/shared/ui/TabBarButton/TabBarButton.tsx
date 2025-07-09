import cn from 'classnames'
import css from './TabBarButton.module.scss'
import { ITabBarButton } from './interfaces'
 
interface ITabBarButtonProps extends ITabBarButton {
    onClick: VoidFunction
}

export const TabBarButton = ({ className, icon, label, onClick }: ITabBarButtonProps) => {
  return (
    <div onClick={onClick} className={cn(css.tabButton, className)}>
      <div>{icon}</div>
      <div className={css.label}>{label}</div>
    </div>
  )
}
