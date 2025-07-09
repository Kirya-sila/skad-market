import { IBuyerContactInfo, IBuyerOtherPersonContactInfo, ILegal } from '@/interfaces'

export const otherPersonInitialValues: IBuyerOtherPersonContactInfo = {
  otherPersonFirstName: '',
  otherPersonLastName: '',
  otherPersonPhoneNumber: '',
}

export const personInitialValues: IBuyerContactInfo = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  isOtherPerson: false,
  orderId: '',
  ...otherPersonInitialValues,
}

export const legalInitialValues: ILegal = {
  companyName: '',
  kpp: '',
  bic: '',
  bankName: '',
  account: '',
  correspondedAccount: '',
  legalAddress: '',
  address: '',
  firstName: '',
  lastName: '',
  phone: '',
}
