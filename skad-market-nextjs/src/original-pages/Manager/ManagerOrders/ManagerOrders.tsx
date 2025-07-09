import { useEffect } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import { Flex, Select, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { ManagerPageWrapper } from '../ManagerPageWrapper'
import styles from './ManagerOrders.module.scss'
import { OrdersTable } from './OrdersTable'
import { findKeyByFilterName } from '@/entities/Seller/lib/findKeyByFilterName'
import { getDateRange } from '@/entities/Seller/lib/getDateRange'
import { sellerStore } from '@/entities/Seller/model/sellerStore'
import { ChunkSizeType, ExpandedOrderEnum, ISellerOrdersFilters } from '@/entities/Seller/model/types'
import { FilterTab } from '@/widgets/filters'

// interface SellerOrdersProps {

// }

export const ManagerOrders = observer(() => {
  const {
    getSellerOrders,
    getSellerFilters,
    orders,
    isLoading,
    setChunkSize,
    chunkSize,
    internalNumber,
    setInternalNumber,
    setDateStartRange,
    setDateEndRange,
    creationDateStartRange,
    creationDateEndRange,
    selectedOrderIds,
    selectedFilters,
    clearAllSelectedFilters,
    clearOneSelectedFilter,
  } = sellerStore

  useEffect(() => {
    getSellerOrders()
    getSellerFilters()
  }, [])

  const handleChange = (value: string) => {
    setChunkSize(+value as ChunkSizeType)
  }

  const onApply = (date: string | null, time: number[]) => {
    const dateData = getDateRange(date, time)
    const start = dateData && dateData.dateStart ? dateData.dateStart : ''
    const end = dateData && dateData.dateEnd ? dateData.dateEnd : ''

    setDateStartRange(start)
    setDateEndRange(end)

    getSellerOrders()
  }

  useEffect(() => {
    getSellerOrders()
  }, [chunkSize])

  return (
    <ManagerPageWrapper title='Заказы'>
      <div className={styles.sellerOrdersWrapper}>
        <div className={styles.headerLine}>
          <Flex gap={24} align='center'>
            {/* <div>
              <CustomDateTimeRangePicker
                onApply={onApply}
                defaultDate={creationDateEndRange ? moment(creationDateEndRange).format('DD.MM.YYYY') : null}
                defaultTimeRangeStart={creationDateStartRange ? moment(creationDateStartRange).format('HH') : '8'}
                defaultTimeRangeEnd={creationDateEndRange ? moment(creationDateEndRange).format('HH') : '18'}
              />
            </div> */}
            {/* <div className={classNames(styles.inputButtonWrapper)}>
              <div className={classNames(styles.inputButton, { [styles.hasValue]: internalNumber })}>
                <span className={classNames({ [styles.littleText]: internalNumber, [styles.hide]: !internalNumber })}>
                  Поиск по номеру
                </span>
                <input
                  className={styles.input}
                  type='text'
                  placeholder='Поиск по номеру'
                  onChange={(e) => setInternalNumber(e.target.value)}
                  value={internalNumber}
                />
              </div>
              {internalNumber && (
                <div
                  onClick={() => {
                    setInternalNumber('')
                  }}
                  className={styles.inputIcon}
                >
                  <CloseIcon />
                </div>
              )}
              <div className={styles.inputIcon} onClick={() => getSellerOrders()}>
                <SearchOutlined />
              </div>
            </div> */}
            {!!selectedOrderIds.length && (
              <>
                <div className={styles.orderAction}>Взять в работу</div>
                <div className={styles.orderAction}>Задать статус</div>
                <div className={styles.orderAction}>Печать бланка заказа</div>
                <div className={styles.orderAction}>Отменить заказ</div>
              </>
            )}
          </Flex>
          <div className={styles.actionButtons}>
            <Flex gap={8}>
              <div>Скачать Excel</div>
              <DownloadOutlined />{' '}
            </Flex>
            <Flex gap={12}>
              <Space wrap>
                Показать
                <Select
                  defaultValue={chunkSize.toString()}
                  className={styles.select}
                  style={{ background: 'white' }}
                  onChange={handleChange}
                  options={[
                    { value: '20', label: '20' },
                    { value: '50', label: '50' },
                    { value: '100', label: '100' },
                  ]}
                />
              </Space>
            </Flex>
          </div>
        </div>
        {!!Object.keys(selectedFilters).length && (
          <div className={styles.filterTabs}>
            {Object.keys(selectedFilters).map((item) => {
              const keyName = findKeyByFilterName(item as keyof ISellerOrdersFilters)
              const nameRu = keyName ? ExpandedOrderEnum[keyName as keyof typeof ExpandedOrderEnum] : ''

              const values = selectedFilters[item as keyof ISellerOrdersFilters] || []
              return (
                <FilterTab
                  key={item}
                  nameRu={nameRu}
                  values={values}
                  onCloseOne={() => {
                    clearOneSelectedFilter(item as keyof ISellerOrdersFilters)
                    getSellerOrders()
                  }}
                />
              )
            })}
            <p
              onClick={() => {
                clearAllSelectedFilters()
                getSellerOrders()
              }}
            >
              Очистить все фильтры
            </p>
          </div>
        )}
        <div>
          <OrdersTable orders={orders} loading={isLoading} />
        </div>
      </div>
    </ManagerPageWrapper>
  )
})
