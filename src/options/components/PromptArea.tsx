// Import necessary libraries
import React, { type FC, useState, useCallback, useEffect } from 'react';
import browser from 'webextension-polyfill';

// Define the props interface
interface Props { }

// Create the component
export const PromptArea: FC<Props> = () => {
  const [prompts, setPrompts] = useState('');

  useEffect(() => {
    const loadPrompts = async (): Promise<void> => {
      const propts = await browser.storage.local.get('propts');
      if (propts.propts != null) {
        setPrompts(propts.propts);
      }
    };
    loadPrompts().catch((e) => { console.error(e); });
  }, []);

  const handleButtonClick = useCallback(async () => {
    console.log(prompts);
    await browser.storage.local.set({
      propts: prompts
    });
  }, [prompts]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompts(e.target.value);
  }, []);

  return (
        <div className="bg-white shadow-md rounded p-4 w-full">
            <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded"
                value={prompts}
                onChange={handleTextChange}
            ></textarea>
            <button
                onClick={handleButtonClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Save
            </button>
        </div>
  );
};
