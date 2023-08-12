import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import NotFound from './pages/NotFound'

const RouterSwitch = () => {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export { RouterSwitch }