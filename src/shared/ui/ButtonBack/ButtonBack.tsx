import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

interface ButtonBackProps {
  to?: string
  children?: React.ReactNode
  className?: string
}

export const ButtonBack = ({ to, children = 'Назад', className }: ButtonBackProps) => {
  const router = useRouter()

  const handleClick = () => {
    if (to) {
      router.push(to)
    } else {
      router.back()
    }
  }

  return (
    <Button 
      type="text" 
      icon={<ArrowLeftOutlined />} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </Button>
  )
}