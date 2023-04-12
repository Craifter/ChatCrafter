import { type ProfilesStorage } from '../../types/profilesStorage';
import browser from 'webextension-polyfill';

/** Get all profiles from storage */
export const profilesGetStorage = async (): Promise<ProfilesStorage[]> => {
  const storage = await browser.storage.local.get('profiles');
  return storage.profiles;
};
