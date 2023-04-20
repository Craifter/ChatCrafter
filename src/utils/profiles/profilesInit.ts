import { DEFAULT_PROMPTS } from '../../constants';
import { profilesStorageGet, profilesStorageSet } from './profilesStorage';
import { type ProfilesStorage } from '../../types/profilesStorage';


/**
 * Initialize profiles with default profile if empty
 */
export const profilesInit = async (): Promise<void> => {
  const defaultProfile: ProfilesStorage = {
    ...DEFAULT_PROMPTS,
    editable: true
  };
  let storage = await profilesStorageGet();
  if (storage == null || storage.length === 0) {
    storage = [
      defaultProfile
    ];
    await profilesStorageSet(storage);
  }
};
