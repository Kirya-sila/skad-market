import { FC } from 'react'
import { Form, Formik } from 'formik'
import css from './LegalForm.module.scss'
import { Buyer } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { ILegal } from '@/interfaces/order'
import { FlexColumn, FormikTextInput } from '@/shared/ui'

interface ILegalForm {
  submitForm: (values: { [Buyer.Legal]: ILegal }) => void
}

export const LegalForm: FC<ILegalForm> = ({ submitForm }) => {
  const { buyerInfo } = orderStore
  const initialValues: ILegal = {
    ...buyerInfo.legal,
  }
  return (
    <Formik initialValues={initialValues} onSubmit={(values: ILegal) => submitForm({ [Buyer.Legal]: values })}>
      {({ handleChange }) => (
        <Form
          onChange={handleChange}
          id='buyer-submit'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <FlexColumn classname={css.form}>
            <FormikTextInput required name='inn' label='ИНН/ОГРН' />
            <div className={css.formFieldsContainer}>
              <FormikTextInput name='companyName' label='Название компании' />
              <FormikTextInput required name='kpp' label='КПП' />
              <FormikTextInput required name='bic' label='БИК' />
              <FormikTextInput required name='bankName' label='Название банка' />
              <FormikTextInput required name='account' label='Расчетный счет' />
              <FormikTextInput required name='correspondedAccount' label='Кореспондентский счет' />
            </div>
            <FormikTextInput required name='legalAddress' label='Юридический адрес' />
            <FormikTextInput required name='address' label='Фактический адрес' />
            <span className={css.h2}>Данные получателя</span>
            <div className={css.formFieldsContainer}>
              <FormikTextInput required name='firstName' label='Имя' />
              <FormikTextInput required name='lastName' label='Фамилия' />
              <FormikTextInput required name='phone' label='Телефон' />
            </div>
          </FlexColumn>
        </Form>
      )}
    </Formik>
  )
}
