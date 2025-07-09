import * as Yup from 'yup'
import { passwordRegex } from '@/constants'
import { EmployeeRole, IEmployeesInfo } from '@/interfaces'

const passNotConfirmed = 'Пароль не соответсвует требованиям'

export const employeeInfoValidationSchema: Yup.ObjectSchema<IEmployeesInfo> = Yup.object({
  firstName: Yup.string().required('Имя обязательное поле'),
  lastName: Yup.string().required('Фамилия обязательное поле'),
  middleName: Yup.string().required('Отчество обязательное поле'),
  role: Yup.mixed<EmployeeRole>().required('Роль обязательное поле'),
  email: Yup.string().email().label('E-mail').required('E-mail обязательное поле'),
  password: Yup.string().matches(passwordRegex, passNotConfirmed).required('Пароль обязательное поле'),
  passwordConfirmation: Yup.string()
    .trim()
    .label('Подтверждение пароля')
    .matches(passwordRegex, passNotConfirmed)
    .required('"Подтверждение пароля" обязательное поле')
    .test('match', 'Пароли должны совпадать', (value: string, context) => {
      const {
        parent: { password },
      } = context

      if (value !== password) {
        return false
      }
      return true
    }),
})
