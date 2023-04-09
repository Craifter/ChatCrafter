import React, { type FC, type ReactNode } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { OptionsButton } from './OptionsButton'
import { IconLink } from '@tabler/icons-react'
import { ICON_SIZE } from '../../constants'

export interface OptionContentPropsPage {
  menuName: string
  menuIcon: ReactNode
  hash: string
  pageContent: ReactNode
}

export interface OptionContentPropsExternal {
  menuName: string
  menuIcon: ReactNode
  externalUrl: string
}

export interface OptionContentProps {
  pages: OptionContentPropsPage[]
  externals: OptionContentPropsExternal[]
}
export const OptionsContent: FC<OptionContentProps> = ({ pages, externals }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 w-full">
      <div className="flex flex-nowrap overflow-x-auto gap-2 pb-4">
        {pages.map((page) => (
          <OptionsButton
            key={page.menuName}
            onClick={() => {
              window.location.hash = '/' + page.hash
            }}
            icon={page.menuIcon}
          >
            {page.menuName}
          </OptionsButton>
        ))}
        {externals.map((external) => (
          <OptionsButton
            key={external.menuName}
            onClick={() => {
              window.open(external.externalUrl)
            }}
            icon={external.menuIcon}
          >
            {external.menuName}
            <IconLink size={ICON_SIZE} className={'inline-block ml-1 -mt-0.5'} />
          </OptionsButton>
        ))}
      </div>
      <HashRouter basename={'/'}>
        <Routes>
          {pages.map((page) => (
            <Route key={page.hash} path={page.hash} element={page.pageContent} />
          ))}
        </Routes>
      </HashRouter>
    </div>
  )
}
