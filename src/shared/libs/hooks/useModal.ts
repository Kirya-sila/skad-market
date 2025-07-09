import { currentModal } from '@app/config/modal/current-modal'
import { Modals } from '@app/config/modal/modals-confg'
import { lockBodyScroll } from '../utils'

export const useModal = <P>(name: Modals) => {
  return {
    open: (props: P) => {
      currentModal.set({ name, props })
    },
    close: () => {
      currentModal.set(null)
      lockBodyScroll(false)
    },
  }
}
