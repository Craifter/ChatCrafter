import { type Prompts } from './prompts';

/** Storage for profiles */
export type ProfilesStorage = Prompts & {
  editable: boolean
}
