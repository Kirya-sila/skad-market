import React, { FC } from 'react'
import css from './DeliveryDateSection.module.scss'
import { getOrderDateString } from '@/helpers'
import { IOrderDeliveryData } from '@/interfaces'

interface IDeliveryDateSection {
  date: IOrderDeliveryData['estimatedDeliveryDate']
}

export const DeliveryDateSection: FC<IDeliveryDateSection> = ({ date }) => {
  return <div className={css.container}>Доставка {getOrderDateString(date)}</div>
}
