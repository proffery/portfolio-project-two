/* eslint-disable react/prop-types */
import { Dropdown, NavItem } from 'react-bootstrap';
import {
    getAuth,
    signOut,
} from 'firebase/auth'
import { NavLink } from 'react-router-dom';

const LogOut = ({user, authStateChanged, isAdmin, signInStatus}) => {
    //console.log(user)
    const handleLogOut = async () => {
        await signOut(getAuth())
        .then(authStateChanged)
    }
    return (
        <>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}><span>Signed in as: {user.auth.currentUser.displayName}</span></Dropdown.Toggle>
                <Dropdown.Menu>
                    {signInStatus && 
                        <Dropdown.Item href='/feedback'>Leave feedback</Dropdown.Item>
                    }
                    {isAdmin &&
                        <Dropdown.Item href='/admin'>Admin board</Dropdown.Item> 
                    }
                    <Dropdown.Item onClick={handleLogOut}>Exit</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
        </>
    )
} 

export { LogOut }