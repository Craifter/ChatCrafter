import { injectDescription, injectSidebar } from './chat-gpt/injectors'

console.log('ChatCrafter injected')

setTimeout(() => {
  injectSidebar()
  injectDescription('ChatCrafter')
}, 1000)
