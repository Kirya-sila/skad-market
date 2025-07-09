import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { TextInput } from '@shared/ui'
import { TextInputProps } from '@shared/ui/TextInput/TextInput'
import { useInput } from '@shared/libs/hooks/useInput'

export const TextInputStory = () => {
  const Template = (props: Partial<TextInputProps>) => {
    const [text, setText] = useInput()
    return <TextInput type="text" onChange={setText} value={text} {...props} />
  }
  return (
    <Section>
      <Title>TEXT INPUT</Title>
      {/*PRIMARY*/}
      <Row>
        <Template />
        <Template label="Какой-то лейбл" />
        <Template label="disabled" disabled value="Disabled text" />
        <Template label="required" required />
        <Template label="Обязательное поле" required errorMessage="Error message" value="Ошибка" />
        <Template type="password" label="Пароль" required />
      </Row>
    </Section>
  )
}
