import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { SocialMediaButton } from '@shared/ui/SocialMediaButton'

export const SocialMediaButtonStory = () => (
  <Section>
    <Title>SOCIAL MEDIA BUTTON</Title>
    {/*PRIMARY*/}
    <Row>
      <SocialMediaButton icon="tg" />
      <SocialMediaButton icon="vk" />
      <SocialMediaButton icon="ok" />
      <SocialMediaButton icon="d2" />
    </Row>
  </Section>
)
