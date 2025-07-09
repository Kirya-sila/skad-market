import { useCallback, useEffect, useMemo, useState } from 'react'
import { GetProp, MenuProps, Typography } from 'antd'
import { NavLink, useMatches } from 'react-router-dom'
import { appRoutes } from '@/app-settings'
import { PersonalCabinetSideMenu } from '@/shared/ui'

type MenuItem = GetProp<MenuProps, 'items'>[number]

const { Text } = Typography

const getItems: (isShopSeleted: boolean) => MenuItem[] = (isShopSeleted: boolean) => [
  {
    key: appRoutes.manager.settings.profile,
    label: <NavLink to={appRoutes.manager.settings.profile}>Профиль</NavLink>,
  },
  {
    key: appRoutes.manager.settings.employees,
    label: <NavLink to={appRoutes.manager.settings.employees}>Сотрудники</NavLink>,
  },
  {
    key: appRoutes.manager.settings.merchants,
    label: <NavLink to={appRoutes.manager.settings.merchants}>Продавцы</NavLink>,
  },
  {
    key: appRoutes.manager.settings.buyers,
    label: <NavLink to={appRoutes.manager.settings.buyers}>Покупатели</NavLink>,
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
    label: <NavLink to={appRoutes.manager.settings.notifications}>Уведомления</NavLink>,
  },
]

export const SettingsMenu = () => {
  const matches = useMatches()
  const [isShopSelected, setShopSelected] = useState(false)

  const isMatches = useMemo(() => matches.length > 1 && matches[1].pathname.includes('shop'), [matches])

  useEffect(() => {
    setShopSelected(isMatches)
  }, [isMatches])

  const getMenuItems = useCallback(getItems, [])

  return (
    <PersonalCabinetSideMenu menuItems={getMenuItems(isShopSelected)} />
  )
}
