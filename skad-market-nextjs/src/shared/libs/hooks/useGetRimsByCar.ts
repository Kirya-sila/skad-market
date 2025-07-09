import { useEffect, useState } from 'react'
import { useWindowSize } from './useWindowSize'
import { CarData, Generation } from '@/features/SearchCar/model'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'

interface IGetRimsByCar {
  initialCar?: CarData | null
  initialCarModels?: { brand: string; model?: string }
  onCheckGeneration: (generation: Generation) => void
}

export const useGetRimsByCar = ({ initialCar, initialCarModels, onCheckGeneration }: IGetRimsByCar) => {
  // const isCurrentRimPage = useMatch(appRoutes.rimsItem)
  // const navigate = useNavigateWithScrollUp()
  const { setBrand, setModel } = searchCarStore
  const { setCurrentStep, brandModels } = searchCarStore
  const [activeModel, setActiveModel] = useState<string>(initialCar?.model || initialCarModels?.model || '')
  const [activeBrand, setActiveBrand] = useState<string>(initialCar?.firm || initialCarModels?.brand || '')
  const [activeGeneration, setActiveGeneration] = useState<Generation | null>(null)

  const [modelsCount, setModelsCount] = useState<number>(0)
  const [blockHeightValue, setBlockHeightValue] = useState<string>('520px')

  const { width } = useWindowSize()

  useEffect(() => {
    searchCarStore.loadBrandCountries()
    if (initialCar) {
      searchCarStore.loadModelGenerations(activeBrand, activeModel)
      searchCarStore.loadBrandModels(activeBrand)
      setCurrentStep(3)
    } else if (initialCarModels) {
      if (activeModel) {
        searchCarStore.loadModelGenerations(activeBrand, activeModel)
      }
      searchCarStore.loadBrandModels(activeBrand ?? '')
      setCurrentStep(activeModel ? 3 : 2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setModelsCount(() => 0)
    if (brandModels) {
      const { entries } = brandModels
      entries.forEach((item) => setModelsCount((prev) => prev + item[1].length))
    }
  }, [brandModels])

  useEffect(() => {
    const calcBase = Math.floor(modelsCount * 22 + 26)
    const calculatedHeight = calcBase > 500 ? calcBase : 500

    const styleForModelsBlock: string = modelsCount && width < 768 ? `${calculatedHeight}px` : '520px'

    setBlockHeightValue(styleForModelsBlock)
  }, [modelsCount, width])

  const handleChangeActiveBrand = async (brand: string) => {
    await searchCarStore.loadBrandModels(brand)
    setCurrentStep(2)
    setActiveBrand(brand)
    setBrand(brand)
  }

  const handleChangeActiveModel = async (model: string) => {
    if (!activeBrand) return
    await searchCarStore.loadModelGenerations(activeBrand, model)

    setCurrentStep(3)
    setActiveModel(model)
    setModel(model)
  }

  const handleChangeActiveGeneration = (generation: Generation) => async () => {
    if (!activeBrand || !activeModel) return
    setActiveGeneration(generation)
    // onClose()
    // await searchCarStore.loadSpecifiedCar(generation)
    onCheckGeneration(generation)
    // if (!isCurrentRimPage) {
    //   navigate(appRoutes.rims)
    // }
  }

  const handleReset = (toStep: number) => () => {
    setCurrentStep(toStep)

    switch (toStep) {
      case 1: {
        setActiveBrand('')
        setActiveModel('')
        setModel('')
        setBrand('')
        setActiveGeneration(null)
        break
      }
      case 2: {
        setActiveModel('')
        setModel('')
        setActiveGeneration(null)
        break
      }
      case 3: {
        setActiveGeneration(null)
        break
      }
      default:
    }
  }

  return {
    activeBrand,
    activeModel,
    activeGeneration,
    handleChangeActiveBrand,
    handleChangeActiveModel,
    handleChangeActiveGeneration,
    handleReset,
  }
}
