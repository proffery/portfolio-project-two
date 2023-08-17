import { Col, Container, Row } from "react-bootstrap"
import { doc, getDoc, getFirestore} from "firebase/firestore"
import { useState, useEffect } from 'react'

const Footer = () => {
    const [logoName, setLogoName] = useState('')
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
    return (
        <footer>
            <Container>
                <Row className="py-4">
                    <Col>
                        <span className="name">{logoName} © 2023</span>
                    </Col>
                    <Col className="d-flex justify-content-between">
                        {/* <a href="/#home">Home</a> */}
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