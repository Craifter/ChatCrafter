import React, { type FC, type ReactNode, useState } from 'react';
import { Button } from '../../components/Button';
import { IconFile, IconLink, IconPackageImport, IconPlus } from '@tabler/icons-react';
import { ICON_SIZE } from '../../constants';
import { PromptsShowPrompts } from './prompts/PromptsShowPrompts';
import { PromptsSourceListsPrompts } from './prompts/PromptsSourceLists';
import { PromptsPastePrompts } from './prompts/PromptsPastePrompts';

const menuItems: Array<{
  label: string
  icon: ReactNode
  pageContent: ReactNode
}> = [{
  label: 'Show Prompts',
  icon: <IconPackageImport size={ICON_SIZE}/>,
  pageContent: <PromptsShowPrompts/>
}, {
  label: 'Show Source Lists',
  icon: <IconLink size={ICON_SIZE}/>,
  pageContent: <PromptsSourceListsPrompts/>
}, {
  label: 'Paste Prompts',
  icon: <IconFile size={ICON_SIZE}/>,
  pageContent: <PromptsPastePrompts/>
}];

export interface OptionsPageOwnPromptsProps {
}

export const OptionsPagesPrompts: FC<OptionsPageOwnPromptsProps> = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  const addPrompt = (): void => {
    console.log('Add Prompt'); // todo open prompt overlay
  };

  return (
    <div className={'flex flex-col'}>
      <div className={'scrollbar flex flex-nowrap overflow-x-auto gap-2 pb-2'}>
        {menuItems.map((menuItem, index) => (<Button
            key={menuItem.label}
            icon={menuItem.icon}
            onClick={() => {
              setSelectedMenuItem(index);
            }}
            extendButtonClass={selectedMenuItem === index ? 'underline underline-offset-2' : ''}
          >
            {menuItem.label}
          </Button>))}
        <Button icon={<IconPlus size={ICON_SIZE}/>} onClick={() => { addPrompt(); }}> Create Prompt </Button>
      </div>
      <div className={'flex-grow mt-4'}>
        {menuItems[selectedMenuItem].pageContent}
      </div>
    </div>
  );
};
