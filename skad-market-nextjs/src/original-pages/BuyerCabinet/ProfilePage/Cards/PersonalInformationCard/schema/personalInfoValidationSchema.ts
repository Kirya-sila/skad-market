import * as Yup from 'yup'
import { IBuyerProfileInfo } from '@/interfaces'

export const personalInfoValidationSchema: Yup.ObjectSchema<IBuyerProfileInfo> = Yup.object({
  firstName: Yup.string().label('Имя'),
  lastName: Yup.string().label('Фамилия'),
  email: Yup.string().email().label('E-mail'),
}).noUnknown(false) as Yup.ObjectSchema<IBuyerProfileInfo>
