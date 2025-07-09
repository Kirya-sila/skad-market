import { FC } from 'react'
import { Button, Typography } from 'antd'
import styled from 'styled-components'
import css from './SearchRimsByCar.module.scss'
import { Generation, getGenerationLabel } from '@/features/SearchCar/model'

interface ISearchByCarFooter {
  activeModel: string
  activeBrand: string
  activeGeneration: Generation | null
  handleReset: (toStep: number) => () => void
}

const { Text } = Typography

const StyledText = styled(Text)({
  marginBottom: 4,
  whiteSpace: 'nowrap',
})

export const SearchByCarFooter: FC<ISearchByCarFooter> = ({
  activeBrand,
  activeModel,
  activeGeneration,
  handleReset,
}) => {
  if (!activeBrand) {
    return <></>
  }

  return (
    <div className={css.footer}>
      <div className={css.summary}>
        <div className={css.carBrand}>
          <div className={css.col} onClick={handleReset(1)}>
            <StyledText>Марка</StyledText>
            {/* <RegularButton text={activeBrand} variant='text' /> */}
            <Button type='link' variant='text' className={css.generationButton}>
              {activeBrand}
            </Button>
          </div>
          {activeModel && (
            <div className={css.col} onClick={handleReset(2)}>
              <StyledText>Модель</StyledText>
              <Button type='link' variant='text' className={css.generationButton}>
                {activeModel}
              </Button>
            </div>
          )}
          {activeGeneration && (
            <div className={css.col} onClick={handleReset(3)}>
              <StyledText>Поколение</StyledText>
              <Button type='link' variant='text' className={css.generationButton}>
                {getGenerationLabel(activeGeneration)}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
