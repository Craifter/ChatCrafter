import axios from 'axios'
import { type Prompts } from '../../types/prompts'
import { promptsValidate } from './promptsValidate'

/**
 * Fetch prompts from JSON
 * @param url
 */
export async function fetchPromptsFromJSON (url: string): Promise<Prompts> {
  const response = await axios.get(url)
  return promptsValidate(response.data)
}

/**
 * Fetch prompts from OPRM
 * @param url
 */
export async function fetchPromptsFromOPRM (url: string): Promise<Prompts> {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  const data = new TextDecoder('utf-8').decode(new Uint8Array(response.data))
  return promptsValidate(JSON.parse(data))
}
