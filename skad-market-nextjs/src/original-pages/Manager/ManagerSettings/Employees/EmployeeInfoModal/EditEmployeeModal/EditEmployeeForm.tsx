import { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import { roles } from '../../constants'
import { ErrorMessage, FormikSelectionInput, FormikTextInput } from '@/shared/ui'

interface IEditEmployeeForm {
  onClose: VoidFunction
  loading: boolean
  serverError: string
}

const { Title } = Typography

export const EditEmployeeForm: FC<IEditEmployeeForm> = ({ onClose, loading, serverError }) => {
  return (
    <Flex vertical gap={16}>
      <Title level={4} style={{ margin: 0 }}>
        Редактирование данных
      </Title>
      <FormikTextInput required name='lastName' label='Фамилия' />
      <FormikTextInput required name='firstName' label='Имя' />
      <FormikTextInput required name='middleName' label='Отчество' />
      <FormikSelectionInput options={roles} name='role' placeholder='Выберите роль' />
      <FormikTextInput name='email' label='E-mail' />
      {serverError && <ErrorMessage errorMessage={serverError} />}
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
