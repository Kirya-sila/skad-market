import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Toast = () => {
  return <ToastContainer hideProgressBar transition={Slide} />
}
