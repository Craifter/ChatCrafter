import { type Prompts } from './prompts';

/** Storage for profiles */
export interface ProfilesStorage {
  /** Profile id */
  id: string
  /** Profile name */
  name: string
  /** Profile prompts */
  prompts: Prompts
  /** if Profile is editable */
  editable: boolean
}
