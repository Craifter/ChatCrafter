import { injectDescription, injectSidebar } from './chat-gpt/injectors';
import { listenersChatChanged } from './chat-gpt/listeners';

const handleOnNewChatButton = (): void => {
  const newChatButton = document.querySelector('a');
  if (newChatButton === null) {
    throw new Error('Could not find new chat button');
  }
  newChatButton.onclick = async () => {
    void chatGptMain('');
  };
};

async function chatGptMain (chatId: string): Promise<void> {
  let sidebar = document.getElementById('chatcrafter-sidebar');
  if (sidebar !== null) {
    sidebar.remove();
  }
  injectSidebar();
  injectDescription('ChatCrafter');

  sidebar = document.getElementById('chatcrafter-sidebar');
  if (sidebar === null) {
    throw new Error('Could not find sidebar');
  }
  sidebar.parentElement?.addEventListener('DOMNodeInserted', () => {
    if (sidebar === null) {
      throw new Error('Could not find sidebar');
    }
    checkDomPositionChange(sidebar);
  });
}

function checkDomPositionChange (sidebar: HTMLElement): void {
  const parent = sidebar.parentElement;
  if (parent === null) {
    return;
  }
  const lastChild = parent.lastElementChild;
  if (lastChild === null) {
    return;
  }
  if (lastChild.id !== 'chatcrafter-sidebar') {
    parent.appendChild(sidebar);
  }
}

listenersChatChanged(chatGptMain);
handleOnNewChatButton();
