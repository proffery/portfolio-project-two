/* eslint-disable react/prop-types */
import { Dropdown, NavItem } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import {
    getAuth,
    signOut,
} from 'firebase/auth'
import { NavLink, Link } from 'react-router-dom';

const LogOut = ({user, authStateChanged, isAdmin, signInStatus}) => {
    const navigate = useNavigate()
    const handleLogOut = async () => {
        await signOut(getAuth())
        .then(authStateChanged)
        .then(navigate('/'))
    }
    return (
        <>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>
                    <span>
                        {user !== null && user.auth.currentUser.displayName}
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {signInStatus && 
                        <Dropdown.Item as={Link} to='/feedback'>Leave feedback</Dropdown.Item>
                    }
                    <Dropdown.Item href='#/#contact'>Book a session</Dropdown.Item>
                    {isAdmin &&
                        <Dropdown.Item as={Link} to='/admin'>Admin board</Dropdown.Item> 
                    }
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogOut}>Exit</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
} 

export { LogOut }