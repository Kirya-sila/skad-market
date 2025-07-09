import { FC } from 'react'
import cn from 'classnames'
import css from './RecycleBinButton.module.scss'
import { RecycleBinIcon } from '@/assets/icons'

interface IRecycleBinButton {
    classname?: string
    onClick?: VoidFunction
  }

export const RecycleBinButton: FC<IRecycleBinButton> = ({ classname, onClick }) => {
  return (
    <div className={cn(css.recycleBinButton, classname)} onClick={onClick}>
      <RecycleBinIcon />
    </div>
  )
}
