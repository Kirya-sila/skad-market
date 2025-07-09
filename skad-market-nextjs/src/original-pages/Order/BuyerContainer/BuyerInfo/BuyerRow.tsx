import { FlexRow } from '@/shared/ui'
import React, { FC, ReactNode } from 'react'

interface IBuyerRow {
  icon: ReactNode
  text: string
}

export const BuyerRow: FC<IBuyerRow> = ({ icon, text }) => {
  return (
    <FlexRow>
      {icon}
      <span>{text}</span>
    </FlexRow>
  )
}
