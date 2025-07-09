import { FC, useEffect, useMemo, useState } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './ComprassionTable.module.scss'
import { appRoutes } from '@/app-settings'
import { RimCompatibleCarType } from '@/entities/Rims/model/types'
import { getGenerationLabel } from '@/features/SearchCar/model/getGenerationLabel'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { Generation } from '@/features/SearchCar/model/types'
import { useNavigateWithScrollUp } from '@/shared/libs'

type Props = {
  items: RimCompatibleCarType[]
}

export const ComprassionTable: FC<Props> = observer(({ items = [] }) => {
  const navigate = useNavigateWithScrollUp()
  const { loadSpecifiedCar, setCurrentStep } = searchCarStore
  const brandTitles = useMemo(() => items.map((x) => x.brandTitle), [items])
  const [selected, setSelected] = useState('')
  // const [selectedModel, setSelectedModel] = useState(items[0].brandTitle)
  const selectedItem = items.find((x) => x.brandTitle === selected)

  useEffect(() => {
    if (items) {
      setSelected(brandTitles[0])
    }
  }, [items])

  const handleSelectCar = async (model: Generation) => {
    await loadSpecifiedCar(model)
    setCurrentStep(3)
    navigate(appRoutes.rims)
  }

  return (
    <div className={css.holder}>
      <div className={css.brandTitleHolder}>
        {brandTitles.map((x) => {
          return (
            <button
              key={`comprassion-brandTitle-${x}`}
              className={classNames(css.brandTitle, selected === x && css.brandTitleSelected)}
              onClick={() => setSelected(x)}
            >
              {x}
            </button>
          )
        })}
      </div>
      <Flex style={{ overflowX: 'auto' }}>
        <table className={css.table}>
          <thead>
            <tr>
              <th align='left'>Производитель</th>
              <th align='left'>Марка</th>
              <th align='left'>Модели и модификации</th>
            </tr>
          </thead>
          <tbody>
            {selectedItem &&
              selectedItem.models?.flatMap((mark, markIndex) =>
                mark.modelGenerations.map((model, modelIndex) => {
                  const firstElement = markIndex === 0 && modelIndex === 0
                  const firstMark = modelIndex === 0

                  return (
                    <tr key={`comprassion-${selected}-${mark.modelTitle}-${model.carId}-${modelIndex}`}>
                      {firstElement && (
                        <td rowSpan={selectedItem.models.reduce((acc, item) => acc + item.modelGenerations.length, 0)}>
                          {selected}
                        </td>
                      )}
                      {firstMark && <td rowSpan={mark.modelGenerations.length}>{mark.modelTitle}</td>}
                      <td className={css.carModel} onClick={() => handleSelectCar(model)}>
                        {getGenerationLabel(model)}
                      </td>
                    </tr>
                  )
                }),
              )}
          </tbody>
        </table>
      </Flex>
    </div>
  )
})

// //rowSpan={}>
