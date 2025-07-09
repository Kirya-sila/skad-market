import { ChangeEvent, useEffect, useRef } from 'react'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useMatch, useNavigate } from 'react-router-dom'
import { AuthorizationCodeInput } from './AuthorizationCodeInput'
import { AutoSubmitForm } from './AutoSubmitForm'
import css from './SmsNumberForm.module.scss'
import { authorizationValidationSchema } from './schema'
import { appRoutes } from '@/app-settings'
import { authorizationStore } from '@/features/authorization'
import { cartStore } from '@/features/cart'
import { orderStore } from '@/features/order/model/orderStore'
import { Flex } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

export interface IPhoneNumberForm {
  num1: string
  num2: string
  num3: string
  num4: string
}

export const SmsNumberForm = observer(() => {
  const isCartPage = useMatch(appRoutes.cart)
  const navigate = useNavigate()
  const { smsCodeVerification, isSmsCodeValid, loginByuer, isLoginBuyerLoading } = authorizationStore
  
  const { initOrder } = orderStore
  const { checkedItems } = cartStore

  const inputs = new Array(4)
  const inputRefs = useRef(inputs)
  const initialValues: IPhoneNumberForm = {
    num1: '',
    num2: '',
    num3: '',
    num4: '',
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    if (i < inputs.length - 1) {
      inputRefs.current[i + 1]?.focus()
    } else {
      inputRefs.current[i]?.blur()
    }
  }

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleSubmit = async (values: IPhoneNumberForm) => {
    const result = await smsCodeVerification(values.num1 + values.num2 + values.num3 + values.num4)
    if (result) {
      const loginResult = await loginByuer()
      if (loginResult) {
        if (isCartPage) {
          initOrder(checkedItems)
        } else {
          navigate(appRoutes.buyer.root)
        }
      }
    }
  }

  if (isLoginBuyerLoading) {
    return <Spinner />
  }


  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={authorizationValidationSchema}
    >
      {({ handleChange }) => {
        return (
          <Form
            onChange={handleChange}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Flex classname={css.number}>
              <AuthorizationCodeInput
                required
                name='num1'
                ref={(element) => (inputRefs.current[0] = element)}
                onChange={onChange}
                index={0}
                // codeError={!isSmsCodeValid}
              />
              <AuthorizationCodeInput
                required
                name='num2'
                ref={(element) => (inputRefs.current[1] = element)}
                onChange={onChange}
                index={1}
                // codeError={!isSmsCodeValid}
              />
              <AuthorizationCodeInput
                required
                name='num3'
                ref={(element) => (inputRefs.current[2] = element)}
                onChange={onChange}
                index={2}
                // codeError={!isSmsCodeValid}
              />
              <AuthorizationCodeInput
                required
                name='num4'
                ref={(element) => (inputRefs.current[3] = element)}
                onChange={onChange}
                index={3}
                // codeError={!isSmsCodeValid}
              />
            </Flex>

            <AutoSubmitForm />

            {!isSmsCodeValid && (
              <Flex classname={css.errorMessage}>
                <span>Неверный код</span>
              </Flex>
            )}
          </Form>
        )
      }}
    </Formik>
  )
})
