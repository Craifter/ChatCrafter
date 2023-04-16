import React, { type FC, type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { type Prompt } from '../types/prompt';

interface Props {
  prompt: Prompt
  variables: string[]
  onSubmit: (updatedVariables: string[]) => void
  onClose: () => void
}

export const VariableModal: FC<Props> = ({
  prompt,
  variables,
  onSubmit,
  onClose
}) => {
  const [updatedVariables, setUpdatedVariables] = useState<Array<{ key: string, value: string }>>(
    variables
      .map((variable) => ({ key: variable, value: '' }))
      .filter((item, index, array) => array.findIndex((t) => t.key === item.key) === index)
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (index: number, value: string): void => {
    setUpdatedVariables((prev) => {
      const updated = [...prev];
      updated[index].value = value;
      return updated;
    });
  };

  const handleSubmit = (): void => {
    if (updatedVariables.some((variable) => variable.value === '')) {
      setErrorMessage('Please fill out all variables.');
      return;
    }
    setErrorMessage('');
    onSubmit(updatedVariables.map((variable) => variable.value));
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
      if (((modalRef?.current) != null) && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (): void => {
      window.removeEventListener('mouseup', handleMouseUp);
      onClose();
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => { window.removeEventListener('mousedown', handleMouseDown); };
  }, [onClose]);

  useEffect(() => {
    if ((nameInputRef?.current) != null) {
      nameInputRef.current.focus();
    }
  }, []);

  return (
    <div className="modal__background" onKeyDown={handleKeyDown}>
      <div ref={modalRef} className="modal__content" role="dialog">
        <div className="model__title">{prompt.name}</div>
        <div className="modal__text">{prompt.description}</div>
        {updatedVariables.map((variable, index) => (
          <div key={index}>
            <div className="modal__item-title">{variable.key}</div>
            <textarea
              ref={index === 0 ? nameInputRef : undefined}
              className="modal__textarea"
              style={{ resize: 'none' }}
              placeholder={`Enter a value for ${variable.key}...`}
              value={variable.value}
              onChange={(e) => { handleChange(index, e.target.value); }}
              rows={3}
            />
          </div>
        ))}
        {errorMessage != null && (<div className="modal__text">{errorMessage}</div>)}
        <button className="modal__button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
