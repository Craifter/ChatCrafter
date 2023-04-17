import React, { type FC } from 'react';

export interface PromptCardProps {
  name: string
  description: string
  prompt: string
  variables: string[]
  tags: string[]
  modelName: string
  author: string
  source: string
}

export const PromptCard: FC<PromptCardProps> = ({
  name,
  description,
  prompt,
  variables,
  tags,
  modelName,
  author,
  source
}) => {
  return (<div
    className={'flex flex-col w-full p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-base dark:text-white'}>
    <div className={'flex flex-col'}>
      <h1 className={'text-2xl font-bold dark:text-white'}>{name}</h1>
      <p className={'overflow-x-auto scrollbar max-h-16'}>{description}</p>
    </div>
    <div className={'flex flex-col mt-2'}>
      <h1 className={'text-xl font-bold dark:text-white'}>Prompt</h1>
      <p className={'overflow-x-auto scrollbar max-h-32'}>{prompt}</p>
    </div>
    {variables.length > 0 && (<div className={'flex'}>
        <b className={'pr-2'}>Variables:</b>
        <div className={'flex flex-nowrap overflow-y-auto scrollbar whitespace-nowrap'}>{variables.join(', ')}</div>
      </div>)}
    {tags.length > 0 && (<div className={'flex'}>
        <b className={'pr-2'}>Tags:</b>
        <div className={'flex flex-nowrap overflow-y-auto scrollbar whitespace-nowrap'}>{tags.join(', ')}</div>
      </div>)}
    {typeof modelName === 'string' && modelName.length > 0 && (<div>
        <b>Model:</b> {modelName}
      </div>)}
    {source !== undefined && source.length > 0 && (<div className={'overflow-y-auto scrollbar'}>{source}</div>)}
    {author !== undefined && author.length > 0 && (<div>Created by <b>{author}</b></div>)}
  </div>);
};
