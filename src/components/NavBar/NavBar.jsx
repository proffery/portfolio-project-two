import { useEffect, useState, useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LogIn } from './LogIn'
import { LogOut } from './LogOut'
import { User } from '../../Context/User'
import { doc, getDoc, getFirestore} from "firebase/firestore"
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const NavBar = ({authStateChanged, isAdmin}) => {
    const user = useContext(User)
    const [logoName, setLogoName] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const [activeLink, setActiveLink] = useState('home')
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

    const onUpdateActiveLink = (value) => {
        setActiveLink(value)
    }
    return ( 
    <>
        <Navbar expand="md" data-bs-theme="dark" className={scrolled ? 'scrolled' : ''}>
            <Container>
                <Nav.Link 
                    className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
                    as={Link} 
                    data-to-scrollspy-id="/#" 
                    onClick={() => onUpdateActiveLink('home')}
                    to={'/#'}
                >
                    <h1>{logoName}</h1>
                </Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className='navbar-toggler-icon'></span>
                </Navbar.Toggle>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-auto">
                        {/* <Nav.Link data-to-scrollspy-id="home" href="/#home">Home</Nav.Link> */}
                        <Nav.Link 
                            className={activeLink === 'portfolio' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('portfolio')}
                            as={Link} 
                            data-to-scrollspy-id="/#portfolio" 
                            to={'#portfolio'}
                        >
                            Porfolio
                        </Nav.Link>
                        <Nav.Link 
                            className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('about')}
                            as={Link} 
                            data-to-scrollspy-id="/#about" 
                            to={'#about'}
                        >
                            About
                        </Nav.Link>
                        <Nav.Link 
                            className={activeLink === 'pricing' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('pricing')}
                            as={Link} 
                            data-to-scrollspy-id="/#pricing" 
                            to={'#pricing'}
                        >
                            Pricing
                        </Nav.Link>
                        <Nav.Link 
                            className={activeLink === 'feedbacks' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('feedbacks')}
                            as={Link} 
                            data-to-scrollspy-id="/#feedbacks" 
                            to={'#feedbacks'}
                        >
                            Feedbacks
                        </Nav.Link>
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
        {scrolled && 
        <a href="#" className='back-to-top'>
            <img src="./../../assets/img/back-to-top-icon.svg" alt="Back to top" />
        </a>
        }
    </>
    )
}

export { NavBar }
