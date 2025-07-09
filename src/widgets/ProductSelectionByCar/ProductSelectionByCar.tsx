import { ChevroletIcon, HavalIcon, KIAIcon, LADAIcon, RenaultIcon } from '@assets/icons'
import { BrandButton, RegularButton, SearchCarModalProps } from '@shared/ui'
import cn from 'classnames'
import css from './ProductSelectionByCar.module.scss'
import { Modals } from '@/app/config/modal/modals-confg'
import { useModal, useWindowSize, useWindowState } from '@/shared/libs'
import { Button } from 'antd'

interface ProductSelectionByCarProps {
  className?: string
  onClickFindCar?: VoidFunction
}

interface ICarModel {
  brand: string
  model: string
}

const modelConfig = {
  kiaRio: {
    brand: 'KIA',
    model: 'Rio',
  },
  ladaGranta: {
    brand: 'LADA',
    model: 'Granta',
  },
  renaultLogan: {
    brand: 'Renault',
    model: 'Logan',
  },
  chevroletNiva: {
    brand: 'Chevrolet',
    model: 'Niva',
  },
  havalJolion: {
    brand: 'Haval',
    model: 'Jolion',
  },
}

export const ProductSelectionByCar = ({ className, onClickFindCar }: ProductSelectionByCarProps) => {
  const isMobile = useWindowState()
  const searchCarModal = useModal<SearchCarModalProps>(Modals.SearchCar)

  const handleCarModels = ({ brand, model }: ICarModel) => {
    searchCarModal.open({
      onClose: searchCarModal.close,
      initialCarModels: { brand, model },
    })
  }
  return (
    <div className={cn(css.productSelectionByCar, className)}>
      <div className={css.header}>
        <div className={css.title}>Подберите товар по автомобилю</div>
        <RegularButton text='Найти свой автомобиль' size='middle' className={css.topBtn} onClick={onClickFindCar} />
      </div>
      <div className={css.logos}>
        <BrandButton icon={<KIAIcon />} label='KIA Rio' onClick={() => handleCarModels(modelConfig.kiaRio)} />
        <BrandButton
          icon={<LADAIcon />}
          label='LADA Granta'
          className={css.lada}
          onClick={() => handleCarModels(modelConfig.ladaGranta)}
        />
        <BrandButton
          icon={<RenaultIcon />}
          label='Logan'
          className={css.renault}
          onClick={() => handleCarModels(modelConfig.renaultLogan)}
        />
        <BrandButton
          icon={<ChevroletIcon />}
          label='Chevrolet Niva'
          onClick={() => handleCarModels(modelConfig.chevroletNiva)}
        />
        <BrandButton
          icon={<HavalIcon />}
          label='Haval Jolion'
          onClick={() => handleCarModels(modelConfig.havalJolion)}
        />
      </div>
      <Button type='primary' size='middle' className={css.bottomBtn} onClick={onClickFindCar}>
        Найти свой автомобиль
      </Button>
    </div>
  )
}

ProductSelectionByCar.displayName = 'ProductSelectionByCar'
