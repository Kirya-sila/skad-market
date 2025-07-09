import { useEffect } from 'react'
import { useFormikContext } from 'formik'

export const AutoSubmitForm = () => {
  const formikContext = useFormikContext()

  useEffect(() => {
    if (formikContext.isValid && formikContext.dirty) {
      formikContext.submitForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikContext.isValid, formikContext.dirty, formikContext.values])

  return null
}
