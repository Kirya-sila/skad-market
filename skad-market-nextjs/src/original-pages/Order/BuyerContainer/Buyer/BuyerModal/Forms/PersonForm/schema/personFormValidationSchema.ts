import * as Yup from 'yup'
import { IBuyerContactInfo } from '@/interfaces'

const digitsLimitMessage = 'Номер должен состоять из 11 цифр'

export const personFormValidationSchema: Yup.ObjectSchema<Omit<IBuyerContactInfo, 'orderId'>> = Yup.object({
  email: Yup.string().email().nullable().label('E-mail'),
  firstName: Yup.string().nullable().required('Имя обязательное поле'),
  lastName: Yup.string().nullable().required('Фамилия обязательное поле'),
  phoneNumber: Yup.string()
    .nullable()
    .matches(/^[0-9]+$/, 'Номер должен содержать только цифры')
    .min(10, digitsLimitMessage)
    .max(10, digitsLimitMessage)
    .required('Номер телефона обязательное поле'),
  isOtherPerson: Yup.boolean().required(),
  otherPersonFirstName: Yup.string()
    .nullable()
    .when('isOtherPerson', { is: true, then: (schema) => schema.required('Имя обязательное поле') }),
  otherPersonLastName: Yup.string()
    .nullable()
    .when('isOtherPerson', { is: true, then: (schema) => schema.required('Фамилия обязательное поле') }),
  otherPersonPhoneNumber: Yup.string()
    .nullable()
    .when('isOtherPerson', {
      is: true,
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, 'Номер должен содержать только цифры')
          .min(10, digitsLimitMessage)
          .max(10, digitsLimitMessage)
          .required('Номер телефона обязательное поле'),
    }),
})
