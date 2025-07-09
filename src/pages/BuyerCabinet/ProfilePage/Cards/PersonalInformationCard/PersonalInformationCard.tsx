import { Flex } from 'antd'
import { PersonalInformation } from './PersonalInformation'
import { PhoneSection } from './PhoneSection'
import { Card } from '@/pages'

// interface IPersonalInformationCard {}

export const PersonalInformationCard = () => {
  return (
    <Card title='Личная информация'>
      <Flex vertical gap={24}>
        <PhoneSection />
        <PersonalInformation />
      </Flex>
    </Card>
  )
}
