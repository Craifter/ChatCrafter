import React from 'react';
import ReactDOM from 'react-dom/client';
import { SideBar } from './SideBar';

const QUERY_CONTAINER = 'body>div>div:not(:empty)';
const QUERY_TEXT_AREA = 'textarea[placeholder="Send a message..."]';

const ID_SIDEBAR = 'chatcrafter-sidebar';
const ID_DESCRIPTION = 'chatcrafter-description';
export function injectSidebar (): void {
  const alreadyInjectedCheck = document.getElementById(ID_SIDEBAR);
  if (alreadyInjectedCheck != null) {
    alreadyInjectedCheck.remove();
  }
  const getContainer = (): Element => {
    const container = document.querySelector(QUERY_CONTAINER);
    if (container == null) throw new Error('Sidebar container not found');
    return container;
  };

  const createSidebarContainer = (): Element => {
    const sidebar = document.createElement('div');
    sidebar.id = ID_SIDEBAR;
    sidebar.classList.add('cc-sidebar');
    return sidebar;
  };

  const container = getContainer();
  const sidebarContainer = createSidebarContainer();
  container.appendChild(sidebarContainer);
  const root = ReactDOM.createRoot(sidebarContainer);
  root.render(<SideBar />);
}

export function injectPrompt (prompt: string): void {
  const getTextArea = (): HTMLTextAreaElement => {
    const textArea = document.querySelector(QUERY_TEXT_AREA);
    if (textArea == null) throw new Error('Text area not found');
    return textArea as HTMLTextAreaElement;
  };

  const textArea = getTextArea();
  textArea.value = prompt;
}

export function injectDescription (description: string): void {
  const alreadyInjectedCheck = document.getElementById(ID_DESCRIPTION);
  if (alreadyInjectedCheck != null) {
    alreadyInjectedCheck.remove();
  }
  const getChatGptLogo = (): Element | null => {
    const elements = document.querySelectorAll('h1');
    for (const i in elements) {
      const element = elements[i];
      if (element?.innerHTML?.includes('ChatGPT')) {
        const span = element.querySelector('span');
        if ((span != null) && span.innerHTML === 'Plus') {
          return element;
        }
      }
    }
    return null;
  };

  const chatGptLogo = getChatGptLogo();
  if (chatGptLogo === null) {
    return;
  }
  const descriptionElement = document.createElement('span');
  descriptionElement.id = ID_DESCRIPTION;
  descriptionElement.classList.add('text-xs', 'text-gray-400', 'pt-3');
  descriptionElement.innerHTML = description;
  chatGptLogo.appendChild(descriptionElement);
}
