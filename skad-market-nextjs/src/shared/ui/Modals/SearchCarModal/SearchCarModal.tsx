import { useGetRimsByCar, useNavigateWithScrollUp } from '@shared/libs'
import { ModalBaseHeader } from '@shared/ui/Modals'
import ModalBase from '@shared/ui/Modals/ModalBase/ModalBase'
import { observer } from 'mobx-react-lite'
import { useMatch } from 'react-router-dom'
import { SearchByCarFooter, TopBar } from '../../SearchRimsByCarModel'
import { CarsBody } from '../../SearchRimsByCarModel/CarsBody'
import css from './SearchCarModal.module.scss'
import { appRoutes } from '@/app-settings'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { CarData, Generation } from '@/features/SearchCar/model/types'

export interface SearchCarModalProps {
  className?: string
  onClose: VoidFunction
  initialCar?: CarData | null
  initialCarModels?: { brand: string; model?: string }
}

const SearchCarModal = observer(({ className, onClose, initialCar, initialCarModels }: SearchCarModalProps) => {
  const isRimDetails = useMatch(appRoutes.rimsItem)
  const navigate = useNavigateWithScrollUp()
  const { brandCountries } = searchCarStore

  const onCheckGeneration = async (generation: Generation) => {
    onClose()
    await searchCarStore.loadSpecifiedCar(generation)
    if (!isRimDetails) {
      navigate(appRoutes.rims)
    }
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
    <ModalBase
      renderHeader={
        <ModalBaseHeader
          className={css.searchCarModalHeader}
          topBar='Поиск автомобиля'
          title={<TopBar />}
          displayAction
          onClickAction={onClose}
        />
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
        <SearchByCarFooter
          activeBrand={activeBrand}
          activeModel={activeModel}
          activeGeneration={activeGeneration}
          handleReset={handleReset}
        />
      }
      onClose={onClose}
      className={css.searchCarModal}
      isLoading={!!brandCountries && brandCountries?.length < 1}
    />
  )
})

export default SearchCarModal

SearchCarModal.displayName = 'SearchCarModal'
