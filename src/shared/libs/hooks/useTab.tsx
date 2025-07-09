import { ReactNode, useState } from 'react'
import { HookTab } from '@/shared/ui/Tab/hookTab/HookTab'

export interface Tab<T = string> {
  title: T
  content?: ReactNode
}

export const useTab = <T extends string>(
  initialTabIdx: number,
  tabs: Tab<T>[],
  onChangeTab?: (tabTitle: T) => void,
  disabled = false,
) => {
  const [activeTabIdx, setActiveTabIdx] = useState(initialTabIdx)
  const ActiveTabContent = tabs[activeTabIdx]?.content ?? null
  // console.log("🚀 ~ initialTabIdx:", initialTabIdx)

  const handleActiveTab = (idx: number) => () => {
    // console.log('idx', idx)
    onChangeTab && onChangeTab(tabs[idx].title)
    setActiveTabIdx(idx)
  }

  const Tabs = () => {
    return (
      <>
        {tabs.map((tab, index) => (
          <HookTab
            selected={activeTabIdx === index}
            key={tab.title}
            onClick={handleActiveTab(index)}
            label={tab.title}
            disabled={disabled}
          />
        ))}
      </>
    )
  }

  return { setActiveTabIdx, ActiveTabContent, activeTabIdx, Tabs }
}
