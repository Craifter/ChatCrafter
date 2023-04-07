import React, { type ReactElement } from 'react'
import { PromptList } from './components/PromptList'
import { type Prompt } from '../types/prompt'

const promts: Prompt[] = [
  {
    id: 'name-generator',
    name: 'name generator',
    description: 'Gives names for a gender',
    prompt: 'Give me names for a {{gender}}',
    variables: [
      {
        name: 'gender',
        type: 'string',
        description: 'Girl or Boy'
      }
    ],
    tags: [
      'person',
      'names'
    ],
    metadata: {
      author: 'Craifter',
      creation_date: '2023-04-05',
      source: 'https://github.com/Craifter/oprm'
    },
    model: {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5',
      maxLength: 12000,
      tokenLimit: 4000
    }
  }
]

export const SideBar: () => ReactElement = () => <PromptList onDeletePrompt={() => { }} onUpdatePrompt={() => { }} prompts={promts} />
