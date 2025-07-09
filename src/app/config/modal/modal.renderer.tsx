import { Suspense, useEffect, useState } from 'react'
import { currentModal, CurrentModal } from '@app/config/modal/current-modal'
import { LoadingOverlay } from '@shared/ui'

export const ModalRenderer = () => {
  const [modal, setUdateCurrentModal] = useState<CurrentModal<any> | null>(null)

  useEffect(() => currentModal.subscribe(setUdateCurrentModal), [])

  if (modal) {
    const Modal = currentModal.get(modal.name)

    return (
      <Suspense fallback={<LoadingOverlay />}>
        <Modal {...modal?.props} />
      </Suspense>
    )
  }

  return null
}
