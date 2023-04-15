import React, { type FC } from 'react';
import { type Prompt } from '../../types/prompt';
import { IconClipboardText, IconTrash } from '@tabler/icons-react';
import { ICON_SIZE } from '../../constants';
import { type NodeModel } from '@minoru/react-dnd-treeview';

interface PromptItemProps {
  node: NodeModel<Prompt>
  depth?: number
  isPlaceholder?: boolean
  isDragging?: boolean
}

export const PromptItem: FC<PromptItemProps> = ({
  isPlaceholder = false,
  isDragging = false,
  node,
  depth = 0
}) => {
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
      <div className="cc-prompt-item__actions">
        <IconTrash size={ICON_SIZE}/>
      </div>
    </div>)
    : <></>);
};
