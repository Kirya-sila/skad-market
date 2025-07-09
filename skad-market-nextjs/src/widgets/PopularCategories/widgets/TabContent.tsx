import { FC } from 'react'
import css from '../PopularCategories.module.scss'
import { ICarModel } from '@/interfaces'
import { List } from '@/shared/ui'

interface ITabContent {
  carModels: ICarModel[]
}

export const TabContent: FC<ITabContent> = ({ carModels }) => {
  return (
    <>
      {carModels.map((carModel) => (
        <List key={carModel.brand} letter={carModel.brand} list={carModel.models} className={css.listItem} />
      ))}
    </>
  )
}
