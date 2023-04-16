import React, { type FC, type ReactNode, useState } from 'react';
import { Button } from '../../components/Button';
import { IconLink, IconPackageImport, IconPlus } from '@tabler/icons-react';
import { ICON_SIZE } from '../../constants';
import { ProfilesShowPrompts } from './profiles/ProfilesShowPrompts';
import { ProfilesSourceListsPrompts } from './profiles/ProfilesSourceLists';
import { ProfilesEdit } from './profiles/ProfilesEdit';

const menuItems: Array<{
  label: string
  icon: ReactNode
  pageContent: ReactNode
}> = [{
  label: 'Edit Profile',
  icon: <IconPackageImport size={ICON_SIZE}/>,
  pageContent: <ProfilesEdit/>
}, {
  label: 'Show Prompts',
  icon: <IconPackageImport size={ICON_SIZE}/>,
  pageContent: <ProfilesShowPrompts/>
}, {
  label: 'Show Source Lists',
  icon: <IconLink size={ICON_SIZE}/>,
  pageContent: <ProfilesSourceListsPrompts/>
}];

export interface OptionsPageProfilesProps { }

export const OptionsPagesProfiles: FC<OptionsPageProfilesProps> = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  const addPrompt = (): void => {
    console.log('Import Profile from file'); // todo import profile
  };

  return (
    <div className={'flex flex-col'}>
      <div className={'scrollbar flex flex-nowrap overflow-x-auto gap-2 pb-2'}>
        {menuItems.map((menuItem, index) => (<Button
            key={menuItem.label}
            icon={menuItem.icon}
            onClick={() => {
              setSelectedMenuItem(index);
            }}
            extendButtonClass={selectedMenuItem === index ? 'underline underline-offset-2' : ''}
          >
            {menuItem.label}
          </Button>))}
        <Button icon={<IconPlus size={ICON_SIZE}/>} onClick={() => { addPrompt(); }}> Import Profile </Button>
      </div>
      <div className={'flex-grow mt-4'}>
        {menuItems[selectedMenuItem].pageContent}
      </div>
    </div>
  );
};
