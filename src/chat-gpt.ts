import { injectDescription, injectSidebar } from './chat-gpt/injectors';

console.log('ChatCrafter injected');

injectSidebar();
setTimeout(() => {
  injectDescription('ChatCrafter');
}, 1000);
