import React, { FC, PropsWithChildren, useId } from 'react'
import { observer } from 'mobx-react-lite'
import { CarBrandIconsList } from './CarBrandIconsList'
import { CarBrandsList } from './CarBrandsList'
import { CarGenerations } from './CarGenerations'
import { CarListItem } from './CarListItem'
import css from './SearchRimsByCar.module.scss'
import { Entry, Generation } from '@/features/SearchCar/model'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { useTab } from '@/shared/libs'

interface ICarsBody {
  handleChangeActiveBrand: (brand: string) => Promise<void>
  handleChangeActiveModel: (model: string) => Promise<void>
  handleChangeActiveGeneration: (generation: Generation) => () => Promise<void>
  activeModel: string
  activeBrand: string
}

const TabColumn = ({ children }: PropsWithChildren) => {
  const uniqId = useId()
  return <React.Fragment key={uniqId}>{children}</React.Fragment>
}

export const CarsBody: FC<ICarsBody> = observer(
  ({ handleChangeActiveBrand, handleChangeActiveModel, handleChangeActiveGeneration, activeModel, activeBrand }) => {
    const { currentStep, brandCountries } = searchCarStore

    const createTabContent = (entries: Entry[]) => (
      <>
        {entries.map(([letter, carsObj]) => {
          return (
            <CarListItem
              key={letter}
              letter={letter}
              list={carsObj}
              onItemClick={(item) => handleChangeActiveBrand(item)}
            />
          )
        })}
      </>
    )

    const tabs =
      brandCountries?.map(({ title, entries }) => ({
        title,
        content: <TabColumn>{createTabContent(entries as Entry[])}</TabColumn>,
      })) || []

    const { ActiveTabContent, Tabs } = useTab(0, tabs)

    const getTabBody = () => {
      switch (currentStep) {
        case 1:
          return ActiveTabContent
        case 2:
          return <CarBrandsList handleChangeActiveModel={handleChangeActiveModel} />
        case 3:
          return <CarGenerations handleChangeActiveGeneration={handleChangeActiveGeneration} />
      }
    }

    return (
      <div className={css.searchCarModalBody}>
        {!activeModel && <CarBrandIconsList handleChangeActiveBrand={handleChangeActiveBrand} />}
        <div className={css.tab}>
          {!activeBrand && (
            <div className={css.tabHeader}>
              <Tabs />
            </div>
          )}
          <div className={css.tabBody}>{getTabBody()}</div>
        </div>
      </div>
    )
  },
)
