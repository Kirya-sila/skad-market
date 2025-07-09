'use client'

import React, { useMemo } from 'react'
import { Modals } from '@/app/config/modal/modals-confg'
import { RimIcon, TireIcon } from '@/assets/icons'
import { useModal } from '@/shared/libs'
import { MetaTag, SearchCarModalProps } from '@/shared/ui'
import { RegularButton } from '@/shared/ui/RegularButton'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from '@/original-pages/main-page/ui/MainPage.module.scss'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { Brands, NewOnSkadSection, PopularCategories, RecommendedProductsSection } from '@/widgets'
import { About } from '@/widgets/About'
import { CategoryLine } from '@/widgets/CategoryLine'
import { CreditSwiper } from '@/widgets/CreditSwiper/CreditSwiper'
import { ProductSelection } from '@/widgets/ProductSelection/ProductSelection'
import { ProductSelectionByCar } from '@/widgets/ProductSelectionByCar'

const MainPage = observer(() => {
  const { activeBrand, activeModel } = searchCarStore

  const searchCarModal = useModal<SearchCarModalProps>(Modals.SearchCar)
  const quickSearchRimsModal = useModal<SearchCarModalProps>(Modals.QuickSearchRimsModal)
  const quickSearchTiresModal = useModal<SearchCarModalProps>(Modals.QuickSearchTiresModal)

  const modalParams = useMemo(() => {
    if (activeBrand) {
      return { initialCarModels: { brand: activeBrand, model: activeModel ?? undefined } }
    }
  }, [activeBrand, activeModel])

  const displaySearchCarModal = () => {
    searchCarModal.open({
      onClose: searchCarModal.close,
      ...modalParams,
    })
  }

  const displayQuickSearchRimsModal = () => {
    quickSearchRimsModal.open({
      onClose: quickSearchRimsModal.close,
    })
  }

  const displayQuickSearchTiresModal = () => {
    quickSearchTiresModal.open({
      onClose: quickSearchTiresModal.close,
    })
  }

  const mobileQuickSearch = (
    <div className={css.selectionArea}>
      <RegularButton onClick={displayQuickSearchRimsModal} text='Подобрать диск' leftIcon={<RimIcon />} />
      <RegularButton onClick={displayQuickSearchTiresModal} text='Подобрать Шины' leftIcon={<TireIcon />} />
    </div>
  )

  return (
    <>
      <MetaTag
        title='Skadmarket - интернет-магазин шин и дисков с доставкой'
        label='Интернет-магазин шин и дисков Skadmarket'
      />
      <Flex vertical role='main-page'>
        <div className={css.productSwiper}>
          <CreditSwiper />
          <ProductSelection className={css.productSection} />
        </div>
        {mobileQuickSearch}
        <CategoryLine className={css.categoryCard} />

        <Flex vertical gap={60} className={css.mainContent}>
          <NewOnSkadSection />
          <ProductSelectionByCar className={css.productSelectionByCar} onClickFindCar={displaySearchCarModal} />
          <RecommendedProductsSection />
          <Brands />
          <About />
          <PopularCategories />
        </Flex>
      </Flex>
    </>
  )
})

export default MainPage