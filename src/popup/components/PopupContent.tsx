import React, { type FC, type ReactNode } from 'react';
import { Button } from '../../components/Button';

export interface PopupContentPropsLinks {
  menuName: string
  menuIcon: ReactNode
  onClick: () => void
}

interface PopupContentProps {
  links: PopupContentPropsLinks[]
}

export const PopupContent: FC<PopupContentProps> = ({ links }) => {
  return (
    <div className="bg-white dark:bg-opacity-10 shadow dark:shadow-neutral-800 rounded p-4 w-full">
      <div className="flex flex-col space-y-4">
        {links.map((link) => (
          <Button onClick={link.onClick} icon={link.menuIcon} key={link.menuName}>
            {link.menuName}
          </Button>
        ))}
      </div>
    </div>
  );
};
