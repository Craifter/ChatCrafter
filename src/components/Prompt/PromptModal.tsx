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
  const [content, setContent] = useState(prompt.prompt);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onUpdatePrompt({
        ...prompt,
        name,
        description,
        prompt: content.trim()
      });
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

  return (<div className="modal__background" onKeyDown={handleEnter}>
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
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        rows={10}
      />
      <button
        type="button"
        className="modal__button"
        onClick={() => {
          const updatedPrompt = {
            ...prompt,
            name,
            description,
            content: content.trim()
          };
          // todo missing checking if all fields are filled
          onUpdatePrompt(updatedPrompt);
        }}
      >
        Save
      </button>
    </div>
  </div>);
};
