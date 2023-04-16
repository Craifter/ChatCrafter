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
      alert('Please fill out all variables');
      return;
    }

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

  // useEffect(() => {
  //   const handleOutsideClick = (e: MouseEvent): void => {
  //     console.log(e.target);
  //     console.log(modalRef.current);

  //     if ((modalRef?.current) != null && !modalRef.current.contains(e.target as Node)) {
  //       onClose();
  //     }
  //   };

  //   window.addEventListener('click', handleOutsideClick);

  //   return () => {
  //     window.removeEventListener('click', handleOutsideClick);
  //   };
  // }, [onClose]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent): void => {
      if (((modalRef?.current) != null) && !modalRef.current.contains(e.target as Node)) {
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
    if ((nameInputRef?.current) != null) {
      nameInputRef.current.focus();
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        className="border-netural-400 inline-block max-h-[400px] transform overflow-hidden overflow-y-auto rounded-lg border px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all bg-gray-900 sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
        role="dialog"
      >
        <div className="mb-4 text-xl font-bold text-neutral-200">
          {prompt.name}
        </div>

        <div className="mb-4 text-sm italic text-neutral-200">
          {prompt.description}
        </div>

        {updatedVariables.map((variable, index) => (
          <div className="mb-4" key={index}>
            <div className="mb-2 text-sm font-bold text-neutral-200">
              {variable.key}
            </div>

            <textarea
              ref={index === 0 ? nameInputRef : undefined}
              className="mt-1 w-full rounded-lg border  px-4 py-2 shadow focus:outline-none border-neutral-800 border-opacity-50 bg-gray-900 text-neutral-100"
              style={{ resize: 'none' }}
              placeholder={`Enter a value for ${variable.key}...`}
              value={variable.value}
              onChange={(e) => { handleChange(index, e.target.value); }}
              rows={3}
            />
          </div>
        ))}

        <button
          className="mt-6 w-full rounded-lg border px-4 py-2  shadow focus:outline-none border-neutral-800 border-opacity-50 bg-white text-black hover:bg-neutral-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
