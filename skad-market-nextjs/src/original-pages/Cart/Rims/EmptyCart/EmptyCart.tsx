import { Flex } from 'antd'
import css from './EmptyCart.module.scss'
import { CartIconBig } from '@/assets/icons'
import { CatalogButtons } from '@/shared/ui'

export const EmptyCart = () => {
  return (
    <Flex vertical className={css.container}>
      <span>Ваша корзина пуста</span>
      <div>
        <CartIconBig />
      </div>
      <span>В корзине пока нет товаров, но это поправимо - ознакомьтесь с нашим ассортиментом</span>
      <CatalogButtons />
    </Flex>
  )
}
