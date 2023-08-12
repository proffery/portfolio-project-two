import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {

    return (
        <footer>
            <Container>
                <Row className="py-4">
                    <Col>
                        <span>Maria Ivanova © 2023</span>
                    </Col>
                    <Col className="d-flex justify-content-between">
                        <a href="/#home">Home</a>
                        <a href="/#portfolio">Portfolio</a>
                        <a href="/#about">About</a>
                        <a href="/#pricing">Pricing</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export { Footer }