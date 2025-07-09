import { FC, ReactNode } from 'react'
import css from './CatalogButton.module.scss'

interface ICatalogButtton {
  handleClick: VoidFunction
  label: string
  image: ReactNode
}

export const CatalogButtton: FC<ICatalogButtton> = ({ handleClick, image, label }) => {
  return (
    <div className={css.catalogButton} onClick={handleClick}>
      <div>{image}</div>
      <div>{label}</div>
    </div>
  )
}
