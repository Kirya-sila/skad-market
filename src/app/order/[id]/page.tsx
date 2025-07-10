import { Order } from '@/pages/Order'

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  return <Order orderId={params.id} />
}