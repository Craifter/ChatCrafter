import { DEFAULT_PROMPTS } from '../../constants';
import { profilesStorageGet, profilesStorageSet } from './profilesStorage';

/**
 * Initialize profiles with default profile if empty
 */
export const profilesInit = async (): Promise<void> => {
  let storage = await profilesStorageGet();
  if (storage == null) {
    storage = [
      {
        id: 'default',
        prompts: DEFAULT_PROMPTS
      }
    ];
    await profilesStorageSet(storage);
  }
};
