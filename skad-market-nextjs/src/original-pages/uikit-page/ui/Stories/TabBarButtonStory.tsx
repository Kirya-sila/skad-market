import { ICCartLine, ICCatalogLine, ICHomeLine, ICOrderLine } from '@assets/icons'
import { ICHeartLine } from '@assets/icons/ICHeartLine'
import { TabBarLinkButton } from '@shared/ui/TabBarButton'
import { appRoutes } from '@/app-settings'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'

export const TabBarButtonStory = () => (
  <Section>
    <Title>TAB BAR BUTTON</Title>
    <Row>
      <TabBarLinkButton icon={<ICHomeLine />} label='Главная' path={appRoutes.dev} />
      <TabBarLinkButton icon={<ICCatalogLine />} label='Каталог' path={appRoutes.dev} />
      <TabBarLinkButton icon={<ICCartLine />} label='Корзина' path={appRoutes.dev} />
      <TabBarLinkButton icon={<ICHeartLine />} label='Избранное' path={appRoutes.dev} />
      <TabBarLinkButton icon={<ICOrderLine />} label='Заказы' path={appRoutes.dev} />
    </Row>
  </Section>
)
