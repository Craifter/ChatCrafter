import { type Prompt } from '../../types/prompt';
import React, { type FC, type KeyboardEvent, useEffect, useRef, useState } from 'react';

interface Props {
  prompt: Prompt
  onClose: () => void
  onUpdatePrompt: (prompt: Prompt) => void
}

export const PromptModal: FC<Props> = ({
  prompt,
  onClose,
  onUpdatePrompt
}) => {
  const [name, setName] = useState(prompt.name);
  const [description, setDescription] = useState(prompt.description);
  const [promptText, setContent] = useState(prompt.prompt);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (): void => {
    if (name.length === 0) {
      setErrorMessage('Please fill give the promt a name.');
      return;
    }
    if (promptText.length === 0) {
      setErrorMessage('Please fill out the prompt.');
      return;
    }

    setErrorMessage('');
    const updatedPrompt: Prompt = {
      ...prompt,
      name,
      description,
      prompt: promptText.trim()
    };
    onUpdatePrompt(updatedPrompt);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent): void => {
      if ((modalRef.current != null) && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent): void => {
      window.removeEventListener('mouseup', handleMouseUp);
      onClose();
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (<div className="modal__background" onKeyDown={handleKeyDown}>
    <div className="modal__content" ref={modalRef} role="dialog">
      <div className="model__title">Create a new Prompt</div>
      <div className="modal__item-title">Name</div>
      <input
        ref={nameInputRef}
        className="modal__input"
        placeholder={'A name for your prompt.'}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="modal__item-title">Description</div>
      <textarea
        className="modal__textarea"
        style={{ resize: 'none' }}
        placeholder={'A description for your prompt.'}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        rows={3}
      />
      <div className="modal__item-title">Prompt</div>
      <textarea
        className="modal__textarea"
        style={{ resize: 'none' }}
        placeholder={'Prompt content. Use {{}} to denote a variable.\nEx: {{\u00A0name\u00A0}} is a {{\u00A0adjective\u00A0}} {{\u00A0noun\u00A0}}'}
        value={promptText}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        rows={10}
      />
      {errorMessage != null && (<div className="modal__text modal__text--underline">{errorMessage}</div>)}
      <button
        type="button"
        className="modal__button"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  </div>);
};
