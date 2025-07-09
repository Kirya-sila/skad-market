import { Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { SignInContainer } from '../SignInContainer'
import { sellerResetPasswordRequestValidationSchema } from './schema'
import { appRoutes } from '@/app-settings'
import { sellerAuthorizationStore } from '@/features/sellerAuthorization'
import { ISellerSignIn } from '@/interfaces'
import { FormikContainer, FormikTextInput, RegularButton } from '@/shared/ui'

const { Link } = Typography

const initialValues: Omit<ISellerSignIn, 'password'> = {
  email: '',
}

export const ResetPasswordRequestPage = observer(() => {
  const { sellerResetPasswordRequest, authorizationError, loading } = sellerAuthorizationStore

  const onSubmit = (values: Omit<ISellerSignIn, 'password'>) => {
    sellerResetPasswordRequest(values)
  }

  return (
    <FormikContainer
      id='resetPasswordRequestForm'
      enableReinitialize
      initialValues={initialValues}
      validationSchema={sellerResetPasswordRequestValidationSchema}
      onSubmit={onSubmit}
    >
      <SignInContainer
        title='Восстановление пароля'
        infoText='Для восстановления пароля укажите ваш E-mail, привязанный к аккаунту'
      >
        <>
          <FormikTextInput
            required
            name='email'
            label='Email'
            type='email'
            serverError={authorizationError}
            hasError={!!authorizationError}
          />
          <RegularButton type='submit' text='Продолжить' loading={loading} fullWidth />

          <Link href={appRoutes.managerSignIn} style={{ textAlign: 'center', fontWeight: 600, fontSize: 16 }}>
            Войти
          </Link>
        </>
      </SignInContainer>
    </FormikContainer>
  )
})
