import React from 'react'
import ReactDOM from 'react-dom/client'
import './options.css'
import OptionsApp from './OptionsApp'

const container = document.getElementById('chatcrafter-options')
if (container == null) {
  throw new Error('Root element not found')
}
const root = ReactDOM.createRoot(container)
root.render(<OptionsApp/>)
