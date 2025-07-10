import { Suspense } from 'react'
import { ManagerGoods } from '@/pages/Manager/ManagerGoods'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerGoodsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ManagerGoods />
    </Suspense>
  )
}