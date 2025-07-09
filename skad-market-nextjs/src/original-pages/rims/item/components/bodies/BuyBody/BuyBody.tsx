import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import css from './BuyBody.module.scss'
import { BuyBodyContainer } from './BuyBodyContainer'
import { ToCartButton } from './ToCartButton'
import { AvailabilityStatuses } from '@/constants'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import { useCounter, useWindowState } from '@/shared/libs'
import { Counter } from '@/shared/ui/ProductCard/BottomAction/BottomAction'
import { Price } from '@/shared/ui/ProductCard/Price'

export const BuyBody = observer(() => {
  const { currentRim } = rimsStore
  const { isTablet } = useWindowState()

  const rimsCount = useMemo(() => currentRim?.count ?? 0, [currentRim?.count])
  const retailPrice = useMemo(() => currentRim?.retailPrice ?? 0, [currentRim?.retailPrice])
  const isAvailable = useMemo(
    () => currentRim?.availabilityStatus !== AvailabilityStatuses.OutOfProduction,
    [currentRim?.availabilityStatus],
  )

  const { count, increment, decrement } = useCounter(rimsCount > 3 ? 4 : rimsCount, 1, rimsCount)
  const disableMinus = count === 1
  const disablePlus = count === rimsCount

  if (isTablet) {
    return (
      <BuyBodyContainer count={rimsCount} isAvailable={isAvailable}>
        <div className={css.counterWithPrice}>
          <div>
            <Price isAvailable={!!currentRim?.count} currentPrice={retailPrice} oldPrice={currentRim?.oldRetailPrice} />
            {/* {rimsCount > 0 && <div className={css.buyWindowPriceWillChange}>Через 3 дня будет стоить 11 990 ₽</div>} */}
          </div>
          {rimsCount > 0 && (
            <Counter
              count={count}
              disableDecrement={disableMinus}
              disableIncrement={disablePlus}
              onDecrement={decrement}
              onIncrement={increment}
            />
          )}
        </div>

        {rimsCount > 0 && (
          <div className={css.holder}>
            <ToCartButton count={count} />
            {/* <BuyInOneClick /> */}
          </div>
        )}

        {/* <BanksBunner classname={css.banks} /> */}
      </BuyBodyContainer>
    )
  }

  return (
    <BuyBodyContainer count={rimsCount} isAvailable={isAvailable}>
      <div className={css.buyWindowPrice}>
        <Price isAvailable={!!rimsCount} currentPrice={retailPrice} oldPrice={currentRim?.oldRetailPrice} />
      </div>
      {/* {rimsCount > 0 && <div className={css.buyWindowPriceWillChange}>Через 3 дня будет стоить 11 990 ₽</div>} */}

      {/* <BanksBunner classname={css.banks} /> */}
      {rimsCount > 0 && (
        <>
          <div className={css.buttonsWrapper}>
            <div className={css.holder}>
              <Counter
                count={count}
                disableDecrement={disableMinus}
                disableIncrement={disablePlus}
                onDecrement={decrement}
                onIncrement={increment}
              />

              <ToCartButton count={count} />
            </div>

            {/* <BuyInOneClick /> */}
          </div>
        </>
      )}
    </BuyBodyContainer>
  )
})
