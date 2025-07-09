import Dzulion from '@assets/images/Dzulion.png'
import Pangan from '@assets/images/Pangan.png'
import Porto from '@assets/images/Porto.png'
import Tibet from '@assets/images/Tibet.png'
import { Swiper } from '@shared/ui/Swiper'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './CreditSwiper.module.scss'
import { rimsStore } from '@/entities/Rims'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { Frame } from '@/widgets/CreditSwiper/frames'

export interface CreditSwiperProps {
  className?: string
}

export const CreditSwiper = observer(({ className }: CreditSwiperProps) => {
  const { reloadDataFilteredByBrandOrModel, loadSpecifiedCarRimParams } = rimsStore
  const { resetCarWithoutReload, setBrand, setModel } = searchCarStore

  const handleFilterByModel = (brand: string, model: string) => async () => {
    await resetCarWithoutReload()
    await reloadDataFilteredByBrandOrModel([{ parameter: 'carModel', value: model }])
    await loadSpecifiedCarRimParams({ brand, model })
    setBrand(brand)
    setModel(model)
  }

  return (
    <div className={cn(css.creditSwiper, className)}>
      <Swiper
        frames={[
          <Frame
            key='frame1'
            image1={Pangan}
            image2={Porto}
            description={
              <div>
                Горячая подборка <br /> дисков для Lada Vesta
              </div>
            }
            onClick={handleFilterByModel('Lada', 'Vesta')}
          />,
          <Frame
            key='frame2'
            image1={Tibet}
            image2={Dzulion}
            description={
              <div>
                ТОП дисков <br /> для Haval Jolion
              </div>
            }
            className={css.jolion}
            descriptionStyles={css.jolionTitle}
            onClick={handleFilterByModel('Haval', 'Jolion')}
          />,
        ]}
      />
    </div>
  )
})

CreditSwiper.displayName = 'CreditSwiper'
