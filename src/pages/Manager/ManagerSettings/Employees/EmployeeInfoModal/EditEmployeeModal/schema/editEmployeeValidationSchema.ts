import * as Yup from 'yup'
import { EmployeeRole, IBaseEmployeeInfo } from '@/interfaces'

export const editEmployeeValidationSchema: Yup.ObjectSchema<IBaseEmployeeInfo> = Yup.object({
  firstName: Yup.string().required('Имя обязательное поле'),
  lastName: Yup.string().required('Фамилия обязательное поле'),
  middleName: Yup.string().required('Отчество обязательное поле'),
  role: Yup.mixed<EmployeeRole>().required('Роль обязательное поле'),
  email: Yup.string().email('Введите валидный E-mail').label('E-mail').required('E-mail обязательное поле'),
})
