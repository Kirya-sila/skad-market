import { appRoutes } from '@/app-settings'
import { MainLayout } from '@/layouts/MainLayout'
import { Catalog, CatalogItem } from '@/pages/rims'

export const catalogRoutes = [
  {
    path: appRoutes.rims,
    element: (
      <MainLayout>
        <Catalog />
      </MainLayout>
    ),
  },
  {
    path: appRoutes.rimsItem,
    element: (
      <MainLayout>
        <CatalogItem />
      </MainLayout>
    ),
  },
]
