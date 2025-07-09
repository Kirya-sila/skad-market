import * as Yup from 'yup'
import { IDeliveryAddress } from '@/interfaces'

export const deliveryAddressValidationShema: Yup.ObjectSchema<IDeliveryAddress> = Yup.object({
  flatNumber: Yup.string().required('Введите номер квартиры'),
  entrance: Yup.string().matches(/^[0-9]+$/, 'Подъезд должен быть числом'),
  floor: Yup.string().matches(/^[0-9]+$/, 'Этаж должен быть числом'),
  cityName: Yup.string(),
})
