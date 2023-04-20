import { type Prompts } from './types/prompts';
import { uuid } from './utils/uuid';

export const EXAMPLE_PROMPTS_URL = 'https://github.com/Craifter/oprm/blob/main/examples/examples.oprm';
export const CHATGPT_URL = 'https://chat.openai.com/chat';
export const SUPPORT_CHATCRAFTER = 'https://youtu.be/dQw4w9WgXcQ';
export const ICON_SIZE = 16;
export const CHATCRAFTER_DESCRIPTION = 'A browser extension that enhances the ChatGPT interface by providing prompt templates in the OPRM (Open Prompt) format, making it easier to write and use prompts. Streamline the process of crafting effective messages with customizable prompts featuring variables.';

export const DEFAULT_PROMPTS: Prompts = {
  version: '1.0.0',
  generator: 'Craifter',
  name: 'Default',
  id: uuid(),
  prompts: [
    {
      id: uuid(),
      name: 'Getting Started',
      description: 'A promts to getting started with ChatCrafter',
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
    },
    {
      id: uuid(),
      name: 'Example variable',
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
        creation_date: '2023-04-20',
        source: ''
      },
      model: {}
    }
  ]
};
