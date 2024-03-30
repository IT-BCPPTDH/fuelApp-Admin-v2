import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/jexcel.css'
import './css/base.css'
import './css/jspreadsheet.css';
import './css/style.css';
import { registerSW } from 'virtual:pwa-register'
import { SocketProvider } from './context/SocketProvider.jsx'

registerSW({
  onOfflineReady() { },
  onNeedRefresh() { },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>,
)
