import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { ByCarFilter } from './ByCarFilter'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'

// interface IByCarFilterContainer {}

export const ByCarFilterContainer = observer(() => {
  const { currentCar, activeBrand, activeModel } = searchCarStore

  const modalParams = useMemo(() => {
    if (currentCar) {
      return { initialCar: currentCar }
    }
    if (activeBrand) {
      return { initialCarModels: { brand: activeBrand, model: activeModel ?? undefined } }
    }
  }, [currentCar, activeBrand, activeModel])

  return <ByCarFilter {...modalParams} />
})
