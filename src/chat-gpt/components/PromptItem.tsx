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
  onSelect?: (promptId: string) => void
  onEdit?: (promptId: string) => void
}

export const PromptItem: FC<PromptItemProps> = ({
  isPlaceholder = false,
  isDragging = false,
  node,
  depth = 0,
  onDelete,
  onNameChange,
  onSelect,
  onEdit
}) => {
  const [tryDelete, setTryDelete] = useState<boolean>(false);

  let itemModifiers = '';
  if (isPlaceholder) {
    itemModifiers = 'cc-prompt-item--placeholder';
  } else if (isDragging) {
    itemModifiers = 'cc-prompt-item--dragging';
  }

  const {
    data
  } = node;
  const indent = depth * 24;

  return (data !== undefined
    ? (
    <div className={'cc-prompt-item ' + itemModifiers} style={{ paddingInlineStart: indent }}
         title={data.name.length > 16 ? data.name : ''}
        onClick={(event) => {
          if (event.target instanceof HTMLInputElement && event.target.classList.contains('cc-prompt-item__name__input')) {
            return;
          }
          const actionButtons = event.currentTarget.querySelectorAll('.cc-prompt-item__actions');
          for (let i = 0; i < actionButtons.length; i++) {
            if (actionButtons[i].contains(event.target as any)) {
              event.stopPropagation();
              return;
            }
          }
          if (onSelect !== undefined) {
            onSelect(data.id);
          }
        }}>
      <div className="cc-prompt-item__image">
        <IconClipboardText size={ICON_SIZE}/>
      </div>
      <div className="cc-prompt-item__name">
        {data.name}
      </div>
      {onDelete !== undefined && onNameChange !== undefined && !isDragging && (<>
        {!tryDelete && (<>
          {onEdit !== undefined && (
            <div className="cc-prompt-item__actions" onClick={() => { onEdit(data.id); }}>
              <IconPencil size={ICON_SIZE}/>
            </div>
          )}
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
      </>)}
    </div>)
    : <></>);
};
