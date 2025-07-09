import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import css from './ByCarFilter.module.scss'
import { CarData, Generation } from '@/features/SearchCar/model'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { useGetRimsByCar } from '@/shared/libs'
import { SearchByCarFooter, TopBar } from '@/shared/ui'
import { BaseContent } from '@/shared/ui/BaseContent'
import { CarsBody } from '@/shared/ui/SearchRimsByCarModel/CarsBody'

export interface IByCarFilter {
  className?: string
  onClose?: VoidFunction
  initialCar?: CarData | null
  initialCarModels?: { brand: string; model?: string }
}

export const ByCarFilter: FC<IByCarFilter> = observer(({ className, onClose, initialCar, initialCarModels }) => {
  const onCheckGeneration = async (generation: Generation) => {
    await searchCarStore.loadSpecifiedCarOnly(generation)
  }

  const {
    activeBrand,
    activeModel,
    activeGeneration,
    handleChangeActiveBrand,
    handleChangeActiveModel,
    handleChangeActiveGeneration,
    handleReset,
  } = useGetRimsByCar({ initialCar, initialCarModels, onCheckGeneration })

  return (
    <BaseContent
      renderHeader={
        <div className={css.title} role='right-title'>
          <TopBar />
        </div>
      }
      renderBody={
        <CarsBody
          handleChangeActiveModel={handleChangeActiveModel}
          handleChangeActiveBrand={handleChangeActiveBrand}
          handleChangeActiveGeneration={handleChangeActiveGeneration}
          activeBrand={activeBrand}
          activeModel={activeModel}
        />
      }
      renderFooter={
        activeBrand ? (
          <SearchByCarFooter
            activeBrand={activeBrand}
            activeModel={activeModel}
            activeGeneration={activeGeneration}
            handleReset={handleReset}
          />
        ) : null
      }
      isLoading={!!searchCarStore.brandCountries && searchCarStore.brandCountries.length < 1}
    />
  )
})
