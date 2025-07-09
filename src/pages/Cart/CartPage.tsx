import { useEffect } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { ScrollRestoration } from 'react-router-dom'
import { Cart } from './Cart'
import { EmptyCart } from './Rims/EmptyCart'
import { cartStore } from '@/features/cart'
import { Spinner } from '@/shared/ui/Spinner'
import { YouHaveSeenSection } from '@/widgets'

export const CartPage = observer(() => {
  const { cartData, getCartItems, isCartDataLoading } = cartStore

  useEffect(() => {
    getCartItems()
    return () => {
      getCartItems()
    } // to update cart with actual items
  }, [getCartItems])

  const getCartContent = () => {
    if (isCartDataLoading) {
      return <Spinner />
    }
    if (!cartData || !cartData.length) {
      return <EmptyCart />
    }
    return <Cart />
  }

  return (
    <>
      <ScrollRestoration />
      <Flex vertical gap={80} style={{ flexGrow: 1 }}>
        <Flex style={{ alignItems: 'center', flexGrow: 1 }}>{getCartContent()}</Flex>
        <YouHaveSeenSection />
      </Flex>
    </>
  )
})
