'use client'

import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import { appRoutes } from '@/app-settings'
import { CartIcon } from '@/assets/icons'
import { cartStore } from '@/features/cart'
import { MenuButton } from '@/shared/ui'

interface IHeaderCartButton {
  className: string
  bottomLineButtonSize: 'large' | 'middle'
}

export const HeaderCartButtonContainer: FC<IHeaderCartButton> = observer(({ className, bottomLineButtonSize }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { totalItemsInCart, getCartItems } = cartStore

  useEffect(() => {
    if (!pathname.match(appRoutes.cart)) {
      getCartItems()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const goToCart = () => {
    router.push(appRoutes.cart)
  }

  return (
    <MenuButton
      onClick={goToCart}
      size={bottomLineButtonSize}
      className={className}
      text='Корзина'
      leftIcon={<CartIcon />}
      badge={totalItemsInCart}
    />
  )
})
