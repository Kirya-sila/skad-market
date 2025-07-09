import { FC } from 'react'
import smallBrakeDisk from '@assets/images/brake_disk_44x44.png'
import smallRim from '@assets/images/rim_44x44.png'
import smallTire from '@assets/images/tire_44x44.png'
import { Flex } from 'antd'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { ImageLoader } from '../ImageLoader'
import { CatalogButtton } from './CatalogButton'
import css from './CatalogButtons.module.scss'
import { appRoutes } from '@/app-settings'

export const CatalogButtons: FC<{ className?: string, gap?: number }> = ({ className, gap = 8 }) => {
  const navigate = useNavigate()
  return (
    <Flex className={cn(css.catalogButtons, className)} gap={gap}>
      <CatalogButtton
        label='Диски'
        handleClick={() => navigate(appRoutes.rims)}
        image={<ImageLoader src={smallRim} />}
      />
      <CatalogButtton
        label='Шины'
        handleClick={() => navigate(appRoutes.rims)}
        image={<ImageLoader src={smallTire} />}
      />
      <CatalogButtton
        label='Комплектующие'
        handleClick={() => navigate(appRoutes.rims)}
        image={<ImageLoader src={smallBrakeDisk} />}
      />
    </Flex>
  )
}
