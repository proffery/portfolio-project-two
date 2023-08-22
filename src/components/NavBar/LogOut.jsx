/* eslint-disable react/prop-types */
import { Dropdown, NavItem, Alert } from 'react-bootstrap';
import {
    getAuth,
    signOut,
} from 'firebase/auth'
import { NavLink, Link } from 'react-router-dom';

const LogOut = ({user, authStateChanged, isAdmin, signInStatus}) => {
    //console.log(user)
    const handleLogOut = async () => {
        await signOut(getAuth())
        .then(authStateChanged)
    }
    return (
        <>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}><span>{user.auth.currentUser.displayName}</span></Dropdown.Toggle>
                <Dropdown.Menu>
                    {signInStatus && 
                        <Dropdown.Item as={Link} to='/feedback'>Leave feedback</Dropdown.Item>
                    }
                    <Dropdown.Item 
                        as={Link} 
                        to={{
                            hash: '#contact'
                        }}
                    >Book a session</Dropdown.Item>
                    {isAdmin &&
                        <Dropdown.Item as={Link} to='/admin' className='m-0 p-0'>
                            <Alert className='m-0 py-1 px-3'>
                                Admin board
                            </Alert>
                        </Dropdown.Item> 
                    }
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogOut}>Exit</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
        </>
    )
} 

export { LogOut }