import React, { type FC, type ReactNode } from 'react'

export interface OptionsButtonProps {
  /** The function to call when the button is clicked */
  onClick: () => void | Promise<void>
  /** Button icon */
  icon?: ReactNode
  /** Button content */
  children: ReactNode
}

/** A button for the options page */
export const OptionsButton: FC<OptionsButtonProps> = ({ onClick, icon, children }: OptionsButtonProps) => {
  return (
    <button
      className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {icon}
      <span className="ml-1 text-base leading-4 whitespace-nowrap">{children}</span>
    </button>
  )
}
