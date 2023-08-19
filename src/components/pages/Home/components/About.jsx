import { Container, Row, Col, Image, ListGroup } from "react-bootstrap"
import { useEffect, useState } from "react"
import { doc, getDoc, getFirestore} from "firebase/firestore"
import { useParallax } from 'react-scroll-parallax'

const About = () => {
    const [aboutText, setAboutText] = useState('')
    const { ref } = useParallax({ speed: 5 })

    useEffect(() => {
        const getLogoText = async() => {
            const docRef = doc(getFirestore(), 'admin', 'general')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setAboutText(docSnap.data().about)
            } else {
                console.log("No such document!");
            }
        }
        getLogoText()
    }, [])
    return (
        <section className="about" id="about">
            <Container>
                <h2 className='my-4'>About me</h2>
                <Row  ref={ref} className="mb-4 justify-content-center">
                    <Col>
                        <p>
                           {aboutText}
                        </p>
                    </Col>
                    <Col md={6} className="image-holder">
                        <Image className='my-1 rounded-0 shadow' src="./assets/img/about.JPG" alt="About me" rounded   />
                    </Col>
                </Row>
                <Row ref={ref}>
                    <h2>Process</h2>
                    <ListGroup horizontal={'md'} className="mt-4">
                        <ListGroup.Item>
                            <h3>Acquaintance</h3>
                            <p>
                                Every photoshoot starts with getting to know each other. We’ll discuss your ideas, preferences, and any specific moments you want to capture. This helps me tailor the shoot to your vision and style.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Prepayment</h3>
                            <p>
                                To secure your session date, a prepayment is required. This step ensures that your slot is reserved exclusively for you. Once the prepayment is received, we can move forward with planning the details.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Filming</h3>
                            <p>
                                The day of the photoshoot is all about bringing your ideas to life. I’ll guide you through the process, capturing authentic and candid moments. Whether it’s a portrait session or an event, I aim to make you feel comfortable and at ease.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Result</h3>
                            <p>
                                After the shoot, I carefully curate and edit the photos to enhance their natural beauty. You’ll receive a collection of high-resolution images that tell the story of our session. These images are yours to cherish and share with your loved ones.
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
            </Container>
        </section>
    )
}

export { About }