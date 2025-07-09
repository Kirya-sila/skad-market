import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'
import { ManagerPageFooter, ManagerPageHeader } from '@/widgets/Manager'

// interface ISellerHomePage {}

export const ManagerHomePage = () => {
  return (
    <Flex vertical style={{ padding: '0 60px', height: '100vh' }} justify='space-between'>
      <Flex vertical gap={36}>
        <ManagerPageHeader />
        <Outlet />
      </Flex>
      <ManagerPageFooter />
    </Flex>
  )
}
