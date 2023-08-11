
import { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [activeLink, setActiveLink] = useState('home')

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            }
            else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value)
    }

    return ( 
    <>
        <Navbar expand="sm" data-bs-theme="dark" className={scrolled ? 'scrolled' : ''}>
            <Container>
                <Navbar.Brand href="#home"><h1>LOGO</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className='navbar-toggler-icon'></span>
                </Navbar.Toggle>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                        <Nav.Link href="#portfolio" className={activeLink === 'porfolio' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('porfolio')}>Porfolio</Nav.Link>
                        <Nav.Link href="#about" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('about')}>About</Nav.Link>
                        <Nav.Link href="#pricing" className={activeLink === 'pricing' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('pricing')}>Pricing</Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        <a href="#login">Maria Ivanova</a>
                    </Navbar.Text>
                    <div></div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}

export { NavBar }