import { FC, ReactNode } from 'react'
import productCardImageSrc3 from '@assets/images/product_card_image_3.png'
import { Flex } from 'antd'
import { generatePath, useNavigate } from 'react-router-dom'
import css from './OrderItem.module.scss'
import { appRoutes } from '@/app-settings'
import { ImageLoader } from '@/shared/ui/ImageLoader'

interface IOrderItem {
  image: string
  wheelCode?: string
  title: ReactNode
  secodRow: ReactNode
  thirdRow?: ReactNode
}

export const OrderItem: FC<IOrderItem> = ({ image, wheelCode, title, secodRow, thirdRow }) => {
  const navigate = useNavigate()
  return (
    <Flex className={css.imageWithContent}>
      <Flex className={css.checkboxImageConatiner}>
        <ImageLoader className={css.image} src={image ?? productCardImageSrc3} />
      </Flex>
      <Flex vertical align='flex-start'>
        <span
          className={css.title}
          onClick={() => {
            if (wheelCode) {
              navigate(generatePath(appRoutes.rimsItem, { wheelCode }))
            }
          }}
        >
          {title}
        </span>
        {secodRow}
        {thirdRow}
      </Flex>
    </Flex>
  )
}
