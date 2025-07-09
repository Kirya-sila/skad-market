import { RegularButton } from '@shared/ui/RegularButton'

export const SelectionButton = ({ onClick }: { onClick: VoidFunction }) => (
  <RegularButton onClick={onClick} text="Подобрать" />
)
