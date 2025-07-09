import { ChangeEvent, LegacyRef, forwardRef } from 'react'
import { useField } from 'formik'
import { TextInput, TextInputProps } from '@/shared/ui/TextInput/TextInput'

interface IFormikTextInput extends Omit<TextInputProps, 'value' | 'type' | 'onChange'> {
  name: string
  value?: string
  onChange: (event: ChangeEvent<HTMLInputElement>, i: number) => void
  index: number
  codeError?: boolean
}

export const AuthorizationCodeInput = forwardRef<HTMLInputElement, IFormikTextInput>(
  ({ name, onChange, index, codeError = false, ...rest }, ref: LegacyRef<HTMLInputElement> | undefined) => {
    const [{ value }, { error, touched }, { setValue }] = useField(name)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()
      const value = e.target.value
      if (value && !isNaN(Number(value))) {
        setValue(value.substring(value.length - 1))
        onChange(e, index)
      }
    }

    const onClick = () => {
      setValue('')
    }

    return (
      <TextInput
        {...rest}
        ref={ref}
        name={name}
        value={value}
        onChange={onInputChange}
        onClick={onClick}
        autoComplete='off'
        hasError={codeError || (!!error && touched && value)}
      />
    )
  },
)

AuthorizationCodeInput.displayName = 'AuthorizationCodeInput'
