import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'
import { SettingsMenu } from '../SettingsMenu'

export const ManagerSettingsHomePage = () => {
  return (
    <Flex gap={32}>
      <SettingsMenu />
      <Outlet />
    </Flex>
  )
}
