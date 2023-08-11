import React from 'react'
import ReactDOM from 'react-dom/client'
import { NavBar } from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'
import { MainLogo } from './components/MainLogo'
import { Portfolio } from './components/Portfolio'
import { About } from './components/About'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <MainLogo />
    <Portfolio />
    <About />
  </React.StrictMode>,
)
