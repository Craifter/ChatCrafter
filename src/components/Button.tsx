import React, { type FC, type ReactNode } from 'react';

export interface ButtonProps {
  /** The function to call when the button is clicked */
  onClick?: () => void | Promise<void>
  /** Button icon */
  icon?: ReactNode
  /** Button content */
  children?: ReactNode
  /** Additional class name to extend the button */
  extendButtonClass?: string
  /** Button type */
  type?: 'submit' | 'button' | 'reset'
  /** Button titel */
  titel?: string
}

/** A button for the options page */
export const Button: FC<ButtonProps> = ({ onClick, icon, children, extendButtonClass, type, titel }: ButtonProps) => {
  if (extendButtonClass === undefined) extendButtonClass = '';
  if (type === undefined) type = 'button';
  return (
    <button
      className={`flex bg-blue-500 dark:bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${extendButtonClass}`}
      onClick={onClick}
      type={type}
      title={titel}
    >
      {icon}
      <span className="ml-1 text-base leading-4 whitespace-nowrap">{children}</span>
    </button>
  );
};
