import { profilesGetStorage } from './profilesGet';
import { DEFAULT_PROMPTS } from '../../constants';
import { profilesAddPrompt, profilesAddStorageSet } from './profilesAdd';

/**
 * Initialize profiles with default profile if empty
 */
export const profilesInit = async (): Promise<void> => {
  let storage = await profilesGetStorage();
  if (storage == null) {
    storage = [
      {
        id: 'default',
        prompts: DEFAULT_PROMPTS
      }
    ];
    await profilesAddStorageSet(storage);
  }
  await profilesAddPrompt('default', DEFAULT_PROMPTS.prompts[0]);
};
