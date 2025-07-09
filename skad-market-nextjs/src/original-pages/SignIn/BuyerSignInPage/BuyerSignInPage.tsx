import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '@/app-settings'
import { ButtonBack, BuyerAuthorizationContent } from '@/shared/ui'

export const BuyerSignInPage = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(appRoutes.root)
  }

  return (
    <Flex
      vertical
      align='center'
      justify='center'
      style={{ width: '100%', maxWidth: 1440, height: '100vh', position: 'relative' }}
    >
      <Flex style={{ position: 'absolute', top: 24, left: 24 }}>
        <ButtonBack handleButtonClick={handleBack}>На главную</ButtonBack>
      </Flex>
      <Flex vertical style={{ width: '420px' }}>
        <BuyerAuthorizationContent />
      </Flex>
    </Flex>
  )
}
