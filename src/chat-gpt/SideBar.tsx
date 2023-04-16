import './chat-gpt.css';
import React, { type ReactElement, useEffect } from 'react';
import { type Prompt } from '../types/prompt';
import { ProfilePicker, type ProfilePickerActionProps } from './components/ProfilePicker';
import { type ProfilesStorage } from '../types/profilesStorage';
import { IconCloudDownload, IconPlus } from '@tabler/icons-react';
import { ICON_SIZE } from '../constants';
import { PromptList } from './components/PromptList';
import { profilesStorageGet } from '../utils/profiles/profilesStorage';

export const SideBar: () => ReactElement = () => {
  const [profiles, setProfiles] = React.useState<ProfilesStorage[]>([]);
  const [activeProfileId, setActiveProfileId] = React.useState<string | null>(null);
  const [activePrompts, setActivePrompts] = React.useState<Prompt[]>([]);

  const openProfile = (id: string): void => {
    const profile = profiles.find((profile) => profile.id === id);
    if (profile != null) {
      setActiveProfileId(profile.id);
      setActivePrompts(profile.prompts.prompts);
    }
  };

  useEffect(() => {
    console.log('eeeeeeefe');
    if (profiles.length > 0 && activeProfileId == null) {
      return;
    }
    void profilesStorageGet().then((profiles) => {
      console.log(profiles[1].prompts.prompts);
      setProfiles(profiles);
      if (profiles.length > 0) {
        openProfile(profiles[0].id);
        setActivePrompts(profiles[1].prompts.prompts);
      }
    });
  }, []);

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
    {profiles.length > 0 && (
      <>
        <ProfilePicker profiles={profiles} startProfile={profiles[0].id} onProfileSelect={(id) => { openProfile(id); }} actions={sidebarProfilesActions}/>
        <PromptList prompts={activePrompts} onDelete={() => {}}/>
      </>
    )}
    {profiles.length === 0 && (
      <div>Missing Profiles</div>
    )}
  </>);
};
