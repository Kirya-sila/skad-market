import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Modals } from '@/app/config/modal/modals-confg'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { useModal } from '@/shared/libs'
import { SearchByCarButton, SearchCarModalProps } from '@/shared/ui'

interface ISearchByCarProps {
  className?: string
  onClick?: VoidFunction
}

export const SearchByCar: FC<ISearchByCarProps> = observer(({ className, onClick }) => {
  const searchCarModal = useModal<SearchCarModalProps>(Modals.SearchCar)
  const { isCarSelected, currentCar, resetCurrentCar, activeBrand, activeModel } = searchCarStore
  console.log("🚀 ~ constSearchByCar:FC<ISearchByCarProps>=observer ~ activeBrand:", activeBrand)
  console.log("🚀 ~ constSearchByCar:FC<ISearchByCarProps>=observer ~ activeModel:", activeModel)

  const modalParams = useMemo(() => {
    if (currentCar) {
      return { initialCar: currentCar }
    }
    if (activeBrand) {
      return { initialCarModels: { brand: activeBrand, model: activeModel ?? undefined } }
    }
  }, [currentCar, activeBrand, activeModel])

  const displaySearchCarModal = () => {
    if (onClick) {
      onClick()
    }

    searchCarModal.open({
      onClose: searchCarModal.close,
      ...modalParams,
    })
  }

  return (
    <SearchByCarButton
      selected={isCarSelected}
      className={className}
      onClick={displaySearchCarModal}
      onCancel={resetCurrentCar}
      onChange={displaySearchCarModal}
    />
  )
})
