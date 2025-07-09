import * as Yup from 'yup'
import { passwordRegex } from '@/constants'
import { ISellerResetPassword } from '@/interfaces'

const passNotConfirmed = 'Пароль не соответсвует требованиям'
const maxLengthMessage = 'Длина пароля не должна превышать 128 символов'

export const sellerResetPasswordValidationSchema: Yup.ObjectSchema<ISellerResetPassword> = Yup.object({
  password: Yup.string()
    .trim()
    .label('Пароль')
    .max(128, maxLengthMessage)
    .matches(passwordRegex, passNotConfirmed)
    .required('"Пароль" обязательное поле'),
  passwordConfirmation: Yup.string()
    .trim()
    .label('Повторите новый пароль')
    .max(128, maxLengthMessage)
    .matches(passwordRegex, passNotConfirmed)
    .required('"Повторите новый пароль" обязательное поле')
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
