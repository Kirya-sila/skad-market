'use client'

import { FC } from 'react'
import { ConfigProvider, Flex, GetProp, Menu, MenuProps } from 'antd'
import useToken from 'antd/es/theme/useToken'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'
import { primaryBlack, primaryDarkGray } from '@/theme'

type MenuItem = GetProp<MenuProps, 'items'>[number]

const StyledMenu = styled(Menu)({
  width: 'auto',
  fontSize: 18,
  '& .ant-menu-item': {
    paddingLeft: '0 !important',
    color: primaryDarkGray,
    'a:hover': {
      fontWeight: 600,
      color: primaryBlack,
    },
  },
  '& .ant-menu-submenu.ant-menu-submenu-inline': {
    '> div': {
      paddingLeft: '0 !important',
    },
  },
  '& .ant-menu-sub': {
    '> li': {
      paddingLeft: '16px !important',
    },
  },
  '.ant-menu-item-selected': {
    a: {
      color: primaryBlack,
      fontWeight: 600,
    },
  },
})

export const PersonalCabinetSideMenu: FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
  const pathname = usePathname()

  return (
    <Flex>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemPaddingInline: 0,
              itemHoverBg: 'none',
              itemSelectedBg: 'none',
              itemActiveBg: 'none',
              itemHoverColor: useToken()[1].colorTextHeading,
            },
          },
        }}
      >
        <StyledMenu
          style={{ borderInlineEnd: 'none' }}
          //   defaultSelectedKeys={[selected]}
          selectedKeys={[pathname]}
          mode='inline'
          theme='light'
          items={menuItems}
          //   onSelect={onSelect}
        />
      </ConfigProvider>
    </Flex>
  )
}
