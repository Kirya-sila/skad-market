import { FC } from 'react'
import {
    ChevroletIcon,
    HavalIcon,
    KIAIcon,
    LADAIcon,
    LexusIcon,
    RenaultIcon,
    ToyotaIcon,
    VolvoIcon,
} from '@assets/icons'
import { BrandButton } from '../CatalogBrandCar'
import css from './SearchRimsByCar.module.scss'

interface ICarBrandIconsList {
  handleChangeActiveBrand: (brand: string) => Promise<void>
}

const BRAND_ICONS = [
  { name: 'KIA', Icon: KIAIcon },
  { name: 'LADA', Icon: LADAIcon },
  { name: 'Renault', Icon: RenaultIcon },
  { name: 'Toyota', Icon: ToyotaIcon },
  { name: 'Haval', Icon: HavalIcon },
  { name: 'Chevrolet', Icon: ChevroletIcon },
  { name: 'Lexus', Icon: LexusIcon },
  { name: 'Volvo', Icon: VolvoIcon },
]

export const CarBrandIconsList: FC<ICarBrandIconsList> = ({ handleChangeActiveBrand }) => {
  return (
    <div className={css.brands}>
      {BRAND_ICONS.map(({ name, Icon }) => (
        <BrandButton
          className={css.brandButton}
          key={name}
          icon={<Icon />}
          onClick={() => handleChangeActiveBrand(name)}
          label={name}
        />
      ))}
    </div>
  )
}
