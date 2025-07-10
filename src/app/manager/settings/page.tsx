import { Suspense } from 'react'
import { ManagerSettingsHomePage } from '@/pages/Manager/ManagerSettings'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerSettings() {
  return (
    <Suspense fallback={<Spinner />}>
      <ManagerSettingsHomePage />
    </Suspense>
  )
}