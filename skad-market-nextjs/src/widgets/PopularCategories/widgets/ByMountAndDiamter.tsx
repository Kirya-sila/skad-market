import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import css from '../PopularCategories.module.scss'
import { appRoutes } from '@/app-settings'
import { rimsStore } from '@/entities/Rims'
import { popularCategoriesStore } from '@/features/PopularCategories'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { useNavigateWithScrollUp } from '@/shared/libs'
import { RegularButton } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

export const ByMountAndDiameter = observer(() => {
  const navigate = useNavigateWithScrollUp()
  const { mappedByMountAndDiameterData, getByMountAndDiameterData, isLoading } = popularCategoriesStore
  const { reloadDataWithNewFilters } = rimsStore
  const { resetCurrentCar } = searchCarStore

  useEffect(() => {
    if (!mappedByMountAndDiameterData.length) {
      getByMountAndDiameterData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedByMountAndDiameterData.length])

  if (isLoading) return <Spinner />

  return (
    <div className={css.headedButtonListTab} data-tab='По диаметру и крепежу'>
      {mappedByMountAndDiameterData.map(({ diameter, params }) => (
        <div key={diameter} className={css.headedButtonListTabItem}>
          <div className={css.headedButtonListTabHeader}>{`Диски R${diameter}`}</div>
          {params.map(({ lz, pcd }) => (
            <RegularButton
              size='middle'
              key={`${diameter}${lz}${pcd}`}
              text={`R${diameter} ${lz}x${pcd}`}
              appearance='secondary'
              onClick={async () => {
                await resetCurrentCar()
                reloadDataWithNewFilters([
                  { parameter: 'diameters', value: diameter },
                  { parameter: 'holeDiameters', value: pcd },
                  { parameter: 'mountHolesAmounts', value: lz },
                ])
                navigate(appRoutes.rims)
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
})
