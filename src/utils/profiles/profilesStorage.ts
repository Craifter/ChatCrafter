import { type ProfilesStorage } from '../../types/profilesStorage';
import browser from 'webextension-polyfill';

/** Set profiles to storage and overwrites old */
export const profilesStorageSet = async (storage: ProfilesStorage[]): Promise<void> => {
  await browser.storage.local.set({ profiles: storage });
};

/** Add profiles to storage */
export const profilesStorage = async (storage: ProfilesStorage[]): Promise<void> => {
  const current = await profilesStorageGet();
  current.push(...storage);
  await profilesStorageSet(current);
};

/** Update profile in storage */
export const profilesStorageUpdate = async (profile: ProfilesStorage): Promise<void> => {
  const current = await profilesStorageGet();
  const index = current.findIndex((p) => p.id === profile.id);
  if (index === -1) {
    throw new Error('Profile not found');
  }
  current[index] = profile;
  await profilesStorageSet(current);
};

/** Get profile by id from storage */
export const profilesStorageById = async (id: string): Promise<ProfilesStorage> => {
  const storage = await profilesStorageGet();
  const profile = storage.find((p) => p.id === id);
  if (profile == null) {
    throw new Error('Profile not found');
  }
  return profile;
};

/** Get all profiles from storage */
export const profilesStorageGet = async (): Promise<ProfilesStorage[]> => {
  const storage = await browser.storage.local.get('profiles');
  return storage.profiles;
};

/** Listen for profiles changes */
export const profilesListenerStorage = (setState: (state: ProfilesStorage[]) => void): void => {
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.profiles != null) {
      setState(changes.profiles.newValue);
    }
  });
};
