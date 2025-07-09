import { useMemo } from 'react'
import { Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { SignInContainer } from '../SignInContainer'
import { appRoutes } from '@/app-settings'
import { useWindowState } from '@/shared/libs'
import { theme } from '@/theme'

const { Link, Text } = Typography

export const ResetPasswordRequestSentPage = () => {
  const { isMobile } = useWindowState()
  const [searchParams] = useSearchParams()
  const queryParams = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams])

  const {
    token: { colorPrimary },
  } = theme

  const infoText = (
    <>
      Письмо с инструкцией для восстановления пароля отправлено на{' '}
      <Text style={{ color: colorPrimary, fontWeight: 600, fontSize: isMobile ? 16 : 18 }}>{queryParams.email}</Text>{' '}
    </>
  )
  return (
    <SignInContainer title='Восстановление пароля' infoText={infoText}>
      <>
        <Link href={appRoutes.managerSignIn} style={{ textAlign: 'center', fontWeight: 600, fontSize: 16 }}>
          Войти
        </Link>
      </>
    </SignInContainer>
  )
}
