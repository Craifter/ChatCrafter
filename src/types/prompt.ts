export interface PromptVariable {
  name: string
  type: string
  description?: string
  default?: string
}

export interface Prompt {
  id: string
  name: string
  description?: string
  prompt: string
  variables?: PromptVariable[]
  tags?: string[]
  metadata?: {
    author: string
    creation_date: string
    source: string
  }
  model?: any
}
