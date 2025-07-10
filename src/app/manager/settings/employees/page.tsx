import { Suspense } from 'react'
import { Employees } from '@/pages/Manager/ManagerSettings/Employees'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerEmployees() {
  return (
    <Suspense fallback={<Spinner />}>
      <Employees />
    </Suspense>
  )
}