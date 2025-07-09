import { useCallback, useState } from 'react'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import css from './PhoneNumberFormWithCaptcha.module.scss'
import { phoneNumberFormValidationSchema } from './schema'
import { authorizationStore } from '@/features/authorization'
import { IPhoneNumberForm } from '@/interfaces'
import { Flex, FormikTextInput, RegularButton, RusPhonePrefix } from '@/shared/ui'
import { Captcha } from '@/widgets'

const enableCaptcha = true; // import.meta.env.PROD

export const PhoneNumberFormWithCaptcha = observer(() => {
  const { sendUserPhone, phoneNumberError } = authorizationStore
  const initialValues: IPhoneNumberForm = {
    skadmarketPhoneNumber: '',
  }
  const [formValues, setFormValues] = useState<IPhoneNumberForm>(initialValues)
  const [visible, setVisible] = useState(false)

  const handleChallengeHidden = useCallback(() => {
    setVisible(false)
  }, [])

  const onSuccess = (captchaToken: string) => {
    sendUserPhone({ phoneNumber: formValues.skadmarketPhoneNumber, captchaToken })
  }

  const handleSubmit = (values: IPhoneNumberForm) => {
    if (enableCaptcha) {
      setVisible(true)
      setFormValues(values)
    } else {
      sendUserPhone({ phoneNumber: values.skadmarketPhoneNumber, captchaToken: '' })
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={phoneNumberFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form
            onChange={handleChange}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <FormikTextInput required name='skadmarketPhoneNumber' label='Номер телефона' prefix={<RusPhonePrefix />} />
            {!!phoneNumberError && (
              <Flex classname={css.errorMessage}>
                <span>{phoneNumberError}</span>
              </Flex>
            )}
            <RegularButton className={css.submit} type='submit' text='Получить код в СМС' />
          </Form>
        )}
      </Formik>
      {enableCaptcha && <Captcha onSuccess={onSuccess} onChallengeHidden={handleChallengeHidden} visible={visible} />}
    </>
  )
})
