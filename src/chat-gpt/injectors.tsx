import React from 'react'
import ReactDOM from 'react-dom/client'
import { SideBar } from './SideBar'

const CONTAINER_QUERY = 'body>div>div:not(:empty)'
const TEXT_AREA_QUERY = 'textarea[placeholder="Send a message..."]'
export function injectSidebar (): void {
  const getContainer = (): Element => {
    const container = document.querySelector(CONTAINER_QUERY)
    if (container == null) throw new Error('Sidebar container not found')
    return container
  }

  const createSidebarContainer = (): Element => {
    const sidebar = document.createElement('div')
    sidebar.classList.add('dark', 'hidden', 'bg-gray-900', 'md:flex', 'md:w-[260px]', 'md:flex-col')
    return sidebar
  }

  const container = getContainer()
  const sidebarContainer = createSidebarContainer()
  container.appendChild(sidebarContainer)
  const root = ReactDOM.createRoot(sidebarContainer)
  // root.render(<App num={13} />)
  root.render(<SideBar />)
}

export function injectPrompt (prompt: string): void {
  const getTextArea = (): HTMLTextAreaElement => {
    const textArea = document.querySelector(TEXT_AREA_QUERY)
    if (textArea == null) throw new Error('Text area not found')
    return textArea as HTMLTextAreaElement
  }

  const textArea = getTextArea()
  textArea.value = prompt
}

export function injectDescription (description: string): void {
  const getChatGptLogo = (): Element | null => {
    // get all h1
    const elements = document.querySelectorAll('h1')
    console.log(elements)
    for (const i in elements) {
      const element = elements[i]
      if (element.innerHTML.includes('ChatGPT')) {
        const span = element.querySelector('span')
        if ((span != null) && span.innerHTML === 'Plus') {
          return element
        }
      }
    }
    return null
  }

  const chatGptLogo = getChatGptLogo()
  if (chatGptLogo === null) {
    return
  }
  const descriptionElement = document.createElement('span')
  descriptionElement.classList.add('text-xs', 'text-gray-400', 'pt-3')
  descriptionElement.innerHTML = description
  chatGptLogo.appendChild(descriptionElement)
}
