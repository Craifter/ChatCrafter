import React, { type FC, useEffect, useState } from 'react';
import { type Prompt } from '../../types/prompt';
import {
  Tree, MultiBackend, getBackendOptions, type NodeModel, DndProvider
} from '@minoru/react-dnd-treeview';
import { PromptItem } from './PromptItem';

interface PromptListProps {
  prompts: Prompt[]
  onDelete: (promptId: string) => void
  onNameChange: (promptId: string, newName: string) => void
  onSelect: (promptId: string) => void
  onEdit: (promptId: string) => void
}

/**
 * List of prompts
 * based on https://minop1205.github.io/react-dnd-treeview/?path=/docs/basic-examples-manual-sort-with-placeholder--manual-sort-with-placeholder-story
 */
export const PromptList: FC<PromptListProps> = ({
  prompts,
  onDelete,
  onNameChange,
  onSelect,
  onEdit
}) => {
  const data = prompts.map((prompt) => ({
    id: prompt.id,
    parent: 0,
    text: prompt.name,
    data: prompt,
    droppable: false
  }));
  const [treeData, setTreeData] = useState<Array<NodeModel<Prompt>>>(data);

  useEffect(() => {
    setTreeData(data);
  }, [prompts]);

  const handleDrop = (newTree: Array<NodeModel<Prompt>>): void => {
    setTreeData(newTree);
  };

  return (<DndProvider backend={MultiBackend} options={getBackendOptions()}>
    <div className={'cc-prompt-list'}>
      <Tree
        tree={treeData}
        rootId={0}
        render={(node, {
          depth,
          onToggle,
          isDragging
        }) => <PromptItem
            node={node}
            depth={depth}
            onDelete={onDelete}
            onNameChange={onNameChange}
            onSelect={onSelect}
            onEdit={onEdit}
          />}
        dragPreviewRender={(monitorProps) => {
          return (<>
            {monitorProps.item.data !== undefined && (<PromptItem node={monitorProps.item} isDragging={true} />)}
          </>);
        }}
        onDrop={handleDrop}
        classes={{}}
        sort={false}
        insertDroppableFirst={false}
        canDrop={(tree, {
          dragSource,
          dropTargetId,
          dropTarget
        }) => {
          if (dragSource?.parent === dropTargetId) {
            return true;
          }
        }}
        dropTargetOffset={10}
        placeholderRender={(node, { depth }) => {
          return (<>
            {node.data !== undefined && (
              <PromptItem node={node} isPlaceholder={true} depth={depth} />
            )}
          </>);
        }}
      />
    </div>
  </DndProvider>);
};
