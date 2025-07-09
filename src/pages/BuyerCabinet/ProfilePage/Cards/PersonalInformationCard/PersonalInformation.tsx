import { useEffect } from 'react'
import { Button, Col, Flex, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { personalInfoValidationSchema } from './schema'
import { buyerCabinetStore } from '@/features/buyer'
import { IBuyerProfileInfo } from '@/interfaces'
import { FormikContainer, FormikTextInput, LoadingOverlay } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

// interface IPersonalInformation {}

export const PersonalInformation = observer(() => {
  const { buyerPersonalInfo, profileInfoLoading: getProfileLoading, updateProfile } = buyerCabinetStore


  const onSubmit = (values: IBuyerProfileInfo) => {
    updateProfile(values)
    console.log('buyer info: ', JSON.parse(JSON.stringify(values)))
  }
  if (getProfileLoading) {
    return (
      <Flex style={{ alignItems: 'center' }}>
        <Spinner />
      </Flex>
    )
  }

  return (
    <FormikContainer
      initialValues={buyerPersonalInfo}
      validationSchema={personalInfoValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Flex vertical gap={24}>
        <Row gutter={[16, 16]} style={{ alignContent: 'flex-start' }}>
          <Col md={12} sm={24}>
            <FormikTextInput name='firstName' label='Имя' />
          </Col>
          <Col md={12} sm={24}>
            <FormikTextInput name='lastName' label='Фамилия' />
          </Col>
          <Col md={24} sm={24}>
            <FormikTextInput name='email' label='E-mail' />
          </Col>
        </Row>
        <Row gutter={[0, 16]}>
          <Col span={24} lg={12}>
            <Button htmlType='submit' type='primary' size='large' style={{ width: '100%' }}>
              Сохранить изменения
            </Button>
          </Col>
        </Row>
      </Flex>
    </FormikContainer>
  )
})
