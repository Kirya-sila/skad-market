import { IOrderChangesHistory } from '@/interfaces'
import { Flex } from 'antd'
import moment from 'moment'

export const columns = [
  {
    title: 'Дата и время изменений',
    dataIndex: 'createdAt',
    render: (value: string) => {
      return (
        <Flex>{moment(value).format('DD.MM.YYYY, HH:mm')}</Flex>
      )
    },
  },
  {
    title: 'Пользователь',
    dataIndex: 'userFullName',
  },
  {
    title: 'Тип операции',
    dataIndex: 'operationType',
  },
  {
    title: 'Описание',
    dataIndex: 'description',
  },
]

export const mockData: IOrderChangesHistory[] = [
  {
    createdAt: '12.02.24 18:45',
    userFullName: 'Стас Полков',
    operationType: 'Изменение стоимости',
    description: 'Some description',
  },
  {
    createdAt: '12.02.24 18:45',
    userFullName: 'Стас Полков',
    operationType: 'Изменение стоимости',
    description: 'Some description',
  },
  {
    createdAt: '12.02.24 18:45',
    userFullName: 'Стас Полков',
    operationType: 'Изменение стоимости',
    description: 'Some description',
  },
]
