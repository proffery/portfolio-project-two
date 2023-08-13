/* eslint-disable react/prop-types */
import { Dropdown, NavItem } from 'react-bootstrap';
import {
    getAuth,
    signOut,
} from 'firebase/auth'
import { NavLink } from 'react-router-dom';

const LogOut = ({user, authStateChanged, setSignInStatus, isAdmin}) => {
    //console.log(user)
    const handleLogOut = async () => {
        await signOut(getAuth())
        .then(authStateChanged)
        .then(setSignInStatus(false))
    }
    return (
        <>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}><span>Signed in as: {user.auth.currentUser.displayName}</span></Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Leave feedback</Dropdown.Item>
                    {isAdmin &&
                        <Dropdown.Item><NavLink to={"/admin"}>Admin board</NavLink></Dropdown.Item> 
                    }
                    <Dropdown.Item onClick={handleLogOut}><a>Exit</a></Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
        </>
    )
} 

export { LogOut }