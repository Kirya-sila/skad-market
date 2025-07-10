'use client'

import brakeDiskImg from '@assets/images/brake-disk_100x100.png'
import rimImg from '@assets/images/rim_110x110.png'
import tireImg from '@assets/images/tire_100x100.png'
import { CategoryCard } from '@shared/ui/CategoryCard'
import { ImageLoader } from '@shared/ui/ImageLoader'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import css from './CategoryLine.module.scss'
import { appRoutes } from '@/app-settings'

interface CategoryLineProps {
  className?: string
  onClick?: VoidFunction
}

export const CategoryLine = ({ className, onClick }: CategoryLineProps) => {
  const router = useRouter()
  const clickHandler = (path: string) => {
    if (onClick) {
      onClick()
    }
    router.push(path)
  }
  return (
    <div className={cn(css.categoryLine, className)}>
      <CategoryCard
        onClick={() => clickHandler(appRoutes.rims)}
        label='Диски'
        className={css.categoryButton}
        image={<ImageLoader src={rimImg} />}
      />
      <CategoryCard
        label='Шины'
        className={css.categoryButton}
        image={<ImageLoader src={tireImg} />}
        onClick={() => clickHandler(appRoutes.tyres)}
      />
      <CategoryCard
        label='Комплектующие'
        className={css.categoryButton}
        image={<ImageLoader src={brakeDiskImg} />}
        onClick={() => clickHandler(appRoutes.components)}
      />
    </div>
  )
}

CategoryLine.displayName = 'CategoryLine'
