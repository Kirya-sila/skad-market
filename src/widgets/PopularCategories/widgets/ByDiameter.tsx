import { appRoutes } from '@/app-settings'
import { rimsStore } from '@/entities/Rims'
import { popularCategoriesStore } from '@/features/PopularCategories'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { useNavigateWithScrollUp } from '@/shared/libs'
import { RegularButton } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import css from '../PopularCategories.module.scss'

export const ByDiameter = observer(() => {
  const navigate = useNavigateWithScrollUp()
  const { diameters, getByMountAndDiameterData, isLoading } = popularCategoriesStore
  const { reloadDataWithNewFilters } = rimsStore
  const { resetCurrentCar } = searchCarStore

  useEffect(() => {
    if (!diameters.length) {
      getByMountAndDiameterData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diameters.length])

  if (isLoading) return <Spinner />

  return (
    <div className={css.buttonListTab} data-tab='По диаметру'>
      {diameters.map((diameter) => (
        <RegularButton
          size='middle'
          key={diameter}
          text={`R${diameter}`}
          appearance='secondary'
          onClick={async () => {
            await resetCurrentCar()
            await reloadDataWithNewFilters([{ parameter: 'diameters', value: diameter }])
            navigate(appRoutes.rims)
          }}
        />
      ))}
    </div>
  )
})
