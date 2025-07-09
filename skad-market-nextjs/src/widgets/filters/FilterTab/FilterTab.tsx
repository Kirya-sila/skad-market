import { FC } from 'react'
import styles from './FilterTab.module.scss'
import { CloseOutlined } from '@ant-design/icons'

interface FilterTabProps {
  nameRu: string
  values: (string | number)[]
  onCloseOne?: () => void
}

export const FilterTab: FC<FilterTabProps> = ({ nameRu, values = [], onCloseOne }) => {
  return (
    <div className={styles.tabWrapper}>
      <div className={styles.tabName}>{nameRu}:</div>
      {values.map((i, index, arr) => (
        <span className={styles.tabValue} key={nameRu + i}>
          {i}
          {index !== arr.length - 1 ? ',' : ''}
        </span>
      ))}
      <div className={styles.tabClose} onClick={onCloseOne && onCloseOne}>
        <CloseOutlined />
      </div>
    </div>
  )
}
