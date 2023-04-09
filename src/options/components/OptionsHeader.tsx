import React, { type ReactElement } from 'react'

export interface OptionsHeaderProps {
  /** The title of the header */
  title: string
}

export const OptionsHeader = ({ title }: OptionsHeaderProps): ReactElement => {
  return (
    <header className="border-b border-gray-200 pb-2">
      <h1 className={'text-xl font-bold dark:text-white'}>{title}</h1>
    </header>
  )
}
