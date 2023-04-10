import React, { type FC } from 'react'
import { PromptCard, type PromptCardProps } from '../../../components/PromptCard'

export interface PromptsShowPromptsProps {

}

export const PromptsShowPrompts: FC<PromptsShowPromptsProps> = () => {
  const devLoremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
  const devLoremIpsumArray = devLoremIpsum.split(' ')
  const prompts: PromptCardProps[] = [
    {
      name: 'Test Prompt',
      description: devLoremIpsum,
      prompt: devLoremIpsum,
      variables: devLoremIpsumArray,
      tags: devLoremIpsumArray,
      modelName: 'Test Prompt',
      author: 'Test Prompt',
      source: 'https://raw.githubusercontent.com/Craifter/oprm/main/examples/examples.oprm'
    }
  ]

  for (let i = 0; i < 20; i++) {
    prompts.push({
      name: 'Test Prompt',
      description: devLoremIpsum.slice(0, devLoremIpsum.length - 20 * i),
      prompt: devLoremIpsum.slice(0, devLoremIpsum.length - 20 * i),
      variables: devLoremIpsumArray.slice(0, devLoremIpsumArray.length - 10 * i),
      tags: devLoremIpsumArray.slice(0, devLoremIpsumArray.length - 10 * i),
      modelName: 'Test Prompt',
      source: 'https://raw.githubusercontent.com/Craifter/oprm/main/examples/examples.oprm',
      author: 'Test Prompt'
    })
  }

  return (
    <>
      <div className={'text-xl font-bold dark:text-white mb-4'}>
        TODO: Search Field/Filters
      </div>
      <div className={'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 3xl:columns-5 4xl:columns-6 gap-4'}>
        {prompts.map((prompt, index) => (
          <div key={index} className={'w-full break-inside-avoid-column mb-4'}>
            <PromptCard {...prompt} />
          </div>
        ))}
      </div>
    </>
  )
}
