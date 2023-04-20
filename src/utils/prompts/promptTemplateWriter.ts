import { type Prompt } from '../../types/prompt';

export const buildPromptString = (activeVariableModal: Prompt, updatedVariables: string[]): string => {
  const promptBuild = activeVariableModal?.prompt?.replace(/{{(.*?)}}/g, (match, variable) => {
    const index = activeVariableModal.variables?.findIndex((v) => v.name === variable);
    if (index !== undefined) {
      return updatedVariables[index];
    }
    return '';
  });

  return promptBuild;
};
