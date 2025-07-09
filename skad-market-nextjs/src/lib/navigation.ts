import { useRouter } from 'next/navigation'

// Hook to provide react-router-dom compatible navigation
export const useNavigate = () => {
  const router = useRouter()
  
  return (path: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      router.replace(path)
    } else {
      router.push(path)
    }
  }
}

// Hook to get current location (simplified version)
export const useLocation = () => {
  // This is a simplified implementation
  // In a real app, you might want to use window.location or a more sophisticated approach
  return {
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    search: typeof window !== 'undefined' ? window.location.search : '',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
  }
}

// Utility function to generate paths with parameters
export const generatePath = (path: string, params: Record<string, string | number>) => {
  let result = path
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`[${key}]`, String(value))
  })
  return result
}