import React, { type FC } from 'react'

export interface OptionsPageAboutProps {
  description: string
}

export const OptionsPagesAbout: FC<OptionsPageAboutProps> = ({ description }) => {
  return (
    <p className={'text-base dark:text-white'}>{description}</p>
  )
}
