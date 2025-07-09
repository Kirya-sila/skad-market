import { useMemo } from 'react'
import { Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SignInContainer } from '../SignInContainer'
import { sellerResetPasswordValidationSchema } from './schema'
import { appRoutes } from '@/app-settings'
import { sellerAuthorizationStore } from '@/features/sellerAuthorization'
import { ISellerResetPassword } from '@/interfaces'
import { handleCatchedError } from '@/shared/libs'
import { FormikContainer, FormikPasswordInput, RegularButton } from '@/shared/ui'

const { Text, Link } = Typography

const initialValues: ISellerResetPassword = {
  password: '',
  passwordConfirmation: '',
}

export const ResetPassword = observer(() => {
  // const location = useLocation()
  // console.log('location: ', location.search.split('token=')[1])
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryParams = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams])
  const { sellerResetPassword, setError, setLoading, authorizationError, loading } = sellerAuthorizationStore

  const onSubmit = async (values: ISellerResetPassword) => {
    try {
      await sellerResetPassword({ ...values, email: queryParams.email, token: queryParams.token })
      navigate(appRoutes.managerSignIn)
    } catch (e) {
      const error = handleCatchedError(e)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormikContainer
      id='sellerResetPassword'
      enableReinitialize
      initialValues={initialValues}
      validationSchema={sellerResetPasswordValidationSchema}
      onSubmit={onSubmit}
    >
      <SignInContainer title='Придумайте новый пароль'>
        <>
          <FormikPasswordInput required name='password' label='Пароль' />
          <FormikPasswordInput
            required
            name='passwordConfirmation'
            label='Повторите новый пароль'
            serverError={authorizationError}
          />

          <ul style={{ marginTop: 0, marginBottom: 0 }}>
            <Text>
              <li>Новый пароль не должен совпадать со старым паролем</li>
            </Text>
            <Text>
              <li>
                Должен состоять минимум из 10 символов, включая строчные и заглавные латинские буквы, цифры и знаки,
                например, «!, _, %, #»
              </li>
            </Text>
          </ul>
          <RegularButton type='submit' text='Сохранить и продолжить' loading={loading} fullWidth />

          <Link href={appRoutes.managerSignIn} style={{ textAlign: 'center', fontWeight: 600, fontSize: 16 }}>
            Войти
          </Link>
        </>
      </SignInContainer>
    </FormikContainer>
  )
})
