import { Container, Row, Col, Image, ListGroup } from "react-bootstrap"
import { useEffect, useState } from "react"
import { doc, getDoc, getFirestore} from "firebase/firestore"
import { useParallax } from 'react-scroll-parallax'

const About = () => {
    const [aboutText, setAboutText] = useState('')
    const [blackAndWhite, setBlackAndWhite] = useState(true)
    const [logoPhoto, setLogoPhoto] = useState('')
    const { ref } = useParallax({ speed: -5 })

    useEffect(() => {
        const getAboutData = async() => {
            const docRef = doc(getFirestore(), 'admin', 'general')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setAboutText(docSnap.data().about)
                setBlackAndWhite(docSnap.data().bnw_mode)
            } else {
                console.log("No such document!");
            }
        }
        getAboutData()
    }, [])

    useEffect(() => {
        const fetchLogoPhoto = async () => {
            const docRef = doc(getFirestore(), "about_photo", "about")
            const docSnap = await getDoc(docRef)
    
            if (docSnap.exists()) {
                setLogoPhoto(docSnap.data().imgUrl)
                console.log(logoPhoto)
            } else {
                console.log("No such document!")
            }
        }
        fetchLogoPhoto()
    }, [])

    return (
        <section className="about" id="/#about">
            <Container>
                <h2 className='my-4'>About</h2>
                <Row  ref={ref} className="mb-5 justify-content-center">
                    <Col>
                        <p>
                           {aboutText}
                        </p>
                    </Col>
                    <Col md={6} className="image-holder">
                        <Image
                            style={blackAndWhite ? {filter: 'grayscale(100%)'} : {filter: 'none'}}     
                            className='my-1 rounded-0 shadow' 
                            src={logoPhoto} 
                            alt="About me" 
                            rounded
                        />
                    </Col>
                </Row>
                <Row ref={ref}>
                    <ListGroup horizontal={'md'} className="mt-2">
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