import React, { type ReactElement } from 'react';
import { type Prompt } from '../types/prompt';
import { SidebarProfiles, type SidebarProfilesActionProps } from './components/SidebarProfiles';
import { type ProfilesStorage } from '../types/profilesStorage';

import './chat-gpt.css';
import { IconCloudDownload, IconPlus } from '@tabler/icons-react';
import { ICON_SIZE } from '../constants';

const prompts: Prompt[] = [
  {
    id: 'name-generator',
    name: 'name generator 2',
    description: 'Gives names for a gender',
    prompt: 'Give me names for a {{gender}}',
    variables: [
      {
        name: 'gender',
        type: 'string',
        description: 'Girl or Boy'
      }
    ],
    tags: [
      'person',
      'names'
    ],
    metadata: {
      author: 'Craifter',
      creation_date: '2023-04-05',
      source: 'https://github.com/Craifter/oprm'
    },
    model: {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5',
      maxLength: 12000,
      tokenLimit: 4000
    }
  }
];

const profiles: ProfilesStorage[] = [
  {
    id: '1',
    name: 'Profile 1',
    prompts: [] as any
  },
  {
    id: '2',
    name: 'Profile 2',
    prompts: [] as any
  }, {
    id: '3',
    name: 'Profile 3',
    prompts: [] as any
  }, {
    id: '4',
    name: 'Profile 4',
    prompts: [] as any
  }
];

const sidebarProfilesActions: SidebarProfilesActionProps[] = [
  {
    label: 'Load',
    icon: <IconCloudDownload size={ICON_SIZE} />,
    handler: () => {
      console.log('Load');
    }
  },
  {
    label: 'Create',
    icon: <IconPlus size={ICON_SIZE} />,
    handler: () => {
      console.log('Create');
    }
  }
];

export const SideBar: () => ReactElement = () => {
  return (
    <div>
      <SidebarProfiles profiles={profiles} activeProfile="1" onProfileSelect={() => {}} actions={sidebarProfilesActions}/>
    </div>
  );
};
