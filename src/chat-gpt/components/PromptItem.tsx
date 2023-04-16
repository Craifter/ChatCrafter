import React, { type FC, useState } from 'react';
import { type Prompt } from '../../types/prompt';
import { IconCheck, IconClipboardText, IconTrash, IconX } from '@tabler/icons-react';
import { ICON_SIZE } from '../../constants';
import { type NodeModel } from '@minoru/react-dnd-treeview';

interface PromptItemProps {
  node: NodeModel<Prompt>
  depth?: number
  isPlaceholder?: boolean
  isDragging?: boolean
  onDelete?: (promptId: string) => void
}

export const PromptItem: FC<PromptItemProps> = ({
  isPlaceholder = false,
  isDragging = false,
  node,
  depth = 0,
  onDelete
}) => {
  const [tryDelete, setTryDelete] = useState<boolean>(false);

  let itemModifiers = '';
  if (isPlaceholder) {
    itemModifiers = 'cc-prompt-item--placeholder';
  } else if (isDragging) {
    itemModifiers = 'cc-prompt-item--dragging';
  }

  const {
    droppable,
    data
  } = node;
  const indent = depth * 24;

  return (data !== undefined
    ? (
    <div className={'cc-prompt-item ' + itemModifiers} style={{ paddingInlineStart: indent }}
         title={data.name.length > 16 ? data.name : ''}>
      <div className="cc-prompt-item__image">
        <IconClipboardText size={ICON_SIZE}/>
      </div>
      <div className="cc-prompt-item__name">{data.name}</div>
      {onDelete !== undefined && !isDragging && (<>
          {!tryDelete
            ? (<div className="cc-prompt-item__actions" onClick={() => {
                setTryDelete(true);
              }}>
              <IconTrash size={ICON_SIZE}/>
            </div>)
            : (<>
              <div className="cc-prompt-item__actions" onClick={() => {
                onDelete(data.id);
              }}>
                <IconCheck size={ICON_SIZE}/>
              </div>
              <div className="cc-prompt-item__actions" onClick={() => {
                setTryDelete(false);
              }}>
                <IconX size={ICON_SIZE}/>
              </div>
            </>)}
        </>)}
    </div>)
    : <></>);
};
