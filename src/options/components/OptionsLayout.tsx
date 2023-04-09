import React, { type FC, type ReactNode } from 'react'

interface OptionsLayoutProps {
  /** The header of the options page */
  header: ReactNode
  /** The content of the options page */
  children: ReactNode | ReactNode[]
}

/** A layout for the options page */
export const OptionsLayout: FC<OptionsLayoutProps> = ({ header, children }) => {
  return (
    <div className="bg-white dark:bg-black p-4 w-full min-h-screen">
      {header}
      <div className="mt-4">
        {children}
      </div>
    </div>
  )
}
