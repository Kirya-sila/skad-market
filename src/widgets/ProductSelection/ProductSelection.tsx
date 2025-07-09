import { PropsWithChildren, useCallback, useState } from 'react'
import cn from 'classnames'
import css from './ProductSelection.module.scss'
import { useTabContent } from './UtilityComponents/useTabContent'
import { SelectionBy, Types } from './constants'
import { RimTabContent, TireTabContent } from '@/widgets/ProductSelection/Tabs'
import { SelectionType } from '@/widgets/ProductSelection/types'

export interface ProductSelectionProps {
  className?: string
}

export const ProductSelection = ({ className }: ProductSelectionProps) => {
  const [currentTab, setCurrentTab] = useState(Types.rims)
  const [rimSelectionType, setRimSelectionType] = useState<SelectionType>(SelectionBy.byParams)
  const tabContent = useTabContent(rimSelectionType)

  const Tab = ({ type, children }: PropsWithChildren<{ type: Types }>) => {
    return (
      <div
        onClick={() => setCurrentTab(type)}
        className={cn(css.tabHeaderItem, { [css.tabHeaderItemActive]: currentTab === type })}
      >
        {children}
      </div>
    )
  }

  const setType = useCallback((type: SelectionType) => setRimSelectionType(type), [])

  const getCurrentTabBody = () => {
    switch (currentTab) {
      case Types.rims:
        return <RimTabContent setSelectionType={setType} tabContent={tabContent} />
      case Types.tyres:
        return <TireTabContent setSelectionType={setType} tabContent={tabContent} />
    }
  }

  return (
    <div className={cn(css.productSelection, className)}>
      <div className={css.tabHeader}>
        <Tab type={Types.rims}>Диски</Tab>
        <Tab type={Types.tyres}>Шины</Tab>
      </div>
      <div className={css.tabBody}>{getCurrentTabBody()}</div>
    </div>
  )
}

ProductSelection.displayName = 'ProductSelection'
