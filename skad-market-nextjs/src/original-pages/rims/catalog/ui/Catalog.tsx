import { useEffect } from 'react'
import { filterTrueKeys, useToggle, useWindowState } from '@shared/libs'
import { BreadcrumbsLine } from '@shared/ui/Breadcrumbs'
import { FilterButton } from '@shared/ui/FiterButton'
import CatalogMobileFilters from '@shared/ui/Modals/CatalogFiltersModal/CatalogMobileFilters'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import css from './Catalog.module.scss'
import { CatalogMetatags } from './CatalogMetatags'
import { ProductCardsListContainerGrouped } from './ProductCardsListContainerGrouped'
import { SearchByCar } from './SearchByCar'
import { appRoutes } from '@/app-settings'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import { FilterBar } from '@/entities/Rims/ui/FilterBar'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { cartStore } from '@/features/cart'
import { AllFilters } from '@/features/filters/ui'
import { PopularCategories, RecommendedProductsSection, RimParamCompatibilityTabs } from '@/widgets'

interface CatalogProps {
  className?: string
}

export const Catalog = observer(({ className }: CatalogProps) => {
  const navigate = useNavigate()
  const { activeFilters, parameterCategories } = rimsStore
  const { getTitle } = searchCarStore
  const { resetAddedItemsToCart } = cartStore
  const { isDesktop, isLaptop, isTablet, isMobile } = useWindowState()
  const [isShowMobileFilters, , , showMobileFilters, hideMobileFilters] = useToggle(false)

  useEffect(() => {
    //to reset green buttons on cards
    resetAddedItemsToCart()
  }, [])

  const handleNavigate = (path: string) => () => {
    navigate(path)
  }

  return (
    <>
      <CatalogMetatags />
      <BreadcrumbsLine
        items={[
          { label: 'Главная', onClick: handleNavigate(appRoutes.root) },
          { label: 'Диски', disabled: true },
        ]}
        className={css.breadcrumbs}
      />
      <div className={css.body}>
        {(isDesktop || isLaptop) && (
          <div className={css.filters}>
            <SearchByCar className={css.searchCarButton} />
            <FilterBar />
          </div>
        )}
        <div className={css.rightSide}>
          <div className={css.filtersHeader}>
            <div className={css.filtersHeaderRightSide}>
              <div className={css.title}>{getTitle()}</div>
              {(isMobile || isTablet) && (
                <div className={css.row}>
                  <div className={css.filters}>
                    <SearchByCar className={css.searchCarButton} />
                  </div>
                  <FilterButton count={activeFilters.length} onClick={showMobileFilters} className={css.filterButton} />
                </div>
              )}

              <RimParamCompatibilityTabs availableParams={filterTrueKeys(parameterCategories)} />
              <AllFilters />
            </div>
          </div>

          {/* <ProductCardsListContainer /> */}
          <ProductCardsListContainerGrouped />
          {/* <RecommendedProducts className={css.recommended} /> */}
          <RecommendedProductsSection />
          <PopularCategories className={css.popular} />
        </div>
      </div>

      {/* <Footer className={css.footer} /> */}
      {isShowMobileFilters && <CatalogMobileFilters onClose={hideMobileFilters} />}
    </>
  )
})

Catalog.displayName = 'Catalog'
