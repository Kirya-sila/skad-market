import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import css from '../PopularCategories.module.scss'
import { appRoutes } from '@/app-settings'
import { rimsStore } from '@/entities/Rims'
import { popularCategoriesStore } from '@/features/PopularCategories'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { RegularButton } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'
import { useNavigateWithScrollUp } from '@/shared/libs'

export const ByMount = observer(() => {
  const navigate = useNavigateWithScrollUp()
  const { mappedByMountData, getByMountData, isLoading } = popularCategoriesStore
  const { reloadDataWithNewFilters } = rimsStore
  const { resetCurrentCar } = searchCarStore

  useEffect(() => {
    if (!mappedByMountData.length) {
      getByMountData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedByMountData.length])

  if (isLoading) return <Spinner />

  return (
    <div className={css.buttonListTab} data-tab='По креплению'>
      <>
        {mappedByMountData.map(({ lz, pcd }) => (
          <RegularButton
            size='middle'
            key={`${lz}${pcd}`}
            text={`Диски PCD ${lz}x${pcd}`}
            appearance='secondary'
            onClick={async () => {
              await resetCurrentCar()
              await reloadDataWithNewFilters([
                { parameter: 'holeDiameters', value: pcd },
                { parameter: 'mountHolesAmounts', value: lz },
              ])
              navigate(appRoutes.rims)
            }}
          />
        ))}
      </>
    </div>
  )
})
