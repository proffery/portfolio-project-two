import { NavBar } from './NavBar/NavBar'
import { Footer } from './Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import NotFound from './pages/NotFound'
import { User } from './NavBar/User'

// eslint-disable-next-line react/prop-types
const RouterSwitch = ({currentUser, authStateChanged}) => {
    //console.log(currentUser)
    //console.log(authStateChanged)
    return (
        <>
            <BrowserRouter>
                <User.Provider value={currentUser}>
                    <NavBar authStateChanged={authStateChanged}/>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    <Footer />
                </User.Provider>
            </BrowserRouter>
        </>
    )
}

export { RouterSwitch }