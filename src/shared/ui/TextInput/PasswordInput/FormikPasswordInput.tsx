import { ChangeEvent, FC, useMemo } from 'react'
import { useField } from 'formik'
import { PasswordInput, PasswordInputProps } from './PasswordInput'

interface IFormikPasswordInput extends Omit<PasswordInputProps, 'value' | 'type' | 'onChange'> {
  name: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  serverError?: string
}

export const FormikPasswordInput: FC<IFormikPasswordInput> = ({ name, serverError, ...rest }) => {
  const [{ value }, { error, touched }] = useField(name)

  const errorText = useMemo(() => error ?? serverError, [error, serverError])

  return <PasswordInput {...rest} name={name} value={value} errorMessage={touched && errorText ? errorText : ''} />
}
