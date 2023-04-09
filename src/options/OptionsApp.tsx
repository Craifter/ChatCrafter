import React from 'react'
import { OptionsLayout } from './components/OptionsLayout'
import OptionsHeader from './components/OptionsHeader'
import { type OptionContentPropsExternal, type OptionContentPropsPage, OptionsContent } from './components/OptionsContent'
import { CHATGTP_URL, EXAMPLE_PROMPTS_URL, ICON_SIZE, SUPPORT_CHATCRAFTER } from '../constants'
import {
  IconFile,
  IconHeartHandshake,
  IconInfoCircle,
  IconList,
  IconRobot,
  IconSettings,
  IconUser
} from '@tabler/icons-react'

const pages: OptionContentPropsPage[] = [
  {
    menuName: 'Own Prompts',
    menuIcon: <IconUser size={ICON_SIZE} className={'inline-block'} />,
    hash: '',
    pageContent: <div>Own Prompts</div>
  },
  {
    menuName: 'Prompts List',
    menuIcon: <IconList size={ICON_SIZE} className={'inline-block'} />,
    hash: 'prompts-list',
    pageContent: <div>Prompts List</div>
  },
  {
    menuName: 'Options',
    menuIcon: <IconSettings size={ICON_SIZE} className={'inline-block'} />,
    hash: 'options',
    pageContent: <div>Options</div>
  },
  {
    menuName: 'About',
    menuIcon: <IconInfoCircle size={ICON_SIZE} className={'inline-block'} />,
    hash: 'about',
    pageContent: <div>About</div>
  }
]

const externals: OptionContentPropsExternal[] = [
  {
    menuName: 'ChatGTP',
    menuIcon: <IconRobot size={ICON_SIZE} className={'inline-block'} />,
    externalUrl: CHATGTP_URL
  },
  {
    menuName: 'Example Prompts File',
    menuIcon: <IconFile size={ICON_SIZE} className={'inline-block'} />,
    externalUrl: EXAMPLE_PROMPTS_URL
  },
  {
    menuName: 'Support ChatCrafter',
    menuIcon: <IconHeartHandshake size={ICON_SIZE} className={'inline-block'} />,
    externalUrl: SUPPORT_CHATCRAFTER
  }
]

export default function OptionsApp (): JSX.Element {
  return (
    <OptionsLayout header={<OptionsHeader></OptionsHeader>}>
      <OptionsContent
        pages={pages}
        externals={externals}
      ></OptionsContent>
    </OptionsLayout >
  )
}
