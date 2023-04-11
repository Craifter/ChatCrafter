import React, { type FC } from 'react'

export interface OptionsPageAboutProps {
  title: string
  description: string
}

export const OptionsPagesAbout: FC<OptionsPageAboutProps> = ({ description, title }) => {
  return (
    <div className={'max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-base dark:text-white'}>
      <h1 className={'text-xl font-bold dark:text-white'}>{title}</h1>
      <p className={'pt-2 text-base dark:text-white'}>{description}</p>
    </div>
  )
}
