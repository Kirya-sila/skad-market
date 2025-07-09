import * as Yup from 'yup'
import { ISellerSignIn } from '@/interfaces'

export const sellerSignInValidationSchema: Yup.ObjectSchema<ISellerSignIn> = Yup.object({
  email: Yup.string().email('Неверный формат Email').required('Email обязательное поле'),
  password: Yup.string().required('Пароль обязательное поле'),
})
