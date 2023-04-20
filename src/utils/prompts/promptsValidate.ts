import { type Prompts } from '../../types/prompts';
import { type Prompt } from '../../types/prompt';

/**
 * Validate prompt variables
 * @param variables - Prompt variables
 */
function promptsValidateVariables (variables: any): Array<{ name: string, type: string, description: string }> {
  if (!Array.isArray(variables)) {
    throw new Error('Invalid prompt variables type: expected array, got ' + typeof variables);
  }
  return variables.map((variable: any) => {
    if (typeof variable !== 'object' || variable === null) {
      throw new Error('Invalid variable type: expected object, got ' + typeof variable);
    }
    if (typeof variable.name !== 'string') {
      throw new Error('Invalid variable name type: expected string, got ' + typeof variable.name);
    }
    if (typeof variable.type !== 'string') {
      throw new Error('Invalid variable type type: expected string, got ' + typeof variable.type);
    }
    if (typeof variable.description !== 'string') {
      throw new Error('Invalid variable description type: expected string, got ' + typeof variable.description);
    }
    return {
      name: variable.name,
      type: variable.type,
      description: variable.description
    };
  });
}

/**
 * Validate prompt tags
 * @param tags
 */
function promptsValidateTags (tags: any): string[] {
  if (!Array.isArray(tags)) {
    throw new Error('Invalid prompt tags type: expected array, got ' + typeof tags);
  }
  return tags.map((tag: any) => {
    if (typeof tag !== 'string') {
      throw new Error('Invalid tag type: expected string, got ' + typeof tag);
    }
    return tag;
  });
}

/**
 * Validate prompt
 * @param prompt
 */
export function promptsValidatePrompt (prompt: any): Prompt {
  if (typeof prompt !== 'object' || prompt === null) {
    throw new Error('Invalid prompt type: expected object, got ' + typeof prompt);
  }
  if (typeof prompt.id !== 'string') {
    throw new Error('Invalid prompt id type: expected string, got ' + typeof prompt.id);
  }
  if (typeof prompt.name !== 'string') {
    throw new Error('Invalid prompt name type: expected string, got ' + typeof prompt.name);
  }
  if (typeof prompt.description !== 'string') {
    throw new Error('Invalid prompt description type: expected string, got ' + typeof prompt.description);
  }
  if (typeof prompt.prompt !== 'string') {
    throw new Error('Invalid prompt prompt type: expected string, got ' + typeof prompt.prompt);
  }
  const validatedVariables = promptsValidateVariables(prompt.variables);
  const validatedTags = promptsValidateTags(prompt.tags);
  if (typeof prompt.metadata !== 'object' || prompt.metadata === null) {
    throw new Error('Invalid prompt metadata type: expected object, got ' + typeof prompt.metadata);
  }
  return {
    id: prompt.id,
    name: prompt.name,
    description: prompt.description,
    prompt: prompt.prompt,
    variables: validatedVariables,
    tags: validatedTags,
    metadata: prompt.metadata,
    model: prompt.model
  };
}

/**
 * Validate prompts
 * @param prompts
 */
export function promptsValidate (prompts: any): Prompts {
  if (typeof prompts !== 'object' || prompts === null) {
    throw new Error('Invalid prompts type: expected object, got ' + typeof prompts);
  }
  if (typeof prompts.version !== 'string') {
    throw new Error('Invalid prompts version type: expected string, got ' + typeof prompts.version);
  }
  if (typeof prompts.generator !== 'string') {
    throw new Error('Invalid prompts generator type: expected string, got ' + typeof prompts.generator);
  }
  if (!Array.isArray(prompts.prompts)) {
    throw new Error('Invalid prompts prompts type: expected array, got ' + typeof prompts.prompts);
  }
  const validatedPrompts = prompts.prompts.map((prompt: any) => promptsValidatePrompt(prompt));
  return {
    version: prompts.version,
    generator: prompts.generator,
    prompts: validatedPrompts,
    id: prompts.id,
    name: prompts.name
  };
}
