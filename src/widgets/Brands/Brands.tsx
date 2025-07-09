import { useState } from 'react'
import {
  ICArrowRightLine,
  ICIFree,
  ICKK,
  ICOriginal,
  ICSkad,
  ICUpWheels
} from '@assets/icons'
import { Logo } from '@shared/ui/Logo'
import { Flex } from 'antd'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import css from './Brands.module.scss'
import { appRoutes } from '@/app-settings'
import { rimsStore } from '@/entities/Rims'
import { useNavigateWithScrollUp } from '@/shared/libs'

interface BrandsProps {
  className?: string
}

const brands = [
  {
    icon: <ICSkad />,
    name: 'SKAD',
  },
  // {
  //   icon: <ICPremiumSeries />,
  //   name: 'SKAD',
  // },
  {
    icon: <ICUpWheels />,
    name: 'WUP',
  },
  {
    icon: <ICOriginal />,
    name: 'SKAD Original',
  },
  {
    icon: <ICKK />,
    name: 'K&K',
  },
  {
    icon: <ICIFree />,
    name: 'iFree',
  },
  // {
  //   icon: <ICPirelli />,
  //   name: 'Pirelli',
  // },
]

export const Brands = observer(({ className }: BrandsProps) => {
  const navigate = useNavigateWithScrollUp()
  const [openAllBrands, setOpenAllBrands] = useState(false)

  const { getRimsByRimBrand } = rimsStore

  const handleBrandClick = async (name: string) => {
    getRimsByRimBrand('brands', name)
    navigate(appRoutes.rims)
  }

  const handleAllBrands = () => {
    setOpenAllBrands(!openAllBrands)
  }

  return (
    <div className={cn(css.brands, className)}>
      <div className={css.header}>
        <div className={css.title}>Бренды</div>

        <button className={css.expand} onClick={handleAllBrands}>
          Все бренды
          <Flex style={{ transform: openAllBrands ? 'rotate(-90deg)' : 'rotate(90deg)' }}>
            <ICArrowRightLine />
          </Flex>
        </button>
      </div>
      <Flex className={cn(css.body, { [css.openAllBrands]: openAllBrands })}>
        {brands.map(({ icon, name }) => (
          <Logo key={name} icon={icon} onClick={() => handleBrandClick(name)} />
        ))}
      </Flex>
    </div>
  )
})
