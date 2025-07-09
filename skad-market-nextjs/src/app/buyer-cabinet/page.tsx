'use client'

import React from 'react'
import { observer } from 'mobx-react-lite'
import { BuyerCabinet } from '@/original-pages/BuyerCabinet/BuyerCabinet'

const BuyerCabinetPage = observer(() => {
  return <BuyerCabinet />
})

BuyerCabinetPage.displayName = 'BuyerCabinetPage'

export default BuyerCabinetPage