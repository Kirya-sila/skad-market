import React from 'react'
import { observer } from 'mobx-react-lite'
import { MainPage } from '@/original-pages/main-page/ui/MainPage'

const HomePage = observer(() => {
  return <MainPage />
})

HomePage.displayName = 'HomePage'

export default HomePage