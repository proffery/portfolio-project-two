import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'
import { RouterSwitch } from './components/RouterSwitch'
import { getFirebaseConfig } from '../src/Firebase/config'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'

function initFirebaseAuth() {
  // Subscribe to the user's signed-in status
  onAuthStateChanged(getAuth(), authStateObserver);
}

const authStateChanged = () => {
  authStateObserver
}

async function authStateObserver(user) {
  let currentUser = null
  
  if (user) {
    currentUser = user
  }


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterSwitch currentUser={currentUser} authStateChanged={authStateChanged}/>
    </React.StrictMode>,
  )
}

const firebaseAppConfig = getFirebaseConfig()
initializeApp(firebaseAppConfig)
initFirebaseAuth()