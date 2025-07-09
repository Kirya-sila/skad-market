import { Button, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { SignInContainer } from '../SignInContainer'
import { sellerSignInValidationSchema } from './schema'
import { appRoutes } from '@/app-settings'
import { sellerAuthorizationStore } from '@/features/sellerAuthorization'
import { ISellerSignIn } from '@/interfaces'
import { FormikContainer, FormikPasswordInput, FormikTextInput } from '@/shared/ui'

const { Text, Link } = Typography

const initialValues: ISellerSignIn = {
  email: '',
  password: '',
}

export const ManagerSignIn = observer(() => {
  const { sellerSignIn, authorizationError, loading } = sellerAuthorizationStore

  const onSubmit = (values: ISellerSignIn) => {
    sellerSignIn(values)
  }

  return (
    <FormikContainer
      id='sellerSignIn'
      enableReinitialize
      initialValues={initialValues}
      validationSchema={sellerSignInValidationSchema}
      onSubmit={onSubmit}
    >
      <SignInContainer title='Добро пожаловать' infoText='Введите логин и пароль, чтобы войти как продавец'>
        <>
          <FormikTextInput required name='email' label='Email' type='email' hasError={!!authorizationError} />
          <FormikPasswordInput required name='password' label='Пароль' serverError={authorizationError} />
          <Button type='primary' htmlType='submit' size='large' loading={loading} disabled={loading}>
            Войти
          </Button>
          <Text type='secondary' style={{ textAlign: 'center', fontSize: 12 }}>
            Совершая авторизацию Вы соглашаетесь с условиями обработки персональных данных
          </Text>
          <Link
            href={appRoutes.resetPasswordRequestPage}
            style={{ textAlign: 'center', fontWeight: 600, fontSize: 16 }}
          >
            Забыли пароль?
          </Link>
        </>
      </SignInContainer>
    </FormikContainer>
  )
})
