import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import css from '../PopularCategories.module.scss'
import { appRoutes } from '@/app-settings'
import { rimsStore } from '@/entities/Rims'
import { popularCategoriesStore } from '@/features/PopularCategories'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { useNavigateWithScrollUp } from '@/shared/libs'
import { Flex, List } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

export const ByBrand = observer(() => {
  const navigate = useNavigateWithScrollUp()
  const { getCarBrandsByCountries, mappedByBrandData, isLoading } = popularCategoriesStore
  const { reloadDataFilteredByBrandOrModel, loadSpecifiedCarRimParams } = rimsStore
  const { resetCarWithoutReload, setBrand } = searchCarStore

  useEffect(() => {
    if (!mappedByBrandData.length) {
      getCarBrandsByCountries()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedByBrandData.length])

  const handleItemClick = async (brand: string) => {
    await resetCarWithoutReload()
    await reloadDataFilteredByBrandOrModel([{ parameter: 'carBrand', value: brand }])
    await loadSpecifiedCarRimParams({ brand })
    setBrand(brand)
    navigate(appRoutes.rims)
  }

  if (isLoading) return <Spinner />

  return (
    <Flex classname={css.listWrapper} data-tab='По марке автомобиля'>
      {mappedByBrandData.map(({ key, items }) => (
        <List
          key={key}
          letter={key}
          list={items}
          onItemClick={handleItemClick}
        />
      ))}
    </Flex>
  )
})
