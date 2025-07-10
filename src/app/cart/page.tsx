import { Suspense } from 'react'
import { CartPage } from '@/pages/Cart'
import { Spinner } from '@/shared/ui/Spinner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Корзина - SKAD Market',
  description: 'Ваша корзина с выбранными товарами. Оформите заказ с быстрой доставкой.',
  keywords: 'корзина, заказ, покупка, доставка',
  openGraph: {
    title: 'Корзина - SKAD Market',
    description: 'Ваша корзина с выбранными товарами',
    type: 'website',
  },
}

export default function Cart() {
  return (
    <Suspense fallback={<Spinner />}>
      <CartPage />
    </Suspense>
  )
}