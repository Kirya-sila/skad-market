export type SelectionType = 'by_params' | 'by_car'

export interface TabContentProps {
  setSelectionType: (selectionType: SelectionType) => void
  tabContent: {
    isValidateError: boolean
    handleClickSelection: () => void
    isMoreDesktop: boolean
    isByParams: boolean
  }
}
