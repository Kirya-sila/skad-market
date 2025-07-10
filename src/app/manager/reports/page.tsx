import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerReports() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Отчеты менеджера</div>
    </Suspense>
  )
}