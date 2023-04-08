import axios from 'axios'
import { type Prompts } from '../types/prompts'
import { validatePrompts } from './validatePrompts'

/**
 * Fetch prompts from JSON
 * @param url
 */
export async function fetchPromptsFromJSON (url: string): Promise<Prompts> {
  const response = await axios.get(url)
  return validatePrompts(response.data)
}

/**
 * Fetch prompts from OPRM
 * @param url
 */
export async function fetchPromptsFromOPRM (url: string): Promise<Prompts> {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  const data = new TextDecoder('utf-8').decode(new Uint8Array(response.data))
  return validatePrompts(JSON.parse(data))
}
