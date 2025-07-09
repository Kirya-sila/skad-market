import { FC, ReactElement, ReactNode, useMemo } from 'react'
import { Flex, Typography } from 'antd'
import { SellerBrandLogo } from '@/assets/icons'
import { useWindowState } from '@/shared/libs'
import { Copyright } from '@/widgets'

interface ISellerSignInContainer {
  title: string
  infoText?: ReactNode
  children: ReactElement
}

const { Title, Text } = Typography

export const SignInContainer: FC<ISellerSignInContainer> = ({ title, infoText, children }) => {
  const { isTablet, isMobile, isOldMobilePhone } = useWindowState()

  const titleSize = useMemo(() => {
    if (isMobile) {
      return 5
    }
    if (isTablet) {
      return 4
    }
    return 3
  }, [isMobile, isTablet])

  return (
    <Flex
      vertical
      justify='space-between'
      style={{
        width: isOldMobilePhone ? 360 : 384,
        height: '100vh',
        margin: 'auto',
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <Flex vertical align='center' justify='center' flex={1}>
        <Flex style={{ marginBottom: 42 }}>
          <SellerBrandLogo />
        </Flex>

        <Title style={{ marginBottom: 16, textAlign: 'center', marginTop: 0 }} level={titleSize}>
          {title}
        </Title>
        {infoText && (
          <Text style={{ textAlign: 'center', marginBottom: 24, fontSize: isMobile ? 16 : 18 }}>{infoText}</Text>
        )}
        <Flex vertical gap={16} style={{ width: '100%' }}>
          {children}
        </Flex>
      </Flex>
      <Flex vertical gap={16} style={{ paddingBottom: 24 }}>
        <Text style={{ textAlign: 'center', fontWeight: 600 }}>Связаться с поддержкой</Text>
        <Text type='secondary' style={{ textAlign: 'center' }}>
          <Copyright />
        </Text>
      </Flex>
    </Flex>
  )
}
