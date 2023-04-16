import { DEFAULT_PROMPTS } from '../../constants';
import { profilesStorageGet, profilesStorageSet } from './profilesStorage';
import { type Prompt } from '../../types/prompt';

function getExample (): Prompt {
  return {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    name: 'name ' + Math.random().toString(36).substring(2, 6),
    description: 'The name of the person you are talking to.',
    prompt: 'Hi, my name is {{name}}.',
    variables: DEFAULT_PROMPTS.prompts[0].variables,
    tags: [],
    metadata: {
      author: 'Craifter',
      creation_date: '1997-08-29',
      source: ''
    },
    model: {}
  };
}

/**
 * Initialize profiles with default profile if empty
 */
export const profilesInit = async (): Promise<void> => {
  let storage = await profilesStorageGet();
  if (storage == null) {
    storage = [
      {
        id: 'default',
        name: 'Default',
        prompts: DEFAULT_PROMPTS,
        editable: false
      },
      {
        id: 'default2',
        name: 'Default 2',
        prompts: {
          version: '1.0.0',
          generator: 'generator-yeoman',
          prompts: [
            getExample(),
            getExample(),
            getExample(),
            getExample(),
            getExample(),
            getExample(),
            getExample()
          ]
        },
        editable: false
      }
    ];
    await profilesStorageSet(storage);
  }
};
