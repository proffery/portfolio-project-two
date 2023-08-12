import { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
const NavBar = () => {
    const [scrolled, setScrolled] = useState(false)

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
                            <Nav.Link data-to-scrollspy-id="home" href="/#home">Home</Nav.Link>
                            <Nav.Link data-to-scrollspy-id="portfolio" href="/#portfolio">Porfolio</Nav.Link>
                            <Nav.Link data-to-scrollspy-id="about" href="/#about">About</Nav.Link>
                            <Nav.Link data-to-scrollspy-id="pricing" href="/#pricing">Pricing</Nav.Link> 
                        </Nav>
                    <Navbar.Text>
                        <a href="#login">Maria Ivanova</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}

export { NavBar }