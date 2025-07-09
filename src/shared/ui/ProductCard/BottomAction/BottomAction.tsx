import { FC, MouseEventHandler, SyntheticEvent } from 'react'
import { CartIcon, ICMinus, ICPlus } from '@assets/icons'
import { RegularButton } from '@shared/ui'
import { IconButton } from '@shared/ui/IconButton'
import cn from 'classnames'
import css from './BottomAction.module.scss'
import { withPreventDefaultEvents } from '@/shared/libs/utils/dom'
import { observer } from 'mobx-react-lite'
import { cartStore } from '@/features/cart'
import { appRoutes } from '@/app-settings'
import { useNavigate } from 'react-router-dom'
import { primaryGreen } from '@/theme'
import { useWindowState } from '@/shared/libs'

interface BottomActionProps {
  productId: string
  className?: string
  totalQuantity: number
  addItemToCart?: (quantity: number) => void
  text?: string
}

export const BottomAction = observer(
  ({ productId, className, totalQuantity, addItemToCart, text = 'В корзину' }: BottomActionProps) => {
    const navigate = useNavigate()
    const { isMobile } = useWindowState()
    const { addedToCartItems } = cartStore

    const addToCart = (e: SyntheticEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (addItemToCart) {
        addItemToCart(totalQuantity < 4 ? totalQuantity : 4)
      }
    }

    const ButtonWrapper = () => {
      if (totalQuantity === 0) {
        return (
          <RegularButton
            className={css.notifyArrival}
            text='Подписаться'
            appearance='secondary'
            variant='outline'
            size='middle'
          />
        )
      }

      if (addedToCartItems.includes(productId)) {
        return (
          <RegularButton
            onClick={withPreventDefaultEvents(() => navigate(appRoutes.cart))}
            // leftIcon={<CartIcon />}
            text='Перейти в корзину'
            size='middle'
            style={{ backgroundColor: primaryGreen }}
          />
        )
      }
      return (
        <RegularButton
          onClick={withPreventDefaultEvents(addToCart)}
          leftIcon={<CartIcon />}
          text={text}
          size={isMobile ? 'small' : 'middle'}
        />
      )
    }

    return (
      <div className={cn(css.bottomAction, className)}>
        <ButtonWrapper />
      </div>
    )
  },
)

type CounterProps = {
  onDecrement: () => void
  onIncrement: () => void

  disableDecrement: boolean
  disableIncrement: boolean

  count: number
  classname?: string
}

export const Counter: FC<CounterProps> = ({
  onDecrement,
  onIncrement,
  disableDecrement,
  disableIncrement,
  count,
  classname,
}) => (
  <div className={css.counter}>
    <IconButton
      disabled={disableDecrement}
      icon={<ICMinus />}
      onClick={onDecrement}
      className={cn(css.plus, classname)}
    />
    <div className={css.count}>{count}</div>
    <IconButton
      disabled={disableIncrement}
      icon={<ICPlus />}
      onClick={onIncrement}
      className={cn(css.minus, classname)}
    />
  </div>
)

BottomAction.displayName = 'ProductCard.BottomAction'
