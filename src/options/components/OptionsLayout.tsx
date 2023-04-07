// Import necessary libraries
import React, { FC, ReactNode } from 'react';

// Define the props interface
interface Props {
  header: ReactNode;
  children: ReactNode | ReactNode[];
}

// Create the component
export const OptionsLayout: FC<Props> = ({ header, children }) => {
  return (
    <div className="bg-white  rounded p-4 w-full">
      <header className="border-b border-gray-200 pb-2">
        <div className="text-xl font-bold text-gray-800">{header}</div>
      </header>
      <div className="mt-4">
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
};
