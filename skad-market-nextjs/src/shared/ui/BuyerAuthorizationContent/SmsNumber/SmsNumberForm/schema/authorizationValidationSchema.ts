import * as Yup from 'yup'

export const authorizationValidationSchema = Yup.object({
  num1: Yup.number().required(),
  num2: Yup.number().required(),
  num3: Yup.number().required(),
  num4: Yup.number().required(),
})
