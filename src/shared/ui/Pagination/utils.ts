import useIsMobile from '@/shared/libs/hooks/useIsMobile'

const START_BUTTON: PaginationElement = { type: 'startButton' }
const NEXT_BUTTON: PaginationElement = { type: 'nextButton' }

interface StartButton {
  type: 'startButton'
}

interface NextButton {
  type: 'nextButton'
}

interface PageNumberButton {
  type: 'pageButton'
  pageNumber: number
}

export type PaginationElement = StartButton | PageNumberButton | NextButton

export interface GetPaginationElementsProps {
  total: number
  currentPage: number
  siblingCount: number
}

export const getPaginationElements = ({
  total,
  currentPage,
  siblingCount,
}: GetPaginationElementsProps): PaginationElement[] => {
  const isMobile = useIsMobile()
  const allPageNumbers = Array.from({ length: total }, (element, index) => index + 1)
  const isLastRange = currentPage > total - siblingCount

  const pageNumbersPerPage = isMobile ? 4 : 7

  const rangeBeginIndex = Math.max(isLastRange ? total - pageNumbersPerPage : currentPage - siblingCount - 1, 0)
  const rangeEndIndex = isLastRange ? total : Math.max(currentPage + siblingCount, pageNumbersPerPage)

  const shouldShowStartButton = total > pageNumbersPerPage && rangeBeginIndex >= 1
  const shouldShowNextButton = total > pageNumbersPerPage && currentPage !== total

  const pageButtons: PaginationElement[] = allPageNumbers.map((pageNumber) => ({
    type: 'pageButton',
    pageNumber,
  }))

  return [
    ...(shouldShowStartButton ? [START_BUTTON] : []),
    ...pageButtons.slice(rangeBeginIndex, rangeEndIndex),
    ...(shouldShowNextButton ? [NEXT_BUTTON] : []),
  ]
}

export const validateCurrentPage = (currentPage: number, total: number) => Math.max(Math.min(currentPage, total), 1)

export const validateSiblingCount = (siblingCount: number) => Math.max(siblingCount, 0)

export const getPageByOffset = (offset: number, itemsPerPage: number) => offset / itemsPerPage + 1

export const getOffsetByPage = (page: number, itemsPerPage: number) => (page - 1) * itemsPerPage

export const getTotalPages = (itemsCount: number, itemsPerPage: number) => Math.ceil(itemsCount / itemsPerPage)
