'use client'

import { Flex } from 'antd'
import { SettingsMenu } from '../SettingsMenu'

export const ManagerSettingsHomePage = () => {
  return (
    <Flex gap={32}>
      <SettingsMenu />
      {/* Content will be rendered by Next.js routing */}
    </Flex>
  )
}
