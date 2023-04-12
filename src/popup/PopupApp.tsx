import React, { type ReactElement } from 'react';
import { PopupLayout } from './components/PopupLayout';
import { PopupHeader } from './components/PopupHeader';
import { PopupContent, type PopupContentPropsLinks } from './components/PopupContent';
import browser from 'webextension-polyfill';
import { CHATGTP_URL, EXAMPLE_PROMPTS_URL, ICON_SIZE } from '../constants';
import { IconList, IconRobot, IconSettings } from '@tabler/icons-react';

const links: PopupContentPropsLinks[] = [
  {
    menuName: 'Open ChatGPT',
    menuIcon: <IconRobot size={ICON_SIZE} />,
    onClick: () => { window.open(CHATGTP_URL); }
  },
  {
    menuName: 'Open Options',
    menuIcon: <IconSettings size={ICON_SIZE} />,
    onClick: async () => { await browser.runtime.openOptionsPage(); }
  },
  {
    menuName: 'Open Prompt Repo',
    menuIcon: <IconList size={ICON_SIZE} />,
    onClick: () => { window.open(EXAMPLE_PROMPTS_URL); }
  }
];

export default (): ReactElement => {
  return (
    <PopupLayout header={<PopupHeader title={'ChatCrafter'}></PopupHeader>}>
      <PopupContent links={links} />
    </PopupLayout>
  );
};
