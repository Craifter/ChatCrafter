// Import necessary libraries
import React, { type FC, type ReactNode } from 'react'
import {
  IconLink
} from '@tabler/icons-react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ICON_SIZE } from '../../constants'

const ExternalLinkIcon: FC = () => <IconLink size={ICON_SIZE} className={'inline-block ml-1 -mt-0.5'} />

interface MenuButtonProps {
  onClick: () => void
  icon: ReactNode
  children: ReactNode
}

const MenuButton: FC<MenuButtonProps> = ({ onClick, icon, children }: MenuButtonProps) => {
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
          <MenuButton
            key={page.hash}
            onClick={() => {
              window.location.hash = '/' + page.hash
            }}
            icon={page.menuIcon}
          >
            {page.menuName}
          </MenuButton>
        ))}
        {externals.map((external) => (
          <MenuButton
            key={external.menuName}
            onClick={() => {
              window.open(external.externalUrl)
            }}
            icon={external.menuIcon}
          >
            {external.menuName}
            <ExternalLinkIcon />
          </MenuButton>
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
