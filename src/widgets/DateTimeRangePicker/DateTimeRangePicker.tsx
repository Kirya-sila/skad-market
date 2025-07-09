import { FC, useEffect, useState } from 'react'
import { CalendarOutlined } from '@ant-design/icons'
import { DatePicker, Slider } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import styles from './DateTimeRangePicker.module.scss'
import { time } from 'node:console'
import { NullLiteralTypeAnnotation } from '@babel/types'
interface CustomDateTimeRangePickerProps {
  onApply: (date: string | null, time: number[]) => void
  defaultDate?: string | null
  defaultTimeRangeStart?: string
  defaultTimeRangeEnd?: string
}

export const CustomDateTimeRangePicker: FC<CustomDateTimeRangePickerProps> = ({
  onApply,
  defaultDate,
  defaultTimeRangeStart,
  defaultTimeRangeEnd,
}) => {
  const [date, setDate] = useState<Dayjs | null>(null)
  const [timeRange, setTimeRange] = useState<number[]>([8, 18])

  useEffect(() => {
    setDate(defaultDate ? dayjs(defaultDate, 'DD.MM.YYYY') : null)

    if (defaultTimeRangeEnd && defaultTimeRangeStart) {
      setTimeRange([+defaultTimeRangeStart, +defaultTimeRangeEnd])
    }
  }, [defaultDate, defaultTimeRangeEnd, defaultTimeRangeStart])

  const handleDateChange = (value: Dayjs | null) => {
    setDate(value)
    onApply(value?.toISOString() || null, timeRange)
  }
  const handleTimeChange = (value: number[]) => {
    setTimeRange(value)
    // onApply
  }
  const handleApply = (value: Dayjs | null) => {
    onApply(date?.toISOString() || null, timeRange)
  }

  return (
    <div className={styles.datepickerWrapper}>
      {date && <span className={styles.timeSpan}>{`${timeRange[0]}:00 - ${timeRange[1]}:00`}</span>}
      <DatePicker
        value={date}
        locale={locale}
        onChange={handleDateChange}
        className={styles.datePickerMain}
        format={'DD.MM.YYYY'}
        placeholder={'Дата и время создания'}
        suffixIcon={<CalendarOutlined />}
        needConfirm={true}
        onOk={() => handleApply(date)}
        popupClassName={styles.datepickerPopup}
        showNow={false}
        renderExtraFooter={() => (
          <div className={styles.footerContainer}>
            <h4>Время</h4>
            <div className={styles.sliderContainer}>
              <div className={styles.timeLabels}>
                <input type='text' value={`с ${timeRange[0]}:00:00`} disabled={true} />
                <input type='text' value={`до ${timeRange[1]}:00:00`} disabled={true} />
              </div>
              <Slider range min={0} max={23} step={1} value={timeRange} onChange={handleTimeChange} />
            </div>
          </div>
        )}
      />
    </div>
  )
}
