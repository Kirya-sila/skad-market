import { ICCartLine, ICCatalogLine, ICHeartLine, ICHomeLine, ICOrderLine } from '@assets/icons'
import { TabBarButton, TabBarLinkButton } from '@shared/ui/TabBarButton'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './MobileBottomTabBar.module.scss'
import { Modals } from '@/app/config/modal/modals-confg'
import { appRoutes } from '@/app-settings'
import { cartStore } from '@/features/cart'
import { useModal } from '@/shared/libs'

interface MobileBottomTabBarProps {
  className?: string
}

export const MobileBottomTabBar = observer(({ className }: MobileBottomTabBarProps) => {
  const { totalItemsInCart } = cartStore
  const chooseMobileCatalogModal = useModal(Modals.ChooseMobileCatalogModal)

  const displayQuickSearchRimsModal = () => {
    chooseMobileCatalogModal.open({
      onClose: chooseMobileCatalogModal.close,
    })
  }

  return (
    <div className={cn(css.mobileBottomTabBar, className)}>
      <TabBarLinkButton icon={<ICHomeLine />} label='Главная' path={appRoutes.root} />
      <TabBarButton icon={<ICCatalogLine />} label='Каталог' onClick={displayQuickSearchRimsModal} />
      <TabBarLinkButton icon={<ICCartLine />} label='Корзина' path={appRoutes.cart} badge={totalItemsInCart} />
      {/* <TabBarLinkButton icon={<ICHeartLine />} label='Избранное' path={appRoutes.favorite} /> */}
      {/* <TabBarLinkButton icon={<ICOrderLine />} label='Заказы' path={appRoutes.orders} /> */}
    </div>
  )
})
