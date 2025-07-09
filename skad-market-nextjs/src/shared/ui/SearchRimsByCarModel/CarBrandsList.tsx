import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { CarListItem } from './CarListItem'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { Char } from '@/shared/types'

interface ICarBrandsList {
  handleChangeActiveModel: (model: string) => Promise<void>
}

export const CarBrandsList: FC<ICarBrandsList> = observer(({ handleChangeActiveModel }) => {
  const { brandModels } = searchCarStore

  if (!brandModels) return

  const { entries } = brandModels

  return (
    <>
      {entries.map(([letter, list]) => (
        <CarListItem key={letter} letter={letter as Char} list={list} onItemClick={handleChangeActiveModel} />
      ))}
    </>
  )
})
