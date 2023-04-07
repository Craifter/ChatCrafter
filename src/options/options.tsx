import React from 'react'
import ReactDOM from 'react-dom/client'
import './options.css'
import Options from './components/Options'

const container = document.getElementById('chatcrafter-options')
if (container == null) {
  throw new Error('Root element not found')
}
const root = ReactDOM.createRoot(container)
root.render(<Options/>)
