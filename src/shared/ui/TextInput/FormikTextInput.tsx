import { ChangeEvent, FC, useMemo } from 'react'
import { useField } from 'formik'
import { TextInput, TextInputProps } from './TextInput'

interface IFormikTextInput extends Omit<TextInputProps, 'value' | 'type' | 'onChange'> {
  name: string
  value?: string
  type?: 'text' | 'email' | 'password'
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  serverError?: string
}

export const FormikTextInput: FC<IFormikTextInput> = ({ name, type = 'text', onChange, serverError, ...rest }) => {
  const [{ value }, { error, touched }, { setValue }] = useField(name)

  // const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value)
  // }

  const errorText = useMemo(() => error ?? serverError, [error, serverError])

  return (
    <TextInput
      {...rest}
      name={name}
      value={value}
      type={type}
      errorMessage={touched && errorText ? errorText : ''}
      onChange={(e) => {
        if (onChange) {
          onChange(e)
        }
        // onInputChange(e)
      }}
    />
  )
}
