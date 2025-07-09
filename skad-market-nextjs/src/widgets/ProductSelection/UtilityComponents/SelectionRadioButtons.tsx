import { SelectionType } from "@/widgets/ProductSelection/types";
import { RadioButton } from "@shared/ui/RadioButton";

interface SelectionRadioButtonsProps {
  selectionType: SelectionType;
  setSelectionType: (selectionType: SelectionType) => void;
  name: string;
}

export const SelectionRadioButtons = ({ selectionType, setSelectionType, name }: SelectionRadioButtonsProps) => (
  <>
    <RadioButton
      name={name}
      id="by_car"
      value="by_car"
      label="По автомобилю"
      active={selectionType === "by_car"}
      onCheckRadioButton={() => setSelectionType("by_car")}
    />
    <RadioButton
      name={name}
      id="by_params"
      value="by_params"
      label="По параметрам"
      active={selectionType === "by_params"}
      onCheckRadioButton={() => setSelectionType("by_params")}
    />
  </>
);
