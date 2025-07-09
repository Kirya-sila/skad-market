import React from 'react'
import cn from 'classnames'
import css from './Pagination.module.scss'
import { getPaginationElements, validateCurrentPage, validateSiblingCount } from './utils'
import { PaginationButton } from '@shared/ui/PaginationButton'
import { RegularButton } from '@shared/ui'
import { ICArrowLeftLine, ICArrowRightLine } from './assets'

export interface PaginationProps {
  className?: string
  onChange: (page: number) => void
  currentPage: number
  /**
   * Общее количество страниц
   * @default 1
   */
  total: number
  /**
   * Количество страниц, отображаемых слева и справа от текущей
   * @default 3
   */
  siblingCount?: number
}

export const Pagination = ({
  onChange,
  currentPage = 1,
  siblingCount = 3,
  total = 1,
  className,
  ...otherProps
}: PaginationProps) => {
  const validatedCurrentPage = validateCurrentPage(currentPage, total)
  const validatedSiblingCount = validateSiblingCount(siblingCount)
  const paginationElements = getPaginationElements({
    total,
    currentPage: validatedCurrentPage,
    siblingCount: validatedSiblingCount,
  })

  if (total <= 1) return null

  const handleClickStart = () => {
    onChange(1)
  }

  const handleClickNext = () => {
    onChange(validatedCurrentPage + 1)
  }

  const handleChangePage = (page: number) => () => {
    onChange(page)
  }

  return (
    <nav className={cn(css.pagination, className)} {...otherProps}>
      {paginationElements.map((paginationElement) => {
        switch (paginationElement.type) {
          case 'startButton':
            return (
              <React.Fragment key="startButton">
                <RegularButton
                  text="В начало"
                  appearance="secondary"
                  variant="text"
                  leftIcon={<ICArrowLeftLine />}
                  onClick={handleClickStart}
                />
                <PaginationButton key="sibStart" label="..." onClick={() => null} />
              </React.Fragment>
            )
          case 'pageButton':
            return (
              <PaginationButton
                key={paginationElement.pageNumber}
                label={paginationElement.pageNumber}
                onClick={handleChangePage(paginationElement.pageNumber)}
                active={paginationElement.pageNumber === validatedCurrentPage}
              />
            )
          case 'nextButton':
            return (
              <React.Fragment key="nextButton">
                <PaginationButton key="sibEnd" label="..." onClick={() => null} />
                <RegularButton
                  text="Далее"
                  appearance="secondary"
                  variant="text"
                  rightIcon={<ICArrowRightLine />}
                  onClick={handleClickNext}
                />
              </React.Fragment>
            )
        }
      })}
    </nav>
  )
}

Pagination.displayName = 'Pagination'
