import type { FC, ReactNode } from 'react';

import Portal from './Portal';

type PopupProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Popup: FC<PopupProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-8" role="dialog">
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          role="button"
          tabIndex={0}
          onClick={onClose}
        />

        <div className="z-50">{children}</div>
      </div>
    </Portal>
  );
};

export default Popup;