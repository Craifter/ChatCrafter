import React, { type FC, type ReactNode } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Button } from '../../components/Button'
import { IconExternalLink } from '@tabler/icons-react'
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
    <div className="bg-white dark:bg-opacity-10 shadow dark:shadow-neutral-800 rounded p-4 w-full">
      <div className="scrollbar flex flex-nowrap overflow-x-auto gap-2 pb-2 mb-4">
        {pages.map((page) => (
          <Button
            key={page.menuName}
            onClick={() => {
              window.location.hash = '/' + page.hash
            }}
            icon={page.menuIcon}
          >
            {page.menuName}
          </Button>
        ))}
        {externals.map((external) => (
          <Button
            key={external.menuName}
            onClick={() => {
              window.open(external.externalUrl)
            }}
            icon={external.menuIcon}
          >
            {external.menuName}
            <IconExternalLink size={ICON_SIZE} className={'inline-block ml-1 -mt-0.5'} />
          </Button>
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
