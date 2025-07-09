import { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import { roles } from '../../constants'
import { ErrorMessage, FormikPasswordInput, FormikSelectionInput, FormikTextInput } from '@/shared/ui'

interface IEmployeeInfoForm {
  onClose: VoidFunction
  loading: boolean
  serverError: string
}

const { Title, Text } = Typography

export const EmployeeInfoForm: FC<IEmployeeInfoForm> = ({ onClose, loading, serverError }) => {
  return (
    <Flex vertical gap={16}>
      <Title level={4} style={{ margin: 0 }}>
        Создание нового сотрудника
      </Title>
      <FormikTextInput required name='lastName' label='Фамилия' />
      <FormikTextInput required name='firstName' label='Имя' />
      <FormikTextInput required name='middleName' label='Отчество' />
      <FormikSelectionInput options={roles} name='role' placeholder='Выберите роль' />
      <FormikTextInput name='email' label='E-mail' />
      <FormikPasswordInput required name='password' label='Пароль' />
      <FormikPasswordInput required name='passwordConfirmation' label='Подтверждение пароля' />
      {serverError && <ErrorMessage errorMessage={serverError} />}
      <ul style={{ marginTop: 0, marginBottom: 0, paddingLeft: 20 }}>
        <Text>
          <li>
            Пароль должен состоять минимум из 10 символов, включая строчные и заглавные латинские буквы, цифры и знаки,
            например, «!, _, %, #»
          </li>
        </Text>
      </ul>
      <Flex gap={8}>
        <Button style={{ width: '100%' }} size='large' type='default' onClick={onClose}>
          Отмена
        </Button>
        <Button style={{ width: '100%' }} loading={loading} size='large' type='primary' htmlType='submit'>
          Сохранить
        </Button>
      </Flex>
    </Flex>
  )
}
