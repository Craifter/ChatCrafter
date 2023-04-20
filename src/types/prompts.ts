import { type Prompt } from './prompt';

export interface Prompts {
  id: string
  name: string
  version: string
  generator: string
  prompts: Prompt[]
}
