import React, { ComponentType, LazyExoticComponent } from 'react'

export enum Modals {
  Base,
  SearchCar,
  ChooseCity,
  OrderCallback,
  QuickSearchRimsModal,
  QuickSearchTiresModal,
  OrderCallbackSuccess,
  CatalogMobileFilters,
  ExpandFilterListModal,
  ParamsHelpModal,
  ChooseMobileCatalogModal,
  ConfirmDeleteModal,
  DeliveryPointWorkingOptionsModal,
}

export const modalsConfig: Record<Modals, LazyExoticComponent<ComponentType<any>>> = {
  [Modals.Base]: React.lazy(() => import('../../../shared/ui/Modals/ModalBase/ModalBase')),
  [Modals.SearchCar]: React.lazy(() => import('../../../shared/ui/Modals/SearchCarModal/SearchCarModal')),
  [Modals.ChooseCity]: React.lazy(() => import('../../../shared/ui/Modals/ChooseCityModal/ChooseCityModal')),
  [Modals.OrderCallback]: React.lazy(() => import('../../../shared/ui/Modals/OrderCallBackModal/OrderCallBackModal')),
  [Modals.OrderCallbackSuccess]: React.lazy(
    () => import('../../../shared/ui/Modals/OrderCallBackSuccessModal/OrderCallBackSuccessModal'),
  ),
  [Modals.QuickSearchRimsModal]: React.lazy(
    () => import('@shared/ui/Modals/QuickSearchRimsModal/QuickSearchRimsModal'),
  ),
  [Modals.QuickSearchTiresModal]: React.lazy(
    () => import('@shared/ui/Modals/QuickSearchRimsModal/QuickSearchTiresModal'),
  ),
  [Modals.CatalogMobileFilters]: React.lazy(() => import('@shared/ui/Modals/CatalogFiltersModal/CatalogMobileFilters')),
  [Modals.ExpandFilterListModal]: React.lazy(
    () => import('@shared/ui/Modals/ExpandFilterListModal/ExpandFilterListModal'),
  ),
  [Modals.ParamsHelpModal]: React.lazy(() => import('@/features/filters/ui/ParamsHelpModal/ParamsHelpModal')),
  [Modals.ChooseMobileCatalogModal]: React.lazy(
    () => import('@shared/ui/Modals/ChooseMobileCatalogModal/ChooseMobileCatalogModal'),
  ),
  [Modals.ConfirmDeleteModal]: React.lazy(() => import('@shared/ui/Modals/ConfirmDeleteModal/ConfirmDeleteModal')),
  [Modals.DeliveryPointWorkingOptionsModal]: React.lazy(
    () => import('@shared/ui/Modals/DeliveryPointWorkingOptionsModal/DeliveryPointWorkingOptionsModal'),
  ),
}
