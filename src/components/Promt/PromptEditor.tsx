import React, { type FC, useEffect, useRef, useState } from 'react';
import '../styles/prompt-editor.css';
import ContentEditable from 'react-contenteditable';
import { type PromptVariable } from '../../types/prompt';
import { uuid } from '../../utils/uuid';
interface Props {
}

type PromptVariableWithId = PromptVariable & {
  id: string
}

export const PromptEditor: FC<Props> = () => {
  const content = useRef('');
  const contentEditable = React.createRef<HTMLDivElement>();

  const [variables, setVariables] = useState<PromptVariableWithId[]>([]);
  const [selectedVariable, setSelectedVariable] = useState<{
    id: string
    top: number
    left: number
  } | null>(null);

  useEffect(() => {
    // set setSelectedVariable to null if click outside of variable
    const handleMouseDown = (e: MouseEvent): void => {
      if (selectedVariable !== null) {
        // check for cc-editor__variable-editor
        if (e.target instanceof Element) {
          const isVariableEditor = e.target.closest('.cc-editor__variable-editor') !== null;
          if (!isVariableEditor) {
            setSelectedVariable(null);
          }
        }
      }
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [selectedVariable]);

  const addEmptyVariable = (type: string, color: string): void => {
    if (contentEditable.current === null) {
      throw new Error('Content editable is null');
    }

    const getPosition = (): Range => {
      const selection = window.getSelection();
      if (selection !== null) {
        const range = selection.getRangeAt(0);
        if (range.startContainer.parentElement?.className === 'cc-editor__content-editable') {
          return range;
        }
      }
      const range = document.createRange();
      range.selectNodeContents(contentEditable.current as Node);
      range.collapse(false);
      return range;
    };

    const createMarker = (id: string, name: string): HTMLSpanElement => {
      const marker = document.createElement('span');
      marker.id = 'cc-' + id;
      marker.appendChild(document.createTextNode(name));
      marker.contentEditable = 'false';
      marker.className = 'cc-editor__content-editable__variable';
      marker.style.color = color;
      marker.style.borderColor = color;
      return marker;
    };

    const getUniqueVariableName = (): string => {
      let name = type;
      let i = 1;
      while (variables.some((variable) => variable.name === name)) {
        name = `${type} ${i}`;
        i += 1;
      }
      return name;
    };

    const variableName = getUniqueVariableName();
    const range = getPosition();
    const markerUuid = uuid();
    const marker = createMarker(markerUuid, variableName);

    content.current.trim();
    range.insertNode(document.createTextNode(' '));
    range.insertNode(marker);
    range.insertNode(document.createTextNode(' '));

    content.current = contentEditable.current.innerHTML;
    setVariables([...variables, {
      name: variableName,
      type,
      description: '',
      id: markerUuid
    }]);
  };

  const toolbarButtons = [
    {
      label: 'String',
      color: '#FF0000'
    },
    {
      label: 'Select',
      color: '#00FF00'
    },
    {
      label: 'Boolean',
      color: '#0000FF'
    },
    {
      label: 'Date',
      color: '#FFFF00'
    },
    {
      label: 'Time',
      color: '#00FFFF'
    }
  ];

  const handleVariableChange = (variable: PromptVariableWithId): void => {
    const newVariables = variables.map((v) => {
      if (v.id === variable.id) {
        if (v.name !== variable.name && contentEditable.current !== null) {
          const marker = contentEditable.current.querySelector(`#cc-${v.id}`);
          if (marker !== null) {
            marker.innerHTML = variable.name;
          }
          content.current = contentEditable.current.innerHTML;
        }
        return variable;
      }
      return v;
    });
    setVariables(newVariables);
  };

  const handleChange = (e: any): void => {
    content.current = e.target.value;
  };

  const onBlur = (e: any): void => {
  };

  return (<div className="cc-editor">
    <div className={'cc-editor__toolbar'}>
      {toolbarButtons.map((button) => (
        <button key={button.label}onClick={(e) => {
          e.preventDefault();
          addEmptyVariable(button.label, button.color);
        }} className={'cc-editor__toolbar-button'} onMouseDown={(e) => { e.preventDefault(); }}
        style={{ borderColor: button.color }}>
          {button.label}
        </button>
      ))}
    </div>
    <div className="cc-editor__content">
      <ContentEditable
        innerRef={contentEditable as any}
        html={content.current}
        onChange={handleChange}
        onBlur={onBlur}
        className={'cc-editor__content-editable'}
        disabled={false}
        onClick={(e) => {
          // check if click is on variable
          const target = e.target as HTMLElement;
          if (target.className === 'cc-editor__content-editable__variable') {
            const id = target.id.replace('cc-', '');
            setSelectedVariable({
              id,
              top: target.offsetTop,
              left: target.offsetLeft
            });
          }
        }}
      />
    </div>
    {selectedVariable !== null && (
      <div className={'cc-editor__variable-editor'} style={{
        top: selectedVariable.top - 100,
        left: selectedVariable.left
      }}>
      asdasd
      </div>
    )}
  </div>);
};
