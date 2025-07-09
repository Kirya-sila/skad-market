import { FC } from 'react'
import { Popover, Typography } from 'antd'
import { GoodsStatus as GoodsStatusEnum } from '@/constants'
import { primaryBlack, primaryGreen, primaryOrange } from '@/theme'

const { Text } = Typography

export const GoodsStatus: FC<{ status: GoodsStatusEnum }> = ({ status }) => {
  if (status === GoodsStatusEnum.notAvailable) {
    return (
      <Popover content='Нет в наличии'>
        <div
          style={{
            width: 10,
            height: 2,
            backgroundColor: primaryBlack,
          }}
        />
      </Popover>
    )
  }

  return (
    <Popover
      content={
        status === GoodsStatusEnum.available ? (
          <Text style={{ color: primaryGreen }}>В продаже</Text>
        ) : (
          'Снят с производства'
        )
      }
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: status === GoodsStatusEnum.available ? primaryGreen : primaryOrange,
        }}
      />
    </Popover>
  )
}
