import { DotsBurger } from '@/assets/icons'
import { Button } from 'antd'
import React, { FC } from 'react'

export const BurgerButton: FC<{ onClick?: VoidFunction }> = ({ onClick }) => {
  return (
    <Button type='text' size='small' style={{ padding: '0px 9px', borderRadius: 15 }} onClick={onClick}>
      <DotsBurger />
    </Button>
  )
}
