'use client'

import { useEffect } from 'react'
import { Flex, GetProp, MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import NextLink from 'next/link'
import styled from 'styled-components'
import { appRoutes } from '@/app-settings'
import { buyerCabinetStore } from '@/features/buyer'
import { IMenuItemsCount } from '@/interfaces'
import { PersonalCabinetSideMenu } from '@/shared/ui'
import { primaryDarkestGray, primaryLightGray } from '@/theme'

type MenuItem = GetProp<MenuProps, 'items'>[number]

const CountNumber = styled(Flex)({
  padding: 8,
  height: 18,
  borderRadius: 9,
  backgroundColor: primaryLightGray,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 11,
  lineHeight: 14,
  fontWeight: 600,
  color: primaryDarkestGray,
})

const menuItems: (menuItemsCount: IMenuItemsCount) => MenuItem[] = (menuItemsCount: IMenuItemsCount) => [
  {
    key: appRoutes.buyer.root,
    label: <NextLink href={appRoutes.buyer.root}>Главная</NextLink>,
  },
  {
    key: appRoutes.buyer.orders.root,
    label: (
      <Flex gap={8} align='center'>
        <NextLink href={appRoutes.buyer.orders.root}>Заказы</NextLink>
        <CountNumber>{menuItemsCount?.allOrders ?? 0}</CountNumber>
      </Flex>
    ),
  },
  {
    key: appRoutes.buyer.profile,
    label: <NextLink href={appRoutes.buyer.profile}>Профиль</NextLink>,
  },
  // {
  //   key: appRoutes.buyer.favorites,
  //   label: <NextLink href={appRoutes.buyer.favorites}>Избранное</NextLink>,
  // },
  // {
  //   key: appRoutes.buyer.comparisons,
  //   label: <NextLink href={appRoutes.buyer.comparisons}>Сравнения</NextLink>,
  // },
  {
    key: appRoutes.buyer.notifications,
    label: (
      <Flex gap={8} align='center'>
        <NextLink href={appRoutes.buyer.notifications}>Уведомления</NextLink>
        {/* <CountNumber>{menuItemsCount.allNotifications ?? 0}</CountNumber> */}
      </Flex>
    ),
  },
]

export const SideMenu = observer(() => {
  const { getMenuItemsCount, menuItemsCount } = buyerCabinetStore

  useEffect(() => {
    const getMenuItems = async () => await getMenuItemsCount()
    getMenuItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PersonalCabinetSideMenu menuItems={menuItems(menuItemsCount)} />
})
