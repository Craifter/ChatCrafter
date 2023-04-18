import React, { type FC, type ReactNode, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { IconCopy, IconPackageImport, IconPencil, IconPlus, IconSettings, IconTrash } from '@tabler/icons-react';
import { ICON_SIZE } from '../../constants';
import { ProfilesShowPrompts } from './profiles/ProfilesShowPrompts';
import { ProfilesEdit } from './profiles/ProfilesEdit';
import { type ProfilesStorage } from '../../types/profilesStorage';
import { type Prompt } from '../../types/prompt';
import { profilesStorageGet, profilesStorageRemove, profilesStorageUpdate } from '../../utils/profiles/profilesStorage';
import { uuid } from '../../utils/uuid';
import { PromptModal } from '../../components/Promt/PromptModal';
import { profilesPromptsAdd, profilesPromptsRemove } from '../../utils/profiles/profilesPrompts';
import { exportProfile } from '../../utils/profiles/profilesExport';
import { profilesInit } from '../../utils/profiles/profilesInit';
import { profilesImport } from '../../utils/profiles/profilesImport';
import { type PromptCardActions } from '../../components/PromptCard';

export interface OptionsPageProfilesProps { }

export const OptionsPagesProfiles: FC<OptionsPageProfilesProps> = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [profiles, setProfiles] = useState<ProfilesStorage[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [activeProfile, setActiveProfile] = useState<ProfilesStorage | null>(null);

  const [activePromptModal, setActivePromptModal] = useState<Prompt | null>(null);

  const profilesShowPromptsActions: PromptCardActions[] = [
    {
      label: 'Delete Prompt',
      icon: <IconTrash size={ICON_SIZE}/>,
      action: async (prompt) => {
        if (activeProfileId == null) return;
        await profilesPromptsRemove(activeProfileId, prompt.id);
        loadProfiles();
      }
    },
    {
      label: 'Duplicate Prompt',
      icon: <IconCopy size={ICON_SIZE}/>,
      action: (prompt) => {
        setActivePromptModal({
          ...prompt,
          id: uuid()
        });
      }
    },
    {
      label: 'Edit Prompt',
      icon: <IconPencil size={ICON_SIZE}/>,
      action: (prompt) => {
        setActivePromptModal(prompt);
      }
    }
  ];

  const menuItems: Array<{
    label: string
    icon: ReactNode
    pageContent: ReactNode
  }> = [{
    label: 'Show Prompts',
    icon: <IconPackageImport size={ICON_SIZE}/>,
    pageContent: <ProfilesShowPrompts prompts={activeProfile !== null ? activeProfile.prompts.prompts : []} onAddPrompt={() => {
      setActivePromptModal({
        id: uuid(),
        name: 'New Prompt',
        description: '',
        metadata: {
          author: '',
          creation_date: new Date().toISOString(),
          source: ''
        },
        prompt: '',
        variables: [],
        model: '',
        tags: []
      });
    }} cardActions={profilesShowPromptsActions}/>
  }, {
    label: 'Profile Settings',
    icon: <IconSettings size={ICON_SIZE}/>,
    pageContent: <ProfilesEdit
      profileName={activeProfile !== null ? activeProfile.name : ''}
      onSave={async (options) => {
        const currentProfile = profiles.find((profile) => profile.id === activeProfileId);
        if (currentProfile == null) {
          return;
        }
        const newProfile = {
          ...currentProfile,
          name: options.name
        };
        await profilesStorageUpdate(newProfile);
        loadProfiles();
      }}
      onExportProfile={async () => {
        if (activeProfileId === null) {
          return;
        }
        await exportProfile(activeProfileId);
      }}
      onDeleteProfile={async () => {
        if (activeProfileId === null) {
          return;
        }

        const confirmDelete = confirm('Are you sure you want to delete this profile?');
        if (!confirmDelete) {
          return;
        }
        void await profilesStorageRemove(activeProfileId);
        loadProfiles();
      }}/>
  }/* {
    label: 'Show Source Lists',
    icon: <IconLink size={ICON_SIZE}/>,
    pageContent: <ProfilesSourceListsPrompts/>
  } */];

  const openProfile = (id: string): void => {
    const profile = profiles.find((profile) => profile.id === id);
    if (profile != null) {
      setActiveProfileId(profile.id);
      setActiveProfile(profile);
    }
  };

  const loadProfiles = (openProfilId?: string): void => {
    void profilesStorageGet().then(async (profiles) => {
      if (profiles.length === 0) {
        await profilesInit();
        profiles = await profilesStorageGet();
      }
      setProfiles(profiles);
      if (openProfilId === undefined) {
        setActiveProfileId(profiles[0].id);
        setActiveProfile(profiles[0]);
        return;
      }
      const profile = profiles.find((profile) => profile.id === openProfilId);
      if (profile != null) {
        setActiveProfileId(profile.id);
        setActiveProfile(profile);
      }
    });
  };

  useEffect(loadProfiles, []);

  return (<>
      <div className={'flex flex-col'}>
        <div className={'scrollbar flex flex-nowrap overflow-x-auto gap-2 pb-2 text-white'}>
          <select
            className={'border border-blue-500 dark:border-blue-950 rounded-md bg-blue-500 dark:bg-blue-950 hover:bg-blue-700 pt-1 pl-4 pr-8 h-8'}
            value={activeProfileId ?? ''}
            onChange={(event) => { openProfile(event.target.value); }}>
            {profiles.map((profile) => (
              <option className={'select-option active:bg-black'} key={profile.id} value={profile.id}>{profile.name}</option>
            ))}
          </select>
          {menuItems.map((menuItem, index) => (
            <Button
            key={menuItem.label}
            icon={menuItem.icon}
            onClick={() => { setSelectedMenuItem(index); }}
            extendButtonClass={selectedMenuItem === index ? 'underline underline-offset-2' : ''}>
            {menuItem.label}
          </Button>
          ))}
          <Button icon={<IconPlus size={ICON_SIZE}/>} onClick={async () => {
            const newProfileId = await profilesImport();
            loadProfiles(newProfileId);
          }}> Import new Profile </Button>
          <Button icon={<IconPlus size={ICON_SIZE}/>} onClick={() => {}}>
            Create new Profile
          </Button>
        </div>
        <div className={'flex-grow mt-4'}>
          {menuItems[selectedMenuItem].pageContent}
        </div>
      </div>
      {activePromptModal !== null && (<PromptModal
          prompt={activePromptModal}
          onClose={() => {
            setActivePromptModal(null);
          }}
          onUpdatePrompt={(newPrompt) => {
            if (activeProfileId === null) {
              return;
            }
            const variables: Array<{
              name: string
              type: string
              description: string
            }> = [];

            const regex = /{{(.*?)}}/g;
            let m;
            while ((m = regex.exec(newPrompt.prompt)) !== null) {
              if (m.index === regex.lastIndex) {
                regex.lastIndex++;
              }
              m.forEach((match, groupIndex) => {
                if (groupIndex === 1) {
                  variables.push({
                    name: match,
                    type: 'string',
                    description: ''
                  });
                }
              });
            }

            if (variables.length > 0) {
              newPrompt.variables = variables;
            }

            void profilesPromptsAdd(activeProfileId, {
              ...newPrompt,
              variables
            }).then(() => {
              loadProfiles(activeProfileId);
              setActivePromptModal(null);
            });
          }}/>)}
    </>);
};
