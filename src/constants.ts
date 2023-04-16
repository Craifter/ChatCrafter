import { type Prompts } from './types/prompts';

export const EXAMPLE_PROMPTS_URL = 'https://github.com/Craifter/oprm/blob/main/examples/examples.oprm';
export const CHATGTP_URL = 'https://chat.openai.com/chat';
export const SUPPORT_CHATCRAFTER = 'https://youtu.be/dQw4w9WgXcQ';
export const ICON_SIZE = 16;
export const CHATCRAFTER_DESCRIPTION = 'A browser extension that enhances the ChatGPT interface by providing prompt templates in the OPRM (Open Prompt) format, making it easier to write and use prompts. Streamline the process of crafting effective messages with customizable prompts featuring variables.';

export const DEFAULT_PROMPTS: Prompts = {
  version: '1.0.0',
  generator: 'Craifter',
  prompts: [
    {
      id: 'default',
      name: 'name',
      description: 'The name of the person you are talking to.',
      prompt: 'Hi, my name is {{name}}.',
      variables: [{
        name: 'name',
        description: 'The name of the person you are talking to.',
        type: 'string'
      }],
      tags: [],
      metadata: {
        author: 'Craifter',
        creation_date: '1997-08-29',
        source: ''
      },
      model: {}
    }
  ]
};
