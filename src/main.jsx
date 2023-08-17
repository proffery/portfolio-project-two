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
import { doc, getDoc, getFirestore} from "firebase/firestore"

function initFirebaseAuth() {
  // Subscribe to the user's signed-in status
  onAuthStateChanged(getAuth(), authStateObserver);
}

const authStateChanged = () => {
  authStateObserver
}

async function authStateObserver(user) {
  let currentUser = null
  let isAdmin = false
  if (user) {
    console.log(user)
    currentUser = user
    if (await getAdminEmail() === currentUser.email) {
      isAdmin = true
    }
  }


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterSwitch 
          isAdmin={isAdmin} 
          currentUser={currentUser} 
          authStateChanged={authStateChanged} 
          refreshPage={refreshPage}
        />
    </React.StrictMode>,
  )
}

const refreshPage = () => {
  const timer = setTimeout(() => {
      window.location.reload(true)
    }, 500);
    return () => clearTimeout(timer);
}

const getAdminEmail = async() => {    
  return (await getDoc(doc(getFirestore(), 'admin', 'email'))).data().email
}

const firebaseAppConfig = getFirebaseConfig()
initializeApp(firebaseAppConfig)
initFirebaseAuth()