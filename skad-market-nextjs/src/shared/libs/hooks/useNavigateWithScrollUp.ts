import { NavigateOptions, useNavigate } from 'react-router-dom'

export const useNavigateWithScrollUp = () => {
  const navigateTo = useNavigate()

  const navigate = (route: string, options?: NavigateOptions) => {
    navigateTo(route, options)
    window.scrollTo(0, 0)
  }

  return navigate
}
