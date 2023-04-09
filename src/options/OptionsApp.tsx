import React, { type ReactElement } from 'react'
import { OptionsLayout } from './components/OptionsLayout'
import OptionsHeader from './components/OptionsHeader'
import { type OptionContentPropsExternal, type OptionContentPropsPage, OptionsContent } from './components/OptionsContent'
import { CHATCRAFTER_DESCRIPTION, CHATGTP_URL, EXAMPLE_PROMPTS_URL, ICON_SIZE, SUPPORT_CHATCRAFTER } from '../constants'
import {
  IconFile,
  IconHeartHandshake,
  IconInfoCircle,
  IconList,
  IconRobot,
  IconSettings,
  IconUser
} from '@tabler/icons-react'
import { OptionsPageAbout } from './pages/OptionsPageAbout'

const pages: OptionContentPropsPage[] = [
  {
    menuName: 'Own Prompts',
    menuIcon: <IconUser size={ICON_SIZE}/>,
    hash: '',
    pageContent: <div>Own Prompts</div>
  },
  {
    menuName: 'Prompts List',
    menuIcon: <IconList size={ICON_SIZE} />,
    hash: 'prompts-list',
    pageContent: <div>Prompts List</div>
  },
  {
    menuName: 'Options',
    menuIcon: <IconSettings size={ICON_SIZE} />,
    hash: 'options',
    pageContent: <div>Options</div>
  },
  {
    menuName: 'About',
    menuIcon: <IconInfoCircle size={ICON_SIZE} />,
    hash: 'about',
    pageContent: <OptionsPageAbout description={'About this extension: ' + CHATCRAFTER_DESCRIPTION} />
  }
]

const externals: OptionContentPropsExternal[] = [
  {
    menuName: 'ChatGTP',
    menuIcon: <IconRobot size={ICON_SIZE} />,
    externalUrl: CHATGTP_URL
  },
  {
    menuName: 'Example Prompts File',
    menuIcon: <IconFile size={ICON_SIZE} />,
    externalUrl: EXAMPLE_PROMPTS_URL
  },
  {
    menuName: 'Support ChatCrafter',
    menuIcon: <IconHeartHandshake size={ICON_SIZE} />,
    externalUrl: SUPPORT_CHATCRAFTER
  }
]
export default (): ReactElement => {
  return (
    <OptionsLayout header={<OptionsHeader></OptionsHeader>}>
      <OptionsContent
        pages={pages}
        externals={externals}
      ></OptionsContent>
    </OptionsLayout >
  )
}
