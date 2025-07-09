import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { List } from '../List'
import { CarTabColumn } from './CarTabColumn'
import css from './SearchRimsByCar.module.scss'
import { Generation, getGenerationLabel } from '@/features/SearchCar/model'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'

interface ICarGenerations {
  handleChangeActiveGeneration: (generation: Generation) => () => Promise<void>
}

export const CarGenerations: FC<ICarGenerations> = observer(({ handleChangeActiveGeneration }) => {
  const { generations } = searchCarStore
  return (
    <CarTabColumn>
      {generations?.map((generation: Generation) => (
        <List
          key={generation.beginVIP + Math.random() * 12}
          list={[getGenerationLabel(generation)]}
          className={css.listItem}
          onItemClick={handleChangeActiveGeneration(generation)}
        />
      ))}
    </CarTabColumn>
  )
})
