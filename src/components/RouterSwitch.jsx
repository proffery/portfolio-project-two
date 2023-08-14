import { NavBar } from './NavBar/NavBar'
import { Footer } from './Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import NotFound from './pages/NotFound'
import { User } from '../Context/User'
import { AdminBoard } from './pages/Admin/AdminBoard'

// eslint-disable-next-line react/prop-types
const RouterSwitch = ({currentUser, authStateChanged, isAdmin, refreshPage}) => {
    //console.log(isAdmin)
    //console.log(currentUser)
    //console.log(authStateChanged)
    return (
        <>
            <Router>
                <User.Provider value={currentUser}>
                    <NavBar authStateChanged={authStateChanged} isAdmin={isAdmin}/>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='*' element={<NotFound />} />
                            {isAdmin && 
                                <Route path='/admin' element={<AdminBoard refreshPage={refreshPage}/>} />
                            }
                        </Routes>
                    <Footer />
                </User.Provider>
            </Router>
        </>
    )
}

export { RouterSwitch }