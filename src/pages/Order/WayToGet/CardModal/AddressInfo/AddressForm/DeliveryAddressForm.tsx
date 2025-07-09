import { FC } from 'react'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import css from './DeliveryAddressForm.module.scss'
import { deliveryAddressValidationShema } from './schema'
import { orderStore } from '@/features/order/model/orderStore'
import { IDeliveryAddress } from '@/interfaces'
import { FlexRow, FormikTextInput } from '@/shared/ui'

interface IDeliveryAddressForm {
  handleSubmit: (values: IDeliveryAddress) => void
}

export const DeliveryAddressForm: FC<IDeliveryAddressForm> = observer(({ handleSubmit }) => {
  const { deliveryUserAddress: clientAddress } = orderStore

  const initialValues: IDeliveryAddress = {
    ...clientAddress,
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={deliveryAddressValidationShema}
      onSubmit={handleSubmit}
    >
      {({ handleChange }) => (
        <Form
          onChange={handleChange}
          id='delivery-address-form'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <FlexRow classname={css.form}>
            <FormikTextInput name='flatNumber' label='Квартира' required />
            <FormikTextInput name='entrance' label='Подъезд' />
            <FormikTextInput name='floor' label='Этаж' />
          </FlexRow>
        </Form>
      )}
    </Formik>
  )
})
