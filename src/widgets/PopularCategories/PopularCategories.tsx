import { useTab } from '@shared/libs'
import { Tab } from '@shared/libs/hooks/useTab'
import cn from 'classnames'
import css from './PopularCategories.module.scss'
import { ByBrand, ByDiameter, ByMount, ByMountAndDiameter } from './widgets'
import { ByModel } from './widgets/ByModel'

interface NewProductsProps {
  className?: string
}

const tabs = [
  {
    title: 'По марке автомобиля',
    content: <ByBrand />,
  },
  {
    title: 'По модели автомобиля',
    content: <ByModel />,
  },
  {
    title: 'По диаметру',
    content: <ByDiameter />,
  },
  {
    title: 'По креплению',
    content: <ByMount />,
  },
  {
    title: 'По диаметру и крепежу',
    content: <ByMountAndDiameter />,
  },
]

export const PopularCategories = ({ className }: NewProductsProps) => {
  const { ActiveTabContent, Tabs } = useTab(0, tabs as Tab[])

  return (
    <div className={cn(css.popularCategories, className)}>
      <div className={css.title}>Популярные категории дисков</div>
      <div className={css.body}>
        <div className={css.tabHeader}>
          <Tabs />
        </div>
        <div className={css.tabBody}>{ActiveTabContent}</div>
      </div>
    </div>
  )
}

PopularCategories.displayName = 'PopularCategories'
