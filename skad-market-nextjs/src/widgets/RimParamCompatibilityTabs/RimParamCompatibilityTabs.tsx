import { CarData } from '@/features/SearchCar/model/types'
import { Description } from '@/widgets/RimParamCompatibilityTabs/Description'
import { rimsStore } from '@entities/Rims/model/rimsStore'
import { ParameterGroups } from '@entities/Rims/model/types'
import { localStorageManager, useTab } from '@shared/libs'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useState } from 'react'
import css from './RimParamCompatibilityTabs.module.scss'
import { tabContentDescriptions, tabParams } from './consts'
import { Tabs } from '@/constants'

export interface RimParamCompatibilityTabsProps {
  className?: string
  availableParams?: Array<keyof ParameterGroups>
}

const tabs = Object.values(Tabs) as Tabs[]
const tabsTitles = tabs.map((tab) => ({
  title: tab,
}))

export const RimParamCompatibilityTabs = observer(({ className }: RimParamCompatibilityTabsProps) => {
  const [tabsContent, setTabsContent] = useState(tabContentDescriptions)

  const carDataFromLS = localStorageManager.getItem<CarData>('carData')

  useEffect(() => {
    setTabsContent(tabContentDescriptions)
  }, [carDataFromLS?.id])

  const onChangeTab = (tab: Tabs) => {
    const parameter = tabParams[tab]
    rimsStore.setCurrentCategory(parameter)
  }

  const { Tabs, activeTabIdx } = useTab(0, tabsTitles, onChangeTab, rimsStore.isLoading)
  const activeTab = useMemo(() => tabs[activeTabIdx], [activeTabIdx])

  const handleClose = useCallback(() => {
    setTabsContent((prev) => ({ ...prev, [activeTab]: '' }))
  }, [activeTab])

  if (!carDataFromLS) return null

  return (
    <div className={cn(css.rimParamCompatibilityTabs, className)}>
      <div className={css.header}>
        <Tabs />
      </div>
      <div className={css.description}>
        {!!tabsContent[activeTab] && (
          <Description onClose={handleClose} title={activeTab} text={tabsContent[activeTab]} />
        )}
      </div>
    </div>
  )
})

RimParamCompatibilityTabs.displayName = 'RimParamCompatibilityTabs'
