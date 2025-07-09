import { FC } from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './AllCharacteristicsBody.module.scss'
import { CharacteristicList } from './CharacteristicList'
import { File } from '@/assets/icons'
import { rimsStore } from '@/entities/Rims'
import { RimDTO } from '@/entities/Rims/model/types'
import { ILocalType } from '@/pages/rims'
import { useWindowState } from '@/shared/libs'

type Props = {
  currentRim: RimDTO
}

// const characteristicsToShow: AvailableCharacteristic[] = [
//   'size',
//   'diameters',
//   'DIA',
//   'LZxPCD',
//   'holeDiameters',
//   'widthParams',
//   'maxLoad',
//   'mountHolesAmounts',
//   'holeDiametrUnderBolt',
//   'holeDiametrUnderBalon',
//   'brand',
//   'weightBrutto',
//   'weightNetto',
//   'color',
//   'uniColor',
// ]
const characteristicsToShow: (keyof ILocalType)[] = [
  'sizeDesignation',
  'diameter',
  'hhDiameter',
  'lzxpcd',
  'et',
  'rimWidth',
  'loadMax',
  'cylinderScrew',
  'lz1_d1',
  'lz1_d2',
  'brandName',
  'clientWeight',
  'weightBrutto',
  'colorName',
  'colorNameUnique',
  'applicability',
]

const Files = observer(({ className }: { className: string }) => {
  const { getRimPassport } = rimsStore

  const onPassportClick = async () => {
    await getRimPassport()
  }

  return (
    <div className={classNames(css.files)}>
      <div className={className} onClick={onPassportClick}>
        <span>
          <File />
        </span>
        <span>Паспорт товара (.pdf)</span>
      </div>
      <div className={className}>
        <span>
          <File />
        </span>
        <span>Сертификат качества (.jpg)</span>
      </div>
    </div>
  )
})

export const AllCharacteristicsBody: FC<Props> = ({ currentRim }) => {
  const first = characteristicsToShow.slice(0, 8)
  const last = characteristicsToShow.slice(8)
  const { isTablet, isMobile } = useWindowState()

  return (
    <div id='characteristics'>
      <div className={classNames(css.titleHolder, (isTablet || isMobile) && css.titleHolderSmall)}>
        <div className={css.title}>Характеристики</div>
        <Files className={classNames(css.filesTop, isTablet && css.filesTopSmall)} />
      </div>
      <div className={classNames(css.holder, isMobile && css.holderSmall)}>
        <CharacteristicList classname={css.rowGap} list={first} currentRim={currentRim} />
        <CharacteristicList classname={css.rowGap} list={last} currentRim={currentRim} />
        {!isTablet && <Files className={classNames(css.filesBottom, isTablet && css.filesBottomSmall)} />}
      </div>
    </div>
  )
}
