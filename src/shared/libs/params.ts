import { useParams } from 'next/navigation'

export const useRouteParams = () => {
  const params = useParams()
  
  return {
    params,
    getParam: (key: string) => params[key] as string,
    getParamArray: (key: string) => {
      const param = params[key]
      return Array.isArray(param) ? param : [param]
    }
  }
}