import React, { type ReactElement } from 'react';
import { type Prompt } from '../types/prompt';
import { ProfilePicker, type ProfilePickerActionProps } from './components/ProfilePicker';
import { type ProfilesStorage } from '../types/profilesStorage';
import { IconCloudDownload, IconPlus } from '@tabler/icons-react';
import { ICON_SIZE } from '../constants';
import { PromptList } from './components/PromptList';
import './chat-gpt.css';

const prompts: Prompt[] = [{
  id: 'name-generator1',
  name: 'name generator 1',
  description: 'Gives names for a gender',
  prompt: 'Give me names for a {{gender}}',
  variables: [{
    name: 'gender',
    type: 'string',
    description: 'Girl or Boy'
  }],
  tags: ['person', 'names'],
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
}];

const profiles: ProfilesStorage[] = [{
  id: '1',
  name: 'Profile 1',
  prompts: {
    version: '1.0.0',
    generator: 'chatcrafter',
    prompts: []
  }
}, {
  id: '2',
  name: 'Profile 2',
  prompts: {
    version: '1.0.0',
    generator: 'chatcrafter',
    prompts: []
  }
}];

export const SideBar: () => ReactElement = () => {
  const sidebarProfilesActions: ProfilePickerActionProps[] = [{
    label: 'Load',
    icon: <IconCloudDownload size={ICON_SIZE}/>,
    handler: () => {
      console.log('Load');
    }
  }, {
    label: 'Create',
    icon: <IconPlus size={ICON_SIZE}/>,
    handler: () => {
      console.log('Create');
    }
  }];

  return (<>
    <ProfilePicker profiles={profiles} activeProfile="1" onProfileSelect={() => {}} actions={sidebarProfilesActions}/>
    <PromptList prompts={prompts} onDelete={() => {}}/>
  </>);
};
