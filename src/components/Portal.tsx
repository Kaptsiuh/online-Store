import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};
const Portal: FC<PortalProps> = ({ children }) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.append(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
};

export default Portal;