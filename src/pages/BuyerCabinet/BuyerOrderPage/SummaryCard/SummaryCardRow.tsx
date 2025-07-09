import { FC, ReactNode } from 'react'
import { Flex } from 'antd'
import { SectionTitle } from '@/shared/ui'
import { primaryBlack, primaryDarkestGray } from '@/theme'

interface ISummaryCardRow {
  title: ReactNode
  summ: number | null
  summColor?: string
}

export const SummaryCardRow: FC<ISummaryCardRow> = ({ title, summ, summColor = primaryBlack }) => {
  return (
    <Flex justify='space-between'>
      <SectionTitle style={{ color: primaryDarkestGray, lineHeight: '20px' }}>{title}</SectionTitle>
      <SectionTitle style={{ color: summColor, lineHeight: '20px', textWrap: 'nowrap' }}>
        {summ ? summ.toLocaleString() : 0} ₽{' '}
      </SectionTitle>
    </Flex>
  )
}
