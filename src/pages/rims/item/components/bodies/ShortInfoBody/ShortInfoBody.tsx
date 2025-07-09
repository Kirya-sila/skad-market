import { FC, useEffect, useMemo, useState } from 'react'
import { Button } from 'antd'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Characteristic } from '../../Characteristic'
import { ColorSelection } from '../../inputs'
import { getCharacteristicValue } from '../utils'
import { ChangeCarChoice } from './ChangeCarChoice'
import css from './ShortInfoBody.module.scss'
import { Modals } from '@/app/config/modal/modals-confg'
import { appRoutes } from '@/app-settings'
import { Guard, LogoShort } from '@/assets/icons'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import { RimDTO } from '@/entities/Rims/model/types'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { CarData } from '@/features/SearchCar/model/types'
import { ILocalType } from '@/pages/rims'
import { useModal, useWindowState } from '@/shared/libs'
import { Flex, RegularButton, SearchCarModalProps } from '@/shared/ui'

// const characteristicsToShow: ActiveFilterName[] = ['diameters', 'offsets', 'widthParams', 'mountHolesAmounts']
const characteristicsToShow: (keyof ILocalType)[] = ['diameter', 'et', 'rimWidth', 'lz']

type Props = {
  characteristics: PartialRecord<keyof RimDTO, string | number>
  currentCar: CarData | null
}

export const ShortInfoBody: FC<Props> = observer(({ currentCar }) => {
  const navigate = useNavigate()
  const { isTablet, isMobile } = useWindowState()
  const { compatibleCars, currentRim } = rimsStore
  const { activeBrand, activeModel } = searchCarStore

  const searchCarModal = useModal<SearchCarModalProps>(Modals.SearchCar)

  const [hasCompatibleCar, setHasCompatibleCar] = useState<boolean>(false)

  useEffect(() => {
    setHasCompatibleCar(false)
    compatibleCars.forEach((x) => {
      x.models.forEach((z) => {
        z.modelGenerations.forEach((y) => {
          if (y.carId === currentCar?.id) {
            setHasCompatibleCar(true)
          }
        })
      })
    })
  }, [compatibleCars, currentCar])

  const getCarInfo = (currentCar: CarData): string => {
    const { firm, model, bodyType, beginVIP, endVIP, bodyDefinition } = currentCar
    return `${firm} ${model}, ${beginVIP}-${endVIP}, ${bodyType}, ${bodyDefinition}`
  }

  const scroll = (id: string) => {
    const characteristics = document.getElementById(id)
    if (characteristics?.offsetTop) {
      window.scroll({ top: characteristics?.offsetTop - 120 })
    }
  }

  const modalParams = useMemo(() => {
    if (currentCar) {
      return { initialCar: currentCar }
    }
    if (activeBrand) {
      return { initialCarModels: { brand: activeBrand, model: activeModel ?? undefined } }
    }
  }, [currentCar, activeBrand, activeModel])

  const displaySearchCarModal = () => {
    searchCarModal.open({
      onClose: searchCarModal.close,
      ...modalParams,
    })
  }

  return (
    <div className={css.shortInfoMain}>
      {/* <div className={classNames(css.actions, (isTablet || isMobile) && css.actionsSmall)}>
        <Favorites withLabel />
        <Comprassion withLabel />
      </div> */}
      <div className={classNames((isTablet || isMobile) && css.mobileRow)}>
        <div className={css.logo}>
          <LogoShort />
        </div>
        <div>
          <ColorSelection />
        </div>
      </div>
      <div className={classNames(css.characteristicHolder, (isTablet || isMobile) && css.characteristicHolderSmall)}>
        {currentRim &&
          characteristicsToShow.map((x) => (
            <Characteristic
              key={`characteristics-short-${x}`}
              title={x}
              value={getCharacteristicValue(currentRim, x)}
            />
          ))}
      </div>
      <div className={css.anchorsAndGuard}>
        <div className={css.anchors}>
          <div className={css.anchorsAndGuard}>
            <div className={css.allCharacteristicContainer}>
              <div>
                <Button type='link' size='small' onClick={() => scroll('characteristics')} style={{ padding: 0 }}>
                  Все характеристики
                </Button>
              </div>
              {!currentCar && (
                <Button
                  type='link'
                  size='small'
                  onClick={displaySearchCarModal}
                  style={{ padding: 0, whiteSpace: 'initial', height: 'auto', textAlign: 'left' }}
                >
                  Проверить на совместимость с автомобилем
                </Button>
              )}
            </div>
            <div className={classNames(css.guard, (isTablet || isMobile) && css.guardSmall)}>
              <div style={{ display: 'flex' }}>
                <Guard />
              </div>
              <span>Гарантии</span>
            </div>
          </div>

          {currentCar && (
            <div className={css.carCompassionInfoContainer}>
              <div className={css.carCompassionInfo}>
                {hasCompatibleCar ? (
                  <span className={css.successText}>Диски подходят под автомобиль</span>
                ) : (
                  <span className={css.failText}>Диски не подходят под автомобиль</span>
                )}
                <span>{getCarInfo(currentCar)}</span>
                {!hasCompatibleCar && (
                  <Flex classname={css.watchCompatibleRimsLink}>
                    <RegularButton
                      variant='text'
                      text='Смотреть подходящие диски'
                      onClick={() => navigate(appRoutes.rims)}
                    />
                  </Flex>
                )}
              </div>
              <ChangeCarChoice />
            </div>
          )}
        </div>
      </div>
    </div>
  )
})
