import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { BreadcrumbsItem, BreadcrumbsLine } from '@shared/ui/Breadcrumbs'

export const BreadcrumbsStory = () => {
  return (
    <Section>
      <Title>BREADCRUMBS</Title>
      {/*PRIMARY*/}
      <Row>
        <BreadcrumbsItem label="MainPage" onClick={() => alert('MainPage')} />
        <BreadcrumbsItem label="MainPage" onClick={() => alert('MainPage')} disabled />
      </Row>

      <Row>
        <BreadcrumbsLine
          items={[
            { label: 'First page', onClick: () => alert('First page') },
            {
              onClick: () => alert('Second page'),
              label: 'Second page',
              disabled: true,
            },
          ]}
        />
      </Row>
      <Row>
        <BreadcrumbsLine
          items={[
            { label: 'Главная', onClick: () => alert('Главная') },
            { label: 'Каталог', onClick: () => alert('Каталог') },
            { label: 'Диски', onClick: () => alert('Диски') },
            {
              onClick: () => alert('Популярное'),
              label: 'Популярное',
              disabled: true,
            },
          ]}
        />
      </Row>
    </Section>
  )
}
