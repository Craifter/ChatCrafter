import { profilesStorageById, profilesStorageUpdate } from './profilesStorage';
import { type Prompt } from '../../types/prompt';

/** Add prompt to profile */
export const profilesPromptsAdd = async (profileId: string, prompt: Prompt): Promise<void> => {
  const profile = await profilesStorageById(profileId);
  const index = profile.prompts.findIndex((p) => p.id === prompt.id);
  if (index !== -1) {
    profile.prompts[index] = prompt;
  } else {
    profile.prompts.push(prompt);
  }
  await profilesStorageUpdate(profile);
};

/** Remove prompt from profile */
export const profilesPromptsRemove = async (profileId: string, promptId: string): Promise<void> => {
  const profile = await profilesStorageById(profileId);
  const index = profile.prompts.findIndex((p) => p.id === promptId);
  if (index === -1) {
    throw new Error('Prompt not found ' + promptId + ' in ' + profileId + ' profile');
  }
  profile.prompts.splice(index, 1);
  await profilesStorageUpdate(profile);
};

/** Update prompt in profile */
export const profilesPromptsUpdate = async (profileId: string, prompt: Prompt): Promise<void> => {
  const profile = await profilesStorageById(profileId);
  const index = profile.prompts.findIndex((p) => p.id === prompt.id);
  if (index === -1) {
    throw new Error('Prompt not found ' + prompt?.id + ' in ' + profileId + ' profile');
  }
  profile.prompts[index] = prompt;
  await profilesStorageUpdate(profile);
};

export const profilesPromptsById = async (profileId: string, promptId: string): Promise<Prompt> => {
  const profile = await profilesStorageById(profileId);
  const prompt = profile.prompts.find((p) => p.id === promptId);
  if (prompt == null) {
    throw new Error('Prompt not found ' + promptId + ' in ' + profileId + ' profile');
  }
  return prompt;
};
