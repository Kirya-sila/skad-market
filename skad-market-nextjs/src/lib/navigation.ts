import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { appRoutes } from '@/app-settings'

// Next.js navigation hooks
export const useNextNavigation = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()

  return {
    navigate: (path: string) => router.push(path),
    replace: (path: string) => router.replace(path),
    back: () => router.back(),
    forward: () => router.forward(),
    refresh: () => router.refresh(),
    searchParams,
    params,
  }
}

// Generate path utility (similar to react-router-dom's generatePath)
export const generatePath = (path: string, params: Record<string, string | number> = {}) => {
  let result = path
  
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value))
  })
  
  return result
}

// Navigation helpers
export const navigation = {
  toHome: () => appRoutes.root,
  toRims: () => appRoutes.rims,
  toTyres: () => appRoutes.tyres,
  toCart: () => appRoutes.cart,
  toOrder: (id: string) => generatePath(appRoutes.order, { id }),
  toBuyerCabinet: () => appRoutes.buyer.root,
  toManager: () => appRoutes.manager.root,
  toRimDetails: (wheelCode: string) => generatePath(appRoutes.rimsItem, { wheelCode }),
}

// Link component props type
export interface LinkProps {
  to: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

// NavLink component props type
export interface NavLinkProps extends LinkProps {
  end?: boolean
  caseSensitive?: boolean
}