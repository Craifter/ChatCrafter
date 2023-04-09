import React from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'
import PopupApp from './PopupApp'
import { initLightMode } from '../utils/initLightMode'
import { sendMessage } from 'webext-bridge/content-script'

initLightMode()

const container = document.getElementById('chatcrafter-popup')
if (container == null) {
  throw new Error('Root element not found')
}
const root = ReactDOM.createRoot(container)
root.render(<PopupApp />)

void sendMessage(
  'get-preferences',
  { sync: false },
  'background'
)
