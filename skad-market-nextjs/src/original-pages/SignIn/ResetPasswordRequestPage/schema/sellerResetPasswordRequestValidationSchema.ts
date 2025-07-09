import * as Yup from 'yup'
import { ISellerSignIn } from '@/interfaces'

export const sellerResetPasswordRequestValidationSchema: Yup.ObjectSchema<Omit<ISellerSignIn, 'password'>> = Yup.object({
  email: Yup.string().email('Неверный формат Email').required('Email обязательное поле'),
})
