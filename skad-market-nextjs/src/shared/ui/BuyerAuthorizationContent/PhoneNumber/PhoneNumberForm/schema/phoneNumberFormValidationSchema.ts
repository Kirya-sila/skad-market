import * as Yup from 'yup'
import { IPhoneNumberForm } from '@/interfaces'

export const phoneNumberFormValidationSchema: Yup.ObjectSchema<IPhoneNumberForm> = Yup.object({
  skadmarketPhoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Номер должен содержать только цифры')
    .min(10, 'Номер должен состоять из 11 цифр')
    .max(10, 'Номер должен состоять из 11 цифр')
    .required('Номер телефона обязательное поле'),
})
