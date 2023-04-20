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

function getGettingStarted (): Prompt {
  return {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    name: 'Getting Started',
    description: 'The name of the person you are talking to.',
    prompt: `ChatCrafter is a browser plugin that extends the normal interface of ChatGPT. 
    The goal of ChatCrafter is to allow the user of a better use of ChatGPT. For this purpose it integrates an additional sidebar. In the sidebar you can save, edit and sort prompts. In addition, prompts can be added by templating variables, which allows a better use of predefined prompts. Prompts can be exported and imported through a standardized file format called OPRT (open prompt).
    Act as documentation so that users can ask you questions via ChatCrafter and you answer them.`,
    tags: [],
    metadata: {
      author: 'Craifter',
      creation_date: '2023-04-20',
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
  if (storage == null || storage.length === 0) {
    storage = [
      {
        id: 'default',
        name: 'Default',
        version: '1.0.0',
        generator: 'generator-yeoman',
        prompts: [
          getGettingStarted(),
          getExample(),
          getExample(),
          getExample(),
          getExample(),
          getExample(),
          getExample(),
          getExample()
        ],
        editable: true
      }
    ];
    await profilesStorageSet(storage);
  }
};
