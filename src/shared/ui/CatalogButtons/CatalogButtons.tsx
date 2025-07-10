'use client'

import { FC } from 'react'
import smallBrakeDisk from '@assets/images/brake_disk_44x44.png'
import smallRim from '@assets/images/rim_44x44.png'
import smallTire from '@assets/images/tire_44x44.png'
import { Flex } from 'antd'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { ImageLoader } from '../ImageLoader'
import { CatalogButtton } from './CatalogButton'
import css from './CatalogButtons.module.scss'
import { appRoutes } from '@/app-settings'

export const CatalogButtons: FC<{ className?: string, gap?: number }> = ({ className, gap = 8 }) => {
  const router = useRouter()
  return (
    <Flex className={cn(css.catalogButtons, className)} gap={gap}>
      <CatalogButtton
        label='Диски'
        handleClick={() => router.push(appRoutes.rims)}
        image={<ImageLoader src={smallRim} />}
      />
      <CatalogButtton
        label='Шины'
        handleClick={() => router.push(appRoutes.rims)}
        image={<ImageLoader src={smallTire} />}
      />
      <CatalogButtton
        label='Комплектующие'
        handleClick={() => router.push(appRoutes.rims)}
        image={<ImageLoader src={smallBrakeDisk} />}
      />
    </Flex>
  )
}
