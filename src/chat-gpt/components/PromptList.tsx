import { type Prompt } from '../../types/prompt'
import React, { type FC } from 'react'
import { PromptComponent } from './PromptComponent'

interface Props {
  prompts: Prompt[]
  onUpdatePrompt: (prompt: Prompt) => void
  onDeletePrompt: (prompt: Prompt) => void
}

export const PromptList: FC<Props> = ({
  prompts,
  onUpdatePrompt,
  onDeletePrompt
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {prompts
        .slice()
        .reverse()
        .map((prompt, index) => (
          <PromptComponent
            key={index}
            prompt={prompt}
            onUpdatePrompt={onUpdatePrompt}
            onDeletePrompt={onDeletePrompt}
          />
        ))}
    </div>
  )
}
