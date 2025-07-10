'use client'

import { useEffect, useMemo } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AllCharacteristicsBody, BuyBody, ComprassionBody, ImagesBody, ShortInfoBody } from '../components'
import { InSetYouGet } from '../components/bodies/InSetYouGet'
import { PaymentConditions } from '../components/bodies/PaymentConditions'
import { PaymentWays } from '../components/bodies/PaymentWays'
import { SkadShop } from '../components/bodies/SkadShop'
import css from './CatalogItem.module.scss'
import { CatalogItemMetatags } from './CatalogItemMetatags'
import { features } from './constants'
import { appRoutes } from '@/app-settings'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import { recommendRimsItemsStore, similarRimsItemsStore } from '@/features'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { useWindowState } from '@/shared/libs'
import { ButtonBack } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'
import { YouHaveSeenSection, YouMayBeInterestedSection } from '@/widgets'

interface CatalogItemProps {
  wheelCode: string
}

export const CatalogItem = observer(({ wheelCode }: CatalogItemProps) => {
  const { isLaptop, isDesktop, isMobile, isTablet } = useWindowState()
  const router = useRouter()

  const { loadOneRim, loadCompatibleCars, isLoading, currentRim } = rimsStore
  const { currentCar } = searchCarStore
  const { getSimilarRimsItemsGrouped } = similarRimsItemsStore
  const { getRecommendRimsItemsGrouped } = recommendRimsItemsStore

  useEffect(() => {
    if (wheelCode) {
      loadOneRim(wheelCode)
      loadCompatibleCars(wheelCode)
      getSimilarRimsItemsGrouped(wheelCode)
      getRecommendRimsItemsGrouped()
    } else {
      router.push(appRoutes.rims)
    }
  }, [wheelCode, router])

  const refreshPageData = (wheelCode: string) => {
    // loadOneRim(wheelCode)
    // loadCompatibleCars(wheelCode)
    // getSimilarRimsItems(wheelCode)
    // getRecommendRimsItems()
  }

  const title = useMemo(() => currentRim?.offerName.split('Арт.')[0] ?? '', [currentRim?.offerName])

  const handleBack = () => {
    router.back()
  }

  if (!currentRim) {
    return null
  }

  return (
    <>
      <CatalogItemMetatags rimTitle={title} />
      <div className={css.backLabel}>
        <ButtonBack handleButtonClick={handleBack}>Назад</ButtonBack>
      </div>
      {isLoading && !currentRim ? (
        <Spinner />
      ) : (
        <>
          <div className={css.title}>{title}</div>
          <div className={css.vendor}>
            <span>Артикул:</span>
            <span>{currentRim.wheelCode}</span>
          </div>
          <div className={classNames(css.body, (isMobile || isTablet) && css.bodySmall)}>
            <ImagesBody
              className={classNames(css.imageBody, (isMobile || isTablet) && css.imageBodySmall)}
              // labels={imageLabels.map((x) => x.label)}
              labels={[]}
              features={features}
              id={currentRim.id}
              images={currentRim.images}
            />
            {isLaptop || isDesktop ? (
              <div className={css.details}>
                <ShortInfoBody characteristics={{}} currentCar={currentCar} />
                <InSetYouGet cap={currentRim.cap} label={currentRim.label} />
              </div>
            ) : (
              <ShortInfoBody characteristics={{}} currentCar={currentCar} />
            )}
            {isLaptop || isDesktop ? (
              <div className={css.buyBodyContainer}>
                <BuyBody />
                <PaymentWays />
                <SkadShop />
              </div>
            ) : (
              <BuyBody />
            )}
            {(isMobile || isTablet) && <PaymentConditions cap={currentRim.cap} label={currentRim.label} />}
          </div>
          {/* <RecommendedProducts className={css.alsoBuy} count={getRecommendCount} title='С этим товаром покупают' /> */}
          {currentRim && <AllCharacteristicsBody currentRim={currentRim} />}
        </>
      )}
      <Flex vertical gap={60} style={{ marginTop: 60 }}>
        {/* <BankBody /> */}
        <YouHaveSeenSection />
        <ComprassionBody />
        <YouMayBeInterestedSection />
      </Flex>
      {/* <Footer className={css.footer} /> */}
    </>
  )
})
