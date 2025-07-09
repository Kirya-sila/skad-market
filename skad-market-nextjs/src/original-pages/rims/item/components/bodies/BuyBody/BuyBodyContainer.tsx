import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './BuyBody.module.scss'
import { cityStore } from '@/features'
import { getDeliveryDate } from '@/helpers'
import { Flex, RegularButton } from '@/shared/ui'

interface IBuyBodyContainer {
  count: number
  isAvailable: boolean
  children: ReactNode
}

const getAvailabilityText = (count: number, isAvailable: boolean) => {
  if (count >= 1) {
    return 'В наличии'
  }
  return !isAvailable ? 'Снят с продажи' : 'Нет в наличии'
}

export const BuyBodyContainer: FC<IBuyBodyContainer> = observer(({ count, isAvailable, children }) => {
  const { currentCity } = cityStore
  return (
    <div className={css.container}>
      <div className={css.buyWindowHeader}>
        <div className={cn({ [css.notAvailable]: !count || !isAvailable })}>Цена за шт.</div>
        <span
          className={cn(css.availabilityInfo, {
            [css.notAvailable]: !count || !isAvailable,
            [css.onlyFour]: count === 4,
            [css.fewAvailable]: count >= 1 && count <= 3,
          })}
        >
          {getAvailabilityText(count, isAvailable)}
        </span>
      </div>
      {children}
      {!!count && (
        <div className={css.delivery}>
          <div>Ориентировочный срок доставки</div>
          <div>{`в ${currentCity} ${getDeliveryDate()}`}</div>
        </div>
      )}
      {!count && (
        <Flex classname={css.availabilityNotify}>
          <RegularButton variant='text' text='Сообщить о поступлении' />
        </Flex>
      )}
    </div>
  )
})
