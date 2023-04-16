import React, { type FC, useState } from 'react';
import { type Prompt } from '../../types/prompt';
import { IconCheck, IconClipboardText, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { ICON_SIZE } from '../../constants';
import { type NodeModel } from '@minoru/react-dnd-treeview';

interface PromptItemProps {
  node: NodeModel<Prompt>
  depth?: number
  isPlaceholder?: boolean
  isDragging?: boolean
  onDelete?: (promptId: string) => void
  onNameChange?: (promptId: string, newName: string) => void
}

export const PromptItem: FC<PromptItemProps> = ({
  isPlaceholder = false,
  isDragging = false,
  node,
  depth = 0,
  onDelete,
  onNameChange
}) => {
  const [tryDelete, setTryDelete] = useState<boolean>(false);
  const [tryEdit, setTryEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(node.data?.name ?? '');

  let itemModifiers = '';
  if (isPlaceholder) {
    itemModifiers = 'cc-prompt-item--placeholder';
  } else if (isDragging) {
    itemModifiers = 'cc-prompt-item--dragging';
  }

  const setFocusOnInput = (recursiveCounter: number = 0): void => {
    if (recursiveCounter > 20) {
      return;
    }
    const input = document.getElementById('cc-profile-name');
    if (input === null) {
      setTimeout(() => { setFocusOnInput(recursiveCounter + 1); }, 10 * recursiveCounter);
    } else {
      input.focus();
    }
  };

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
      <div className="cc-prompt-item__name">
        {tryEdit
          ? (
          <input id="cc-profile-name" className={'cc-prompt-item__name__input'} type="text" value={editValue} onChange={(e) => { setEditValue(e.target.value); }}/>
            )
          : data.name}
      </div>
      {onDelete !== undefined && onNameChange !== undefined && !isDragging && (<>
        {!tryEdit && !tryDelete && (<>
            <div className="cc-prompt-item__actions" onClick={() => { setTryEdit(true); setFocusOnInput(); }}>
              <IconPencil size={ICON_SIZE}/>
            </div>
            <div className="cc-prompt-item__actions" onClick={() => { setTryDelete(true); }}>
              <IconTrash size={ICON_SIZE}/>
            </div>
          </>)}

        {tryDelete && (<>
          <div className="cc-prompt-item__actions cc-prompt-item__actions--open" onClick={() => { onDelete(data.id); }}>
            <IconCheck size={ICON_SIZE}/>
          </div>
          <div className="cc-prompt-item__actions cc-prompt-item__actions--open" onClick={() => { setTryDelete(false); }}>
            <IconX size={ICON_SIZE}/>
          </div>
        </>)}
        {tryEdit && (<>
          <div className="cc-prompt-item__actions cc-prompt-item__actions--open" onClick={() => {
            onNameChange(data.id, editValue);
            setTryEdit(false);
            data.name = editValue;
          }}>
            <IconCheck size={ICON_SIZE}/>
          </div>
          <div className="cc-prompt-item__actions cc-prompt-item__actions--open" onClick={() => {
            setTryEdit(false);
            setEditValue(data.name);
          }}>
            <IconX size={ICON_SIZE}/>
          </div>
        </>)}
      </>)}
    </div>)
    : <></>);
};
