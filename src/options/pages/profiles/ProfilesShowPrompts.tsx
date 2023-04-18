import React, { type FC } from 'react';
import { PromptCard, type PromptCardActions } from '../../../components/PromptCard';
import { type Prompt } from '../../../types/prompt';
import { Button } from '../../../components/Button';

export interface ProfilesShowPromptsProps {
  prompts: Prompt[]
  onAddPrompt: () => void
  cardActions: PromptCardActions[]
}

export const ProfilesShowPrompts: FC<ProfilesShowPromptsProps> = ({
  prompts,
  onAddPrompt,
  cardActions
}) => {
  return (
    <>
      <div className={'text-xl font-bold dark:text-white mb-4 flex'}>
        <Button onClick={onAddPrompt}>Add Prompt</Button>
      </div>
      <div className={'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 3xl:columns-5 4xl:columns-6 gap-4'}>
        {prompts.map((prompt, index) => (
          <div key={index} className={'w-full break-inside-avoid-column mb-4'}>
            <PromptCard prompt={prompt} actions={cardActions} />
          </div>
        ))}
      </div>
    </>
  );
};
