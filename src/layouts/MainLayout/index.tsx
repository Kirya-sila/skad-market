import { PropsWithChildren } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './MainLayout.module.scss'
import { Header } from '@/widgets'
import { Footer } from '@/widgets/Footer'
import { MobileBottomTabBar } from '@/widgets/MobileBottomTabBar'

export const MainLayout = observer((props: PropsWithChildren) => {
  return (
    <div className={css.mainLayout}>
      <Flex vertical style={{ flexGrow: 1 }}>
        <Header />
        {props.children}
      </Flex>
      <MobileBottomTabBar />
      <Footer />
    </div>
  )
})

MainLayout.displayName = 'MainLayout'
