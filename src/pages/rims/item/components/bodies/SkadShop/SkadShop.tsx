import css from './SkadShop.module.scss'
import { LogoSmall } from '@/assets/icons'

export const SkadShop = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.title}>Магазин</div>
      <div className={css.paymentItems}>
        <div className={css.market}>
          <div>
            <LogoSmall />
          </div>
          <div>SkadMarket</div>
        </div>
      </div>
    </div>
  )
}
