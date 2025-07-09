import React, { FC } from 'react'
import { List, ListProps } from '../List'
import css from './SearchRimsByCar.module.scss'

export const CarListItem = ({ ...props }: ListProps) => <List {...props} className={css.listItem} />
