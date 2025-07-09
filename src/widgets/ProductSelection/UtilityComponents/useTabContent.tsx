import { useState } from "react";
import { SelectionBy } from "../constants";
import { useResponsive } from "@/widgets/ProductSelection/UtilityComponents/useResponsive";
import { SelectionType } from "@/widgets/ProductSelection/types";

export const useTabContent = (selectionType: SelectionType) => {
  const [isValidateError, setValidateError] = useState(false);
  const isMoreDesktop = useResponsive();
  const isByParams = selectionType === SelectionBy.byParams;

  const handleClickSelection = () => setValidateError(true);

  return { isValidateError, handleClickSelection, isMoreDesktop, isByParams };
};