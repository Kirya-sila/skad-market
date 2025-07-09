import { useWindowSize } from "@shared/libs/hooks";

export const useResponsive = () => {
  const windowSize = useWindowSize();
  return windowSize.width > 1200;
};
