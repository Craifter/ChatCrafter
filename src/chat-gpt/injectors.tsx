import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '../components/App'
export function injectSidebar (): void {
  const getContainer = (): Element => {
    const container = document.querySelector('body>div>div:not(:empty)')
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
  root.render(<App num={123} />)
}
