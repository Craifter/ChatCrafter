import { type Prompts } from './prompts';

/** Storage for profiles */
export interface ProfilesStorage {
  /** Profile id */
  id: string
  /** Profile prompts */
  prompts: Prompts
}
