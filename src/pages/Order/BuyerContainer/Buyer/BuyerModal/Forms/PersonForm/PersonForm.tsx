import { FC } from 'react'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import css from './PersonForm.module.scss'
import { personFormValidationSchema } from './schema'
import { Buyer } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { IBuyerContactInfo } from '@/interfaces/order'
import { CheckboxListItem, FlexColumn, FormikTextInput, RusPhonePrefix } from '@/shared/ui'

interface IPersonForm {
  submitForm: (values: { [Buyer.Person]: IBuyerContactInfo }) => void
}

export const PersonForm: FC<IPersonForm> = observer(({ submitForm }) => {
  const { buyerInfo } = orderStore

  const initialValues: IBuyerContactInfo = {
    ...buyerInfo.person,
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={personFormValidationSchema}
      onSubmit={(values: IBuyerContactInfo) => submitForm({ [Buyer.Person]: values })}
    >
      {({ handleChange, values, setFieldValue }) => (
        <Form
          onChange={handleChange}
          id='buyer-submit'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <FlexColumn classname={css.form}>
            <div className={css.formFieldsContainer}>
              <FormikTextInput required name='firstName' label='Имя' />
              <FormikTextInput required name='lastName' label='Фамилия' />
              <FormikTextInput required name='phoneNumber' label='Телефон' prefix={<RusPhonePrefix />} disabled />
              <FormikTextInput name='email' label='E-mail' />
            </div>
            <CheckboxListItem
              label='Будет получать другой человек'
              disabled={false}
              checked={values.isOtherPerson}
              onCheck={(e) => {
                setFieldValue('isOtherPerson', e.target.checked)
                setFieldValue('otherPersonFirstName', '')
                setFieldValue('otherPersonLastName', '')
                setFieldValue('otherPersonPhoneNumber', '')
              }}
            />
            {values.isOtherPerson && (
              <div className={css.formFieldsContainer}>
                <FormikTextInput required name='otherPersonFirstName' label='Имя' />
                <FormikTextInput required name='otherPersonLastName' label='Фамилия' />
                <FormikTextInput required name='otherPersonPhoneNumber' label='Телефон' prefix={<RusPhonePrefix />} />
              </div>
            )}
          </FlexColumn>
        </Form>
      )}
    </Formik>
  )
})
