import React, { type ReactElement } from 'react'

export interface PopupHeaderProps {
  /** The title of the header */
  title: string
}

export const PopupHeader = ({ title }: PopupHeaderProps): ReactElement => {
  return (
    <header className="border-b border-gray-200 pb-2">
      <h1 className={'text-xl font-bold text-gray dark:text-white'}>{title}</h1>
    </header>
  )
}
