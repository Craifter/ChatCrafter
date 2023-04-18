import React, { type FC, type ReactNode } from 'react';
import { type Prompt } from '../types/prompt';
import { Button } from './Button';

export interface PromptCardActions {
  label: string
  icon: ReactNode
  action: (prompt: Prompt) => void
}
export interface PromptCardProps {
  prompt: Prompt
  actions: PromptCardActions[]
}

export const PromptCard: FC<PromptCardProps> = ({
  prompt,
  actions
}) => {
  return (<div
    className={'flex flex-col w-full p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-base dark:text-white'}>
    <div className={'flex flex-col'}>
      <h1 className={'text-2xl font-bold dark:text-white'}>{prompt.name}</h1>
      <p className={'overflow-x-auto scrollbar max-h-16'}>{prompt.description}</p>
    </div>
    <div className={'flex flex-col mt-2'}>
      <h1 className={'text-xl font-bold dark:text-white'}>Prompt</h1>
      <p className={'overflow-x-auto scrollbar max-h-32'}>{prompt.prompt}</p>
    </div>
    {prompt.variables.length > 0 && (<div className={'flex'}>
        <b className={'pr-2'}>Variables:</b>
        <div className={'flex flex-nowrap overflow-y-auto scrollbar whitespace-nowrap'}>{prompt.variables.join(', ')}</div>
      </div>)}
    {prompt.tags.length > 0 && (<div className={'flex'}>
        <b className={'pr-2'}>Tags:</b>
        <div className={'flex flex-nowrap overflow-y-auto scrollbar whitespace-nowrap'}>{prompt.tags.join(', ')}</div>
      </div>)}
    {typeof prompt.model === 'string' && prompt.model.length > 0 && (<div>
        <b>Model:</b> {prompt.model}
      </div>)}
    {prompt.metadata.source !== undefined && prompt.metadata.source.length > 0 && (<div className={'overflow-y-auto scrollbar'}>{prompt.metadata.source}</div>)}
    {prompt.metadata.author !== undefined && prompt.metadata.author.length > 0 && (<div>Created by <b>{prompt.metadata.author}</b></div>)}
    {actions.length > 0 && (<div className={'flex flex-row mt-2 gap-4'}>
        {actions.map((action, index) => (
          <Button titel={action.label} extendButtonClass={'pr-3 last:ml-auto'} key={index} onClick={() => { action.action(prompt); }} icon={action.icon}></Button>
        ))}
    </div>)}
  </div>);
};
