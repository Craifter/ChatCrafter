import { injectDescription, injectSidebar } from './chat-gpt/injectors';
import { listenersChatChanged } from './chat-gpt/listeners';

async function chatGptMain (): Promise<void> {
  injectSidebar();
  injectDescription('ChatCrafter');
}

listenersChatChanged(chatGptMain);
