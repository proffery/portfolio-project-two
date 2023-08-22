import { NavBar } from './NavBar/NavBar'
import { Footer } from './Footer'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import NotFound from './pages/NotFound'
import { User } from '../Context/User'
import { AdminBoard } from './pages/Admin/AdminBoard'
import { LeaveFeedback } from './pages/LeaveFeedback'

// eslint-disable-next-line react/prop-types
const RouterSwitch = ({currentUser, authStateChanged, isAdmin, refreshPage}) => {
    return (
        <>
            <Router>
                <User.Provider value={currentUser}>
                    <NavBar authStateChanged={authStateChanged} isAdmin={isAdmin}/>
                        <Routes>
                            <Route exact path='/' element={<Home />} />
                            <Route path='*' element={<NotFound />} />
                            {isAdmin && 
                                <Route path='/admin' element={<AdminBoard refreshPage={refreshPage} />} />
                            }
                            {currentUser !== null && 
                                <Route path='/feedback' element={<LeaveFeedback /> } />
                            }
                        </Routes>
                    <Footer />
                </User.Provider>
            </Router>
        </>
    )
}

export { RouterSwitch }