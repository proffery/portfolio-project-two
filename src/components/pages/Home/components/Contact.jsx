import { useState, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { User } from '../../../../Context/User'

const Contact = () => {
    const user = useContext(User)
    const [name, setName] = useState(user === null ? '' : user.auth.currentUser.displayName)
    const [email, setEmail] = useState(user === null ? '' : user.auth.currentUser.email)
    const [selectedPackage, setSelectedPackage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        setName('')
        setEmail('')
        setSelectedPackage('')
      }

    return (
        <section className="contact shadow" id="contact">
            <Container className="py-4">
                <h2>Sign up for a photo session</h2>
                <Row>
                    <Col>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <form className="d-flex flex-column flex-grow-1 p-4 align-items-center" onSubmit={handleSubmit}>
                            <Col sm={6} className="d-flex flex-grow-1 px-1 pb-2">
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    required
                                />
                            </Col>
                            <Col sm={6} className="d-flex flex-grow-1 px-1 pb-2">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Addres"
                                    required
                                />
                            </Col>
                            <Col sm={6} className="d-flex flex-grow-1 px-1 pb-2">
                                <select
                                    id="package"
                                    value={selectedPackage}
                                    onChange={(e) => setSelectedPackage(e.target.value)}
                                    required
                                >
                                    <option value="">Select Package</option>
                                    <option value="Individual">Individual</option>
                                    <option value="Love Story">Love Story</option>
                                    <option value="Street">Street</option>
                                </select>
                            </Col>
                            <Col sm={6} className="d-flex flex-grow-1 px-1">
                                <button type="submit"><span>Submit</span></button>
                            </Col>
                        </form>
                    </Col>
                </Row>
                <Row className='social-icon d-flex justify-content-center'>
                    <a href="#">
                        <img src='./assets/img/icon-instagram.svg' alt="Instagram" />
                    </a>
                    <a href="#">
                        <img src='./assets/img/icon-telegram.svg' alt="Telegram" />
                    </a>
                    <a href="#">
                        <img src='./assets/img/icon-whatsapp.svg' alt="Whatsapp" />
                    </a>
                </Row>
            </Container>
        </section>
    )
}

export { Contact }