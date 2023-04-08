// Import necessary libraries
import React, { type FC, type ReactNode } from 'react'
import {
  IconBrandGit,
  IconGitBranch,
  IconLink,
  IconList,
  IconRobot, IconSettings, IconUser
} from '@tabler/icons-react'
import { PromptArea } from './PromtArea'

const ICON_SIZE = 16

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
      <span className="ml-2 text-base leading-4 whitespace-nowrap">{children}</span>
    </button>
  )
}

interface OptionContentProps {
  onOpenChat: () => void
  onOpenPromptRepo: () => void
  onOpenSupport: () => void
}

export const OptionsContent: FC<OptionContentProps> = ({ onOpenChat, onOpenPromptRepo, onOpenSupport }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 w-full">
      <div className="flex flex-nowrap overflow-x-auto gap-2 pb-4">
        <MenuButton onClick={() => {}} icon={<IconSettings size={ICON_SIZE} />}>
          ChatCrafter Options
        </MenuButton>
        <MenuButton onClick={() => {}} icon={<IconUser size={ICON_SIZE} />}>
          Open Own Prompts
        </MenuButton>
        <MenuButton onClick={() => {}} icon={<IconList size={ICON_SIZE} />}>
          Open Prompts List
        </MenuButton>
        <MenuButton onClick={onOpenChat} icon={<IconRobot size={ICON_SIZE} />}>
          Open ChatGPT
          <ExternalLinkIcon />
        </MenuButton>
        <MenuButton onClick={onOpenPromptRepo} icon={<IconBrandGit size={ICON_SIZE} />}>
          Open Prompt Repo
          <ExternalLinkIcon />
        </MenuButton>
        <MenuButton onClick={onOpenSupport} icon={<IconGitBranch size={ICON_SIZE} />}>
          Support ChatCrafter
          <ExternalLinkIcon />
        </MenuButton>
      </div>
      <PromptArea></PromptArea>
    </div>
  )
}
