import React, { type FC } from 'react';
import { PromptCard, type PromptCardProps } from '../../../components/PromptCard';
import { type Prompt } from '../../../types/prompt';
import { Button } from '../../../components/Button';

export interface ProfilesShowPromptsProps {
  prompts: Prompt[]
  onAddPrompt: () => void
}

export const ProfilesShowPrompts: FC<ProfilesShowPromptsProps> = ({
  prompts,
  onAddPrompt
}) => {
  const cardPrompts: PromptCardProps[] = prompts.map((prompt) => ({
    name: prompt.name,
    description: prompt.description,
    prompt: prompt.prompt,
    variables: prompt.variables.map((variable) => variable.name),
    tags: prompt.tags,
    modelName: prompt.model,
    author: prompt.metadata.author,
    source: prompt.metadata.source
  }));

  return (
    <>
      <div className={'text-xl font-bold dark:text-white mb-4 flex'}>
        <Button onClick={onAddPrompt}>Add Prompt</Button>
      </div>
      <div className={'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 3xl:columns-5 4xl:columns-6 gap-4'}>
        {cardPrompts.map((prompt, index) => (
          <div key={index} className={'w-full break-inside-avoid-column mb-4'}>
            <PromptCard {...prompt} />
          </div>
        ))}
      </div>
    </>
  );
};
