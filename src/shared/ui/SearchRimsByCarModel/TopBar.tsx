import { observer } from 'mobx-react-lite'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'

export const TopBar = observer(() => {
  const { currentStep } = searchCarStore

  const steps = ['марку', 'модель', 'поколение', 'модификацию']
  return <>{`Выберите ${steps[currentStep - 1]}`}</>
})
