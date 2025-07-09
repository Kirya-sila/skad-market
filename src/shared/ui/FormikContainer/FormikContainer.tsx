import { ReactElement } from 'react'
import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import * as Yup from 'yup'

interface IFormikContainer<T> extends FormikConfig<T> {
  children: ReactElement
  initialValues: T
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>
  id?: string
}

export const FormikContainer = <T extends FormikValues>({
  id = 'formikForm',
  initialValues,
  validationSchema,
  onSubmit,
  children,
  ...rest
}: IFormikContainer<T>) => {
  return (
    <Formik
      {...rest}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange }) => (
        <Form
          id={id}
          onChange={handleChange}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {children}
        </Form>
      )}
    </Formik>
  )
}
