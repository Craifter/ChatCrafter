import React, { type ReactElement } from 'react';
import { OptionsLayout } from './components/OptionsLayout';
import { OptionsHeader } from './components/OptionsHeader';
import { type OptionContentPropsExternal, type OptionContentPropsPage, OptionsContent } from './components/OptionsContent';
import { CHATCRAFTER_DESCRIPTION, CHATGPT_URL, EXAMPLE_PROMPTS_URL, ICON_SIZE, SUPPORT_CHATCRAFTER } from '../constants';
import {
  IconFile,
  IconHeartHandshake,
  IconInfoCircle,
  IconRobot,
  IconSettings,
  IconUser
} from '@tabler/icons-react';
import { OptionsPagesOptions } from './pages/OptionsPagesOptions';
import { OptionsPagesAbout } from './pages/OptionsPagesAbout';
import { OptionsPagesProfiles } from './pages/OptionsPagesProfiles';

const pages: OptionContentPropsPage[] = [
  {
    menuName: 'Profiles',
    menuIcon: <IconUser size={ICON_SIZE}/>,
    hash: '',
    pageContent: <OptionsPagesProfiles />
  },
  {
    menuName: 'Options',
    menuIcon: <IconSettings size={ICON_SIZE} />,
    hash: 'options',
    pageContent: <OptionsPagesOptions />
  },
  {
    menuName: 'About',
    menuIcon: <IconInfoCircle size={ICON_SIZE} />,
    hash: 'about',
    pageContent: <OptionsPagesAbout description={CHATCRAFTER_DESCRIPTION} title='About this extension' />
  }
];

const externals: OptionContentPropsExternal[] = [
  {
    menuName: 'ChatGPT',
    menuIcon: <IconRobot size={ICON_SIZE} />,
    externalUrl: CHATGPT_URL
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
];

/** The main component of the options page */
export default (): ReactElement => {
  return (
    <OptionsLayout header={<OptionsHeader title={'ChatCrafter'}></OptionsHeader>}>
      <OptionsContent
        pages={pages}
        externals={externals}
      ></OptionsContent>
    </OptionsLayout >
  );
};
