import { Flex } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { appRoutes } from '@/app-settings'
import { SellerBrandLogo, SettingsWheelIcon, SmallBellIcon } from '@/assets/icons'
import { RegularButton } from '@/shared/ui'
import { theme } from '@/theme'

const menuTabs = [
  { to: appRoutes.manager.goods.root, label: 'Товары' },
  { to: appRoutes.manager.orders.root, label: 'Заказы' },
  { to: appRoutes.manager.reports.root, label: 'Отчеты' },
]

const settingsTabs = [
  { to: appRoutes.manager.notifications.root, label: 'Уведомления', icon: <SmallBellIcon /> },
  { to: appRoutes.manager.settings.root, label: 'Настройки', icon: <SettingsWheelIcon /> },
]

export const ManagerPageHeader = () => {
  const navigate = useNavigate()
  const { token } = theme

  return (
    <Flex vertical>
      <Flex justify='space-between' align='center' style={{ padding: '20px 0' }}>
        <Flex style={{ cursor: 'pointer', width: 220 }} onClick={() => navigate(appRoutes.manager.settings.employees)}>
          <SellerBrandLogo />
        </Flex>
        <Flex gap={48}>
          {menuTabs.map(({ to, label }) => (
            <RegularButton
              key={to}
              variant='text'
              text={
                <NavLink to={to}>
                  {({ isActive }) => {
                    return (
                      <Flex style={{ fontWeight: isActive ? 600 : 500, color: token.colorTextHeading }}>{label}</Flex>
                    )
                  }}
                </NavLink>
              }
              appearance='defaultText'
              //   style={{ fontWeight: isGoods ? 600 : 500 }}
            />
          ))}
        </Flex>
        <Flex gap={24}>
          {settingsTabs.map(({ to, label, icon }) => (
            <RegularButton
              key={to}
              leftIcon={icon}
              variant='text'
              text={
                <NavLink to={to}>
                  {({ isActive }) => {
                    return (
                      <Flex style={{ fontWeight: isActive ? 600 : 500, color: token.colorTextHeading }}>{label}</Flex>
                    )
                  }}
                </NavLink>
              }
              appearance='defaultText'
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
