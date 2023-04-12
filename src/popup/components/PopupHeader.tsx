import React, { type ReactElement } from 'react';
import { LightSwitch } from '../../components/LightSwitch';

export interface PopupHeaderProps {
  /** The title of the header */
  title: string
}

export const PopupHeader = ({ title }: PopupHeaderProps): ReactElement => {
  return (
    <header className="border-b border-gray-200 pb-2 relative">
      <h1 className={'text-xl font-bold text-gray dark:text-white'}>{title}</h1>
      <div className={'absolute top-0 right-0'}>
        <LightSwitch />
      </div>
    </header>
  );
};
