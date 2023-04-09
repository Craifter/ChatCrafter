import React, { type FC, type ReactNode } from 'react'

interface PopupLayoutProps {
  /** The header of the options page */
  header: ReactNode
  /** The content of the options page */
  children: ReactNode | ReactNode[]
}

export const PopupLayout: FC<PopupLayoutProps> = ({ header, children }) => {
  return (
    <div className="bg-white dark:bg-black p-4 w-full">
      {header}
      <div className="mt-4">
        {children}
      </div>
    </div>
  )
}
