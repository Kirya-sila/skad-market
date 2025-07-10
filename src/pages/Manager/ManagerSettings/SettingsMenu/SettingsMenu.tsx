'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { GetProp, MenuProps, Typography } from 'antd'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { appRoutes } from '@/app-settings'
import { PersonalCabinetSideMenu } from '@/shared/ui'

type MenuItem = GetProp<MenuProps, 'items'>[number]

const { Text } = Typography

const getItems: (isShopSeleted: boolean) => MenuItem[] = (isShopSeleted: boolean) => [
  {
    key: appRoutes.manager.settings.profile,
    label: <NextLink href={appRoutes.manager.settings.profile}>Профиль</NextLink>,
  },
  {
    key: appRoutes.manager.settings.employees,
    label: <NextLink href={appRoutes.manager.settings.employees}>Сотрудники</NextLink>,
  },
  {
    key: appRoutes.manager.settings.merchants,
    label: <NextLink href={appRoutes.manager.settings.merchants}>Продавцы</NextLink>,
  },
  {
    key: appRoutes.manager.settings.buyers,
    label: <NextLink href={appRoutes.manager.settings.buyers}>Покупатели</NextLink>,
  },
  {
    key: 'shop',
    label: <Text style={{ fontSize: '18px', fontWeight: isShopSeleted ? 600 : 400 }}>Магазин</Text>,
    children: [
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
    ],
  },
  {
    key: appRoutes.manager.settings.notifications,
    label: <NextLink href={appRoutes.manager.settings.notifications}>Уведомления</NextLink>,
  },
]

export const SettingsMenu = () => {
  const pathname = usePathname()
  const [isShopSelected, setShopSelected] = useState(false)

  const isMatches = useMemo(() => pathname.includes('shop'), [pathname])

  useEffect(() => {
    setShopSelected(isMatches)
  }, [isMatches])

  const getMenuItems = useCallback(getItems, [])

  return (
    <PersonalCabinetSideMenu menuItems={getMenuItems(isShopSelected)} />
  )
}
