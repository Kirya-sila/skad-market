import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import css from './ByModel.module.scss'
import { appRoutes } from '@/app-settings'
import { rimsStore } from '@/entities/Rims'
import { popularCategoriesStore } from '@/features/PopularCategories'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { useNavigateWithScrollUp } from '@/shared/libs'
import { List } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'
import { Flex } from 'antd'

export const ByModel = observer(() => {
  const navigate = useNavigateWithScrollUp()
  const { carModels, getCarModels, isLoading } = popularCategoriesStore
  const { reloadDataFilteredByBrandOrModel, loadSpecifiedCarRimParams } = rimsStore
  const { resetCarWithoutReload, setBrand, setModel } = searchCarStore

  useEffect(() => {
    if (!carModels.length) {
      getCarModels()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carModels.length])

  if (isLoading) return <Spinner />

  const handleItemClick = (brand: string) => async (model: string) => {
    await resetCarWithoutReload()
    await reloadDataFilteredByBrandOrModel([{ parameter: 'carModel', value: model }])
    await loadSpecifiedCarRimParams({ brand, model })
    setBrand(brand)
    setModel(model)
    navigate(appRoutes.rims)
  }

  return (
    <Flex vertical className={css.listWrapper}>
      {carModels.map((carModel) => (
        <List
          key={carModel.brand}
          className={css.listItem}
          letter={carModel.brand}
          list={carModel.models}
          onItemClick={handleItemClick(carModel.brand)}
        />
      ))}
    </Flex>
  )
})
