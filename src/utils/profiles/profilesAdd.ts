import { type ProfilesStorage } from '../../types/profilesStorage';
import browser from 'webextension-polyfill';
import { profilesGetStorage } from './profilesGet';
import { type Prompt } from '../../types/prompt';

/** Set profiles to storage and overwrites old */
export const profilesAddStorageSet = async (storage: ProfilesStorage[]): Promise<void> => {
  await browser.storage.local.set({ profiles: storage });
};

/** Add profiles to storage */
export const profilesAddStorage = async (storage: ProfilesStorage[]): Promise<void> => {
  const current = await profilesGetStorage();
  current.push(...storage);
  await profilesAddStorageSet(current);
};

/** Add prompt to profile */
export const profilesAddPrompt = async (profileId: string, prompt: Prompt): Promise<void> => {
  const storage = await profilesGetStorage();
  const profile = storage.find((p) => p.id === profileId);
  if (profile != null) {
    profile.prompts.prompts.push(prompt);
    await profilesAddStorageSet(storage);
  }
};
