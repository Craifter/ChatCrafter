import { type Prompt } from '../../types/prompt';
import React, { useState, type FC, useRef } from 'react';
import { PromptComponent } from './PromptComponent';
import { VariableModal } from '../VariableModal';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [variables, setVariables] = useState<string[]>([]);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [value, setValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (updatedVariables: string[]): void => {
    const newContent = value?.replace(/{{(.*?)}}/g, (match, variable) => {
      const index = variables.indexOf(variable);
      return updatedVariables[index];
    });

    setValue(newContent);
    // onChangePrompt(newContent);

    if ((textareaRef?.current) != null) {
      textareaRef.current.focus();
    }
  };

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
        <p>d</p>
        <button>d</button>
      {/* {isModalVisible && (
        <VariableModal
          prompt={prompts[activePromptIndex]}
          variables={variables}
          onSubmit={handleSubmit}
          onClose={() => { setIsModalVisible(false); }}
        />
      )} */}
    </div>
  );
};
