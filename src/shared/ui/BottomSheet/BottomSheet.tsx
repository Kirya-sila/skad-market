import React, { ReactNode, useCallback, useRef } from 'react';
import { useSmoothVisibility, withStopPropagation } from '@shared/libs';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import css from './BottomSheet.module.scss';

interface BottomSheetProps {
  className?: string;
  onClose: VoidFunction;
  visibility: boolean;
  content: ReactNode;
}

export const BottomSheet = ({ className, onClose, visibility, content }: BottomSheetProps) => {
  const { shouldRender, isVisible } = useSmoothVisibility(visibility, 100);
  const startY = useRef<number | null>(null);
  const currentY = useRef<number | null>(null);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    startY.current = event.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    if (startY.current !== null) {
      currentY.current = event.touches[0].clientY;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (startY.current !== null && currentY.current !== null) {
      const deltaY = currentY.current - startY.current;
      if (deltaY > 50) { // Если свайп вниз более 50 пикселей, закрыть BottomSheet
        onClose();
      }
    }
    startY.current = null;
    currentY.current = null;
  }, [onClose]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      role='presentation'
      className={cn(css.underlay, className, { [css.visible]: isVisible })}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div onClick={withStopPropagation()} className={cn(css.bottomSheet, className)} role='bottom-sheet'>
        <div className={css.grabber} onClick={onClose} />
        {content}
      </div>
    </div>,
    document.body,
  );
};

BottomSheet.displayName = 'BottomSheet';