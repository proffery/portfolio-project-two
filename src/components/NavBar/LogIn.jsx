import Dropdown from 'react-bootstrap/Dropdown';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,

} from 'firebase/auth'

// eslint-disable-next-line react/prop-types
const LogIn = ({authStateChanged}) => {

    const googleLoginHandle = async () => {
        console.log('Google Auth')
        var provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider)
        .then(authStateChanged)
    }

return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        Login
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={googleLoginHandle}>
          Google
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Facebook (in dev...)</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Apple (in dev...)</Dropdown.Item>
        <Dropdown.Item href="#/action-4">GitHub (in dev...)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export { LogIn }