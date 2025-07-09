import { FC, ReactNode } from 'react'
import { Collapse, Flex, Typography } from 'antd'
import styled from 'styled-components'
import { primaryLightestGray } from '@/theme'

interface IAdditionalInfoCardProps {
  title: string
  mainContent: ReactNode
}

const StyledCollapse = styled(Collapse)({
  '&.ant-collapse': {
    width: '100%',
  },
  '&.ant-collapse>.ant-collapse-item >.ant-collapse-header': {
    alignItems: 'center',
    width: '100%',
  },
})

export const AdditionalInfoCard: FC<IAdditionalInfoCardProps> = ({ title, mainContent }) => {
  return (
    <Flex style={{ backgroundColor: primaryLightestGray, width: 368, padding: '0 4px', borderRadius: 20 }}>
      <StyledCollapse
        collapsible='header'
        expandIconPosition='end'
        defaultActiveKey={['1']}
        ghost
        items={[
          {
            key: '1',
            label: (
              <Typography.Title level={5} style={{ marginTop: 0 }}>
                {title}
              </Typography.Title>
            ),
            children: <Flex>{mainContent}</Flex>,
          },
        ]}
      />
    </Flex>
  )
}
