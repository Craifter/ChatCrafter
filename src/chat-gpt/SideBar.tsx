import './chat-gpt.css';
import React, { type ReactElement, useEffect } from 'react';
import { type Prompt } from '../types/prompt';
import { ProfilePicker } from './components/ProfilePicker';
import { type ProfilesStorage } from '../types/profilesStorage';
import { PromptList } from './components/PromptList';
import { profilesStorage, profilesStorageGet } from '../utils/profiles/profilesStorage';
import { uuid } from '../utils/uuid';
import { profilesPromptsRemove } from '../utils/profiles/profilesPrompts';

export const SideBar: () => ReactElement = () => {
  const [profiles, setProfiles] = React.useState<ProfilesStorage[]>([]);
  const [activeProfileId, setActiveProfileId] = React.useState<string | null>(null);
  const [activePrompts, setActivePrompts] = React.useState<Prompt[]>([]);

  const createProfile = (name: string): void => {
    const profile: ProfilesStorage = {
      id: uuid(),
      name,
      prompts: {
        version: '1.0.0',
        generator: 'chatcrafter',
        prompts: []
      },
      editable: true
    };
    void profilesStorage([profile]).then(() => {
      setProfiles([profile, ...profiles]);
      setActiveProfileId(profile.id);
      setActivePrompts(profile.prompts.prompts);
    });
  };

  const openProfile = (id: string): void => {
    const profile = profiles.find((profile) => profile.id === id);
    if (profile != null) {
      setActiveProfileId(profile.id);
      setActivePrompts(profile.prompts.prompts);
    }
  };

  const loadProfiles = (openProfilId?: string): void => {
    void profilesStorageGet().then((profiles) => {
      setProfiles(profiles);
      if (profiles.length === 0) {
        return;
      }
      if (openProfilId === undefined) {
        setActiveProfileId(profiles[0].id);
        setActivePrompts(profiles[0].prompts.prompts);
        return;
      }
      const profile = profiles.find((profile) => profile.id === openProfilId);
      if (profile != null) {
        setActiveProfileId(profile.id);
        setActivePrompts(profile.prompts.prompts);
      }
    });
  };

  useEffect(loadProfiles, []);

  return (<>
    {profiles.length > 0 && activeProfileId !== null && (
      <>
        <ProfilePicker profiles={profiles} selectedProfile={profiles[0].id} onProfileSelect={(id) => { openProfile(id); }} actions={{
          createProfile,
          loadList: () => {}
        }
        }/>
        <PromptList prompts={activePrompts} onDelete={(promptId) => {
          void profilesPromptsRemove(activeProfileId, promptId).then(() => {
            loadProfiles(activeProfileId);
          });
        }}/>
      </>
    )}
    {profiles.length === 0 && (
      <div>Missing Profiles</div>
    )}
  </>);
};
