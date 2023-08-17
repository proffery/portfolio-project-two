import { useEffect, useState, useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LogIn } from './LogIn'
import { LogOut } from './LogOut'
import { User } from '../../Context/User'
import { doc, getDoc, getFirestore} from "firebase/firestore"

// eslint-disable-next-line react/prop-types
const NavBar = ({authStateChanged, isAdmin}) => {
    const user = useContext(User)
    const [logoName, setLogoName] = useState('')
    const [scrolled, setScrolled] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [signInStatus, setSignInStatus] = useState(user === null ? false : !!user.auth.currentUser)
    useEffect(() => {
        const getLogoName = async() => {
            const docRef = doc(getFirestore(), 'admin', 'general')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setLogoName(docSnap.data().name)
              } else {
                console.log("No such document!");
            }
        }
        getLogoName()
    }, [])
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
        <Navbar expand="md" data-bs-theme="dark" className={scrolled ? 'scrolled' : ''}>
            <Container>
                <Navbar.Brand href="/#home"><h1>{logoName}</h1></Navbar.Brand>
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
                    <Navbar.Text className='pb-1'>
                        {signInStatus ? 
                            <LogOut 
                                user={user}
                                signInStatus={signInStatus}
                                authStateChanged={authStateChanged} 
                                isAdmin={isAdmin}
                            /> : 
                            <LogIn authStateChanged={authStateChanged} 
                            />
                        }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}

export { NavBar }