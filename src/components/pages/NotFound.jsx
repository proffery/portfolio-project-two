import { Container } from "react-bootstrap"

const NotFound = () => {


    return (
        <Container className="not-found d-flex flex-column py-5 align-items-center justify-content-center">
            <h1>404</h1>
            <h2>Page not found!</h2>
        </Container>
    )
}

export default NotFound