import { type Prompt } from './prompt';

export interface Prompts {
  version: string
  generator: string
  prompts: Prompt[]
}
