/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import {
    getAuth,
    signOut,
} from 'firebase/auth'

const LogOut = ({user, authStateChanged, setSignInStatus}) => {
    //console.log(user)
    const handleLogOut = async () => {
        await signOut(getAuth())
        .then(authStateChanged)
        .then(setSignInStatus(false))
    }
    return (
        <>
            <span>Signed in as: <a href="#">{user.auth.currentUser.displayName}</a></span>
            <Button className='mx-1' variant="secondary" onClick={handleLogOut}>Exit</Button>
        </>
    )
} 

export { LogOut }