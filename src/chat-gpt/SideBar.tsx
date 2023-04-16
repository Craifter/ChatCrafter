import './chat-gpt.css';
import React, { type ReactElement, useEffect } from 'react';
import { type Prompt } from '../types/prompt';
import { ProfilePicker } from './components/ProfilePicker';
import { type ProfilesStorage } from '../types/profilesStorage';
import { PromptList } from './components/PromptList';
import { profilesStorage, profilesStorageGet } from '../utils/profiles/profilesStorage';
import { uuid } from '../utils/uuid';
import {
  profilesPromptsAdd,
  profilesPromptsById,
  profilesPromptsRemove,
  profilesPromptsUpdate
} from '../utils/profiles/profilesPrompts';
import { IconPlus } from '@tabler/icons-react';
import { ICON_SIZE } from '../constants';
import { VariableModal } from '../components/VariableModal';
import { injectPrompt } from './injectors';
import { buildPromptString } from '../utils/prompts/promptTemplateWriter';
import { PromptModal } from '../components/Promt/PromptModal';

export const SideBar: () => ReactElement = () => {
  const [profiles, setProfiles] = React.useState<ProfilesStorage[]>([]);
  const [activeProfileId, setActiveProfileId] = React.useState<string | null>(null);
  const [activePrompts, setActivePrompts] = React.useState<Prompt[]>([]);

  const [activeVariableModal, setActiveVariableModal] = React.useState<Prompt | null>(null);
  const [activePromptModal, setActivePromptModal] = React.useState<Prompt | null>(null);
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

  const deletePrompt = (profileId: string, promptId: string): void => {
    void profilesPromptsRemove(profileId, promptId).then(() => {
      loadProfiles(profileId);
    });
  };

  const changePromptName = (profileId: string, promptId: string, newName: string): void => {
    void profilesPromptsById(profileId, promptId).then((prompt) => {
      prompt.name = newName;
      void profilesPromptsUpdate(profileId, prompt).then(() => {
        loadProfiles(profileId);
      });
    });
  };

  const getPrompt = (promptId: string): Prompt => {
    return activePrompts.find((prompt) => prompt.id === promptId) as Prompt;
  };

  const profilePickerActions = {
    createProfile: (name: string): void => {
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
    },
    openOptions: () => {
      console.log('//todo open options page');
      // todo: send message to service worker to open options page
    }
  };

  const handleSubmit = (updatedVariables: string[]): void => {
    if (activeVariableModal === null) {
      return;
    }
    const message = buildPromptString(activeVariableModal, updatedVariables);

    if (message !== undefined) {
      injectPrompt(message);
    }

    setActiveVariableModal(null);
  };

  return (<>
    {profiles.length > 0 && activeProfileId !== null && (
      <>
        <ProfilePicker
          profiles={profiles}
          selectedProfile={profiles[0].id}
          onProfileSelect={(id) => { openProfile(id); }} actions={profilePickerActions} />
        <PromptList
          prompts={activePrompts}
          onDelete={(promptId) => { deletePrompt(activeProfileId, promptId); }}
          onNameChange={(promptId, newName) => { changePromptName(activeProfileId, promptId, newName); }}
          onSelect={(promptId) => {
            setActiveVariableModal(getPrompt(promptId));
          }} />
        <div>
          <button className={'cc-sidebar__add-prompt'} onClick={() => {
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
          }
          }>
            <IconPlus size={ICON_SIZE} />
            Add Prompt
          </button>
          <div className={'cc-sidebar__info'} onClick={profilePickerActions.openOptions}>
            <span className={'cc-sidebar__info__options'}>
              Options
            </span>
            ChatCrafter v0.0.1
          </div>
        </div>
        {activeVariableModal !== null && (
          <VariableModal
            prompt={activeVariableModal}
            onClose={() => { setActiveVariableModal(null); }}
            variables={activeVariableModal.variables.map((variable) => {
              return variable.name;
            })}
            onSubmit={handleSubmit} />
        )}
        {activePromptModal !== null && (
          <PromptModal
            prompt={activePromptModal}
            onClose={() => { setActivePromptModal(null); }}
            onUpdatePrompt={(newPrompt) => {
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
            }} />
        )}
      </>
    )}
    {profiles.length === 0 && (
      <div>Missing Profiles</div>
    )}
  </>);
};
