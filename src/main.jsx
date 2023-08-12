import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'
import { RouterSwitch } from './components/RouterSwitch'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterSwitch />
  </React.StrictMode>,
)
