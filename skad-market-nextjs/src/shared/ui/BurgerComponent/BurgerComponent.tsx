import { SectionTitle } from '@/shared/ui'
import { Flex, Popover, Switch } from 'antd'
import React, { FC } from 'react'
import { primaryDarkestGray } from '@/theme'
import { BurgerButton } from './BurgerButton'
import { ColumnType } from 'antd/es/table'

interface IBurgerComponent<T extends string, K extends Object> {
  visibleColumns: T[]
  handleColumn: (value: T) => void
  baseColumnsSettings: Record<T, ColumnType<K>>
}

export const BurgerComponent = <T extends string, K extends Object>({
  visibleColumns,
  handleColumn,
  baseColumnsSettings,
}: IBurgerComponent<T, K>) => {
  const onChange = (
    checked: boolean,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    const id = event.currentTarget.id
    handleColumn(id as T)
  }

  const popoverContent = (visibleColumns: T[]) => {
    return (
      <Flex vertical gap={8} style={{ marginTop: 24, paddingRight: 16, overflowY: 'auto', maxHeight: 390 }}>
        {(Object.values(baseColumnsSettings) as ColumnType<K>[]).map((item) => (
          <Flex key={item.key} gap={16} align='center' justify='space-between'>
            <SectionTitle style={{ color: primaryDarkestGray }}>{item.title as string}</SectionTitle>
            <Switch id={String(item.key)} onChange={onChange} checked={visibleColumns.includes(item.key as T)} />
          </Flex>
        ))}
      </Flex>
    )
  }

  return (
    <Flex>
      <Popover content={popoverContent(visibleColumns)} title='Видимость столбцов' trigger='click'>
        <BurgerButton />
      </Popover>
    </Flex>
  )
}
