import { useEffect, useState } from 'react'
import { useModal } from './useModal'
import { Modals } from '@/app/config/modal/modals-confg'
import { cityStore } from '@/features'
import { ChooseCityModalProps } from '@/shared/ui'

export const useCityLocation = () => {
  const [showConfirmCityTooltip, setShowConfirmCityTooltip] = useState(false)
  const chooseCityModal = useModal<ChooseCityModalProps>(Modals.ChooseCity)

  const { cityConfirmed, confirmCurrentCity } = cityStore

  useEffect(() => {
    if (!cityConfirmed) {
      setShowConfirmCityTooltip(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityConfirmed])

  const handleConfirmCity = () => {
    confirmCurrentCity()
    setShowConfirmCityTooltip(false)
  }

  const displayChooseCityModal = () => {
    chooseCityModal.open({
      onClose: chooseCityModal.close,
    })
  }

  return { showConfirmCityTooltip, handleConfirmCity, displayChooseCityModal }
}
