import React, { type FC } from 'react'

export interface OptionsPageAboutProps {
  description: string
}

export const OptionsPageAbout: FC<OptionsPageAboutProps> = ({ description }) => {
  return (
    <p className={'text-base'}>{description}</p>
  )
}
