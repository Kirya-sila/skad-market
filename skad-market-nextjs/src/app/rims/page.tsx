import React from 'react'
import { filterTrueKeys, useToggle, useWindowState } from '@/shared/libs'
import { BreadcrumbsLine } from '@/shared/ui/Breadcrumbs/BreadcrumbsLine'
import { FilterButton } from '@/shared/ui/FiterButton'
import CatalogMobileFilters from '@/shared/ui/Modals/CatalogFiltersModal/CatalogMobileFilters'
import { observer } from 'mobx-react-lite'
import css from '@/original-pages/rims/catalog/ui/Catalog.module.scss'
import { CatalogMetatags } from '@/original-pages/rims/catalog/ui/CatalogMetatags'
import { ProductCardsListContainerGrouped } from '@/original-pages/rims/catalog/ui/ProductCardsListContainerGrouped'
import { SearchByCar } from '@/original-pages/rims/catalog/ui/SearchByCar'
import { appRoutes } from '@/app-settings'
import { FilterBar } from '@/entities/Rims/ui/FilterBar'
import { AllFilters } from '@/features/filters/ui'
import { PopularCategories, RecommendedProductsSection, RimParamCompatibilityTabs } from '@/widgets'
import { useRouter } from 'next/navigation'
import { useRims } from '@/lib/queries'

const Catalog = observer(() => {
  const router = useRouter()
  const { data: rimsData, isLoading } = useRims()
  const { isDesktop, isLaptop, isTablet, isMobile } = useWindowState()
  const [isShowMobileFilters, , , showMobileFilters, hideMobileFilters] = useToggle(false)

  const handleNavigate = (path: string) => () => {
    router.push(path)
  }

  // Extract data from rimsData or use defaults
  const activeFilters = rimsData?.activeFilters || []
  const parameterCategories = rimsData?.parameterCategories || {}
  const getTitle = () => rimsData?.title || 'Диски'

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

          <ProductCardsListContainerGrouped />
          <RecommendedProductsSection />
          <PopularCategories className={css.popular} />
        </div>
      </div>

      {isShowMobileFilters && <CatalogMobileFilters onClose={hideMobileFilters} />}
    </>
  )
})

Catalog.displayName = 'Catalog'

export default Catalog