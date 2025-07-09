import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { TrackNumberIcon } from '@/assets/icons'

interface ITrackNumber {
  trackNumber: number | string | null
}

const { Text } = Typography

export const TrackNumber: FC<ITrackNumber> = ({ trackNumber }) => {
  return (
    <Flex align='flex-start' gap={4} style={{ whiteSpace: 'nowrap' }}>
      <Text style={{ fontSize: 12 }}>Трек номер: {trackNumber}</Text>
      <TrackNumberIcon />
    </Flex>
  )
}
