// Import necessary libraries
import React, { FC, useCallback } from 'react';
import {
  IconChartBubble,
  IconList,
  IconRobot, IconSettings,
} from '@tabler/icons-react';
import { PromptArea } from './PromtArea';

// Define the props interface
interface Props {
  onOpenChat: () => void;
  onOpenPromptRepo: () => void;
}

// Create the component
export const OptionsContent: FC<Props> = ({ onOpenChat, onOpenPromptRepo }) => {

  return (
    <div className="bg-white shadow-md rounded p-4 w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onOpenChat}
          >
            <IconRobot size={16} />
          </button>
          <span className="text-gray-800">Open Chat</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onOpenPromptRepo}
          >
            <IconList size={16} />
          </button>
          <span className="text-gray-800">Open Prompt Repo</span>
        </div>
      </div>
      <PromptArea></PromptArea>
    </div>
  );
};
