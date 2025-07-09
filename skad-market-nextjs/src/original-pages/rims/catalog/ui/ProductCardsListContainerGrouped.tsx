import React, { useEffect } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
// import { useLocation } from 'react-router-dom'
import css from './Catalog.module.scss'
import { ProductCardsListGrouped } from './ProductCardsListGrouped'
import { LOAD_AMOUNT, rimsStore } from '@/entities/Rims/model/rimsStore'
import { convertActiveParamsToDTO } from '@/entities/Rims/ui/FilterBar/utils'
import { comparisonStore } from '@/features/comparison/model'
import { favoritesStore } from '@/features/favorites/model'
import { handleToggleProductActions } from '@/shared/libs'
import { DropdownButton, Pagination, RegularButton } from '@/shared/ui'
import { getTotalPages } from '@/shared/ui/Pagination/utils'
import { Spinner } from '@/shared/ui/Spinner'

// Next.js stub for useLocation
const useLocation = () => ({ state: {} as { fromDetails?: boolean } })

export const ProductCardsListContainerGrouped = observer(() => {
  const location = useLocation()

  const {
    groupedRims,
    rims,
    filteredGroupRims,
    total,
    offset: currentPage,
    getGroupedRims,
    amount,
    resetFiltersAndReload,
    setLocalizedSort,
    localizedSort,
    isLoading,
    loadAvailableParams,
    activeParams,
    availableParams,
  } = rimsStore
  const handleAddFavorite = handleToggleProductActions(favoritesStore, 'favorite', rims)
  const handleAddComparison = handleToggleProductActions(comparisonStore, 'comparison', rims)

  useEffect(() => {
    getGroupedRims({ offset: location.state?.fromDetails ? currentPage : 1 })
    if (!availableParams) {
      loadAvailableParams(convertActiveParamsToDTO(activeParams))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangePage = (page: number, more?: boolean) => {
    if (page === currentPage) return

    getGroupedRims({
      limit: amount,
      offset: page,
      append: more,
    })
  }

  const handlePageClick = (page: number, more?: boolean) => {
    handleChangePage(page, more)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoadMore = () => {
    handleChangePage(currentPage + 1, true)
  }

  if (isLoading && !filteredGroupRims.length) {
    return (
      <Flex style={{ alignItems: 'center' }}>
        <Spinner />
      </Flex>
    )
  }

  return (
    <>
      <div className={css.subline}>
        <DropdownButton
          className={css.sortMethod}
          label={localizedSort}
          selectedItems={[localizedSort]}
          onSelect={setLocalizedSort}
          list={['Популярные', 'Сначала дешевые', 'Сначала дорогие']}
          disabledItems={['Популярные']}
        />
        <div className={css.found}>найдено {total}</div>
      </div>
      <ProductCardsListGrouped />

      {groupedRims.length > 0 && total > LOAD_AMOUNT && (
        <div className={css.paginationLine}>
          <Pagination
            className={css.pagination}
            currentPage={currentPage}
            onChange={handlePageClick}
            total={getTotalPages(total, amount)}
          />
          <RegularButton
            onClick={handleLoadMore}
            className={css.more}
            size='middle'
            text='Показать еще'
            appearance='secondary'
            disabled={currentPage === getTotalPages(total, amount)}
          />
        </div>
      )}
    </>
  )
})
