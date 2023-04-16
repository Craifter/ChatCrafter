import { type Prompt } from '../../types/prompt';

export const buildPromptString = (activeVariableModal: Prompt, updatedVariables: string[]): string => {
  const promptBuild = activeVariableModal?.prompt?.replace(/{{(.*?)}}/g, (match, variable) => {
    const index = activeVariableModal.variables.findIndex((v) => v.name === variable);
    return updatedVariables[index];
  });

  return promptBuild;
};
