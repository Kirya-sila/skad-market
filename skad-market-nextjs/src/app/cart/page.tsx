import React from 'react'
import { Flex } from 'antd'
import { Cart } from '@/original-pages/Cart/Cart'
import { EmptyCart } from '@/original-pages/Cart/Rims/EmptyCart/EmptyCart'
import { Spinner } from '@/shared/ui/Spinner'
import { YouHaveSeenSection } from '@/widgets'
import { useCart } from '@/lib/queries'

const CartPage = () => {
  const { data: cartData, isLoading } = useCart()

  const getCartContent = () => {
    if (isLoading) {
      return <Spinner />
    }
    if (!cartData || !cartData.length) {
      return <EmptyCart />
    }
    return <Cart />
  }

  return (
    <>
      <Flex vertical gap={80} style={{ flexGrow: 1 }}>
        <Flex style={{ alignItems: 'center', flexGrow: 1 }}>{getCartContent()}</Flex>
        <YouHaveSeenSection />
      </Flex>
    </>
  )
}

export default CartPage